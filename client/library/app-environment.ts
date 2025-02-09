import type { UserAgentData } from '#/data/install-instructions';

export type BrowserVendorName = 'safari' | 'firefox' | 'chrome' | 'edge';
export function getBrowserVenderName(): BrowserVendorName {
  throw new Error('Unimplemented');
}

export function isSafari() {
  const isSafari =
    navigator.vendor &&
    navigator.vendor.indexOf('Apple') > -1 &&
    navigator.userAgent &&
    navigator.userAgent.indexOf('CriOS') === -1 &&
    navigator.userAgent.indexOf('FxiOS') === -1;

  return isSafari;
}

export async function isMaybeMobileOrSafari() {
  if ('userAgentData' in navigator) {
    try {
      const data = await (
        navigator.userAgentData as UserAgentData
      ).getHighEntropyValues([
        'architecture',
        'platform',
        'platformVersion',
        'uaFullVersion',
      ]);

      return data.mobile;
    } catch (e) {
      console.error(e);
    }
  }

  return isSafari();
}
