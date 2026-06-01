const STORAGE_KEY = "ceresscan_history";

export function saveScan(scan) {
  const history = getHistory();

  history.unshift(scan);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(history)
  );
}

export function getHistory() {
  try {
    return (
      JSON.parse(
        localStorage.getItem(STORAGE_KEY)
      ) || []
    );
  } catch {
    return [];
  }
}

export function clearHistory() {
  localStorage.removeItem(
    STORAGE_KEY
  );
}