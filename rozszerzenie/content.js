// Dokleja historię cen do ogłoszeń idealista (strona ogłoszenia i listy wyników).
(() => {
  const PL = (n) => (n == null ? "?" : Math.round(n).toLocaleString("pl-PL")) + " €";
  const dt = (d) => { const [y, m, dd] = d.split("-"); return `${dd}.${m}.${y}`; };
  const today = () => new Date().toISOString().slice(0, 10);
  const priceNum = (txt) => { const m = (txt || "").replace(/\./g, "").replace(/\s/g, "").match(/(\d{2,7})/); return m ? +m[1] : null; };
  let remote = {}, local = {};

  function idFromHref(h) { const m = (h || "").match(/\/(?:[a-z]{2}\/)?(?:imovel|inmueble|immobile)\/(\d+)/); return m ? m[1] : null; }

  async function load() {
    const st = await chrome.storage.local.get(["local"]);
    local = st.local || {};
    try {
      const r = await chrome.runtime.sendMessage({ type: "getRemote" });
      remote = (r && r.remote) || {};
    } catch (e) { remote = {}; }
  }

  // Zapamiętuje cenę widzianą na stronie; dopisuje zmianę, gdy różni się od poprzedniej.
  function observe(id, price) {
    if (!id || !price) return;
    const h = local[id] || (local[id] = []);
    const last = h[h.length - 1];
    if (!last || last.p !== price) h.push({ d: today(), p: price });
    chrome.storage.local.set({ local });
  }

  function events(id) {
    const ev = (remote[id] || []).map((e) => ({ d: e.d, from: e.from, to: e.to, src: "mail" }));
    const h = local[id] || [];
    for (let i = 1; i < h.length; i++) {
      const e = { d: h[i].d, from: h[i - 1].p, to: h[i].p, src: "strona" };
      if (!ev.some((x) => x.to === e.to && x.from === e.from)) ev.push(e);
    }
    return ev.sort((a, b) => a.d.localeCompare(b.d));
  }

  function summary(id, current) {
    const ev = events(id);
    const seen = (local[id] || [])[0];
    if (!ev.length) return { short: null, html: seen ? `Brak zmian ceny (śledzone od ${dt(seen.d)}).` : "Brak zmian ceny w mailach." };
    const first = ev[0].from, last = ev[ev.length - 1];
    const nowP = current || last.to;
    const pct = first ? Math.round(((nowP - first) / first) * 1000) / 10 : 0;
    const arrow = nowP < first ? "↓" : nowP > first ? "↑" : "=";
    const cls = nowP < first ? "ihc-down" : nowP > first ? "ihc-up" : "";
    const rows = ev.map((e) => {
      const p = e.from ? Math.round(((e.to - e.from) / e.from) * 1000) / 10 : 0;
      return `<li>${dt(e.d)}: ${PL(e.from)} → <b>${PL(e.to)}</b> (${p > 0 ? "+" : ""}${p}%)<span class="ihc-src">${e.src}</span></li>`;
    }).join("");
    return {
      short: `<span class="${cls}">${arrow} ${pct > 0 ? "+" : ""}${pct}%</span> od ${PL(first)} · ${ev.length} zm. · ost. ${dt(last.d)}`,
      html: `<div class="ihc-head ${cls}">${arrow} ${pct > 0 ? "+" : ""}${pct}% od pierwszej ceny ${PL(first)}</div><ul>${rows}</ul>`,
    };
  }

  function detailPage() {
    const id = idFromHref(location.pathname);
    if (!id || document.querySelector(".ihc-box")) return;
    const priceEl = document.querySelector(".info-data-price, .price-features__container .txt-bold, [class*='info-data-price']");
    const price = priceNum(priceEl && priceEl.textContent);
    observe(id, price);
    const s = summary(id, price);
    const box = document.createElement("div");
    box.className = "ihc-box";
    box.innerHTML = `<div class="ihc-title">Historia ceny</div>${s.html}`;
    const anchor = (priceEl && priceEl.closest(".info-data")) || priceEl || document.querySelector("h1") || document.body.firstElementChild;
    anchor.parentNode.insertBefore(box, anchor.nextSibling);
  }

  function listPage() {
    const items = document.querySelectorAll("article.item, article[data-element-id], div.item[data-element-id]");
    items.forEach((it) => {
      if (it.querySelector(".ihc-badge")) return;
      const a = it.querySelector("a[href*='/imovel/'], a[href*='/inmueble/'], a[href*='/immobile/']");
      const id = it.getAttribute("data-element-id") || idFromHref(a && a.getAttribute("href"));
      if (!id) return;
      const priceEl = it.querySelector(".item-price, .price-row .item-price");
      const price = priceNum(priceEl && priceEl.textContent);
      observe(id, price);
      const s = summary(id, price);
      if (!s.short) return;
      const b = document.createElement("div");
      b.className = "ihc-badge";
      b.innerHTML = s.short;
      b.title = events(id).map((e) => `${dt(e.d)}: ${PL(e.from)} → ${PL(e.to)}`).join("\n");
      (priceEl ? priceEl.parentNode : it).appendChild(b);
    });
  }

  function run() { if (idFromHref(location.pathname)) detailPage(); listPage(); }

  load().then(() => {
    run();
    let t;
    new MutationObserver(() => { clearTimeout(t); t = setTimeout(run, 400); })
      .observe(document.body, { childList: true, subtree: true });
  });
})();
