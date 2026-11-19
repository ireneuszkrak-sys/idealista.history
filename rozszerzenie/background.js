// Pobiera historię cen z arkusza Google (eksport CSV) i trzyma ją w pamięci rozszerzenia.
const SHEET_ID = "1JSF0bKdFVMh04XTZiUHP6tuO6o0zhiWsZSWX0Dw0oD0";
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;
const MAX_AGE_MS = 3 * 60 * 60 * 1000; // odśwież co 3 godziny

function parseCSV(text) {
  const rows = []; let row = [], field = "", q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"') { if (text[i + 1] === '"') { field += '"'; i++; } else q = false; }
      else field += c;
    } else if (c === '"') q = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field); rows.push(row); row = []; field = "";
    } else field += c;
  }
  if (field !== "" || row.length) { row.push(field); rows.push(row); }
  return rows;
}

function num(s) { const t = String(s).replace(/[^\d.,]/g, "").split(/[.,](?=\d{1,2}$)/)[0].replace(/\D/g, ""); return t ? +t : null; }
function isoDate(s) {
  s = String(s || "").trim();
  let m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/); if (m) return `${m[1]}-${m[2].padStart(2, "0")}-${m[3].padStart(2, "0")}`;
  m = s.match(/^(\d{1,2})[./-](\d{1,2})[./-](\d{4})/); if (m) return `${m[3]}-${m[2].padStart(2, "0")}-${m[1].padStart(2, "0")}`;
  return s.slice(0, 10);
}

async function refresh() {
  try {
    const res = await fetch(CSV_URL, { credentials: "include", redirect: "follow", cache: "no-store" });
    const text = await res.text();
    if (!res.ok || /^\s*</.test(text)) throw new Error("brak dostępu");
    const rows = parseCSV(text);
    const remote = {};
    for (const r of rows.slice(1)) {
      const id = String(r[0] || "").replace(/\D/g, "");
      if (!id) continue;
      (remote[id] ||= []).push({ d: isoDate(r[1]), from: num(r[2]), to: num(r[3]), t: r[4] || "", src: "mail" });
    }
    await chrome.storage.local.set({ remote, remoteAt: Date.now(), remoteError: null });
    return { ok: true, count: Object.keys(remote).length };
  } catch (e) {
    await chrome.storage.local.set({ remoteError: String(e.message || e), remoteErrorAt: Date.now() });
    return { ok: false, error: String(e.message || e) };
  }
}

chrome.runtime.onMessage.addListener((msg, _s, send) => {
  (async () => {
    if (msg.type === "getRemote") {
      const st = await chrome.storage.local.get(["remote", "remoteAt"]);
      if (!st.remoteAt || Date.now() - st.remoteAt > MAX_AGE_MS || msg.force) await refresh();
      const st2 = await chrome.storage.local.get(["remote", "remoteAt", "remoteError"]);
      send(st2);
    } else if (msg.type === "refresh") {
      send(await refresh());
    }
  })();
  return true;
});

chrome.runtime.onInstalled.addListener(() => refresh());
