async function show() {
  const st = await chrome.storage.local.get(["remote", "remoteAt", "remoteError", "remoteErrorAt", "local"]);
  const n = st.remote ? Object.keys(st.remote).length : 0;
  const m = st.local ? Object.keys(st.local).length : 0;
  let t = `Ogłoszenia ze zmianami (z maili): ${n}<br>Ogłoszenia obejrzane na stronie: ${m}`;
  if (st.remoteAt) t += `<br>Ostatnie pobranie: ${new Date(st.remoteAt).toLocaleString("pl-PL")}`;
  if (st.remoteError && (!st.remoteAt || st.remoteErrorAt > st.remoteAt)) t += `<br><span style="color:#c62828">Nie udało się pobrać historii z maili (${st.remoteError}). Sprawdź dostęp do arkusza Google.</span>`;
  document.getElementById("s").innerHTML = t;
}
document.getElementById("r").onclick = async () => { document.getElementById("s").textContent = "Pobieram…"; await chrome.runtime.sendMessage({ type: "refresh" }); show(); };
show();
