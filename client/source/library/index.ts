export function setMetaThemeColor(color: string) {
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', color);
}

export function vibrate() {
  navigator.vibrate?.(5);
}
