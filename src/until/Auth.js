export function setLocal(key, val) {
  localStorage.setItem(key, val);
}

export function getLocal(key) {
  return localStorage.getItem(key);
}
export function removeLocal(key) {
  return localStorage.removeItem(key);
}
