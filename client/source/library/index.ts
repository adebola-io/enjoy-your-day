export function setMetaThemeColor(color: string) {
  const meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) return;

  meta.setAttribute('content', color);
}

export function vibrate() {
  navigator.vibrate?.(10);
}