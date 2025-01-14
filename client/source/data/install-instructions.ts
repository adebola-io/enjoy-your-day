import AddIcon from '#/components/icons/add';
import ShareIosIcon from '#/components/icons/share-ios';
import SimpleCheckIcon from '#/components/icons/simple-check';
import type { IconProps } from '#/components/icons/props';
import type { JSX } from '@adbl/unfinished/jsx-runtime';
import AppsIcon from '#/components/icons/apps';
import FluentCubeIcon from '#/components/icons/fluent-cube';
import CircleCheckMarkIcon from '#/components/icons/circle-check-mark';

export interface InstallInstructions {
  name: string;
  instructions: {
    title: string;
    icon: (props: IconProps) => JSX.Template;
  }[];
}

export const installInstructions = {
  safari: {
    name: 'Safari',
    instructions: [
      {
        title: 'Open your browser’s menu.',
        icon: ShareIosIcon,
      },
      {
        title: 'Click “Add to Home Screen”.',
        icon: AddIcon,
      },
      {
        title: 'Save Enjoy Your Day to your device.',
        icon: SimpleCheckIcon,
      },
    ],
  },
  edge: {
    name: 'Microsoft Edge',
    instructions: [
      {
        title: 'Click the apps icon in the right of the address bar.',
        icon: AppsIcon,
      },
      {
        title: "Click the 'Install' button.",
        icon: FluentCubeIcon,
      },
      {
        title: 'Save Enjoy Your Day to your device.',
        icon: CircleCheckMarkIcon,
      },
    ],
  },
  chrome: {
    name: 'Chrome',
    instructions: [
      {
        title: 'Open your browser’s menu.',
        icon: ShareIosIcon,
      },
      {
        title: 'Click “Add to Home Screen”.',
        icon: AddIcon,
      },
      {
        title: 'Save Enjoy Your Day to your device.',
        icon: SimpleCheckIcon,
      },
    ],
  },
  default: {
    name: 'your browser',
    instructions: [
      {
        title: 'Open your browser’s menu.',
        icon: ShareIosIcon,
      },
      {
        title: 'Click “Add to Home Screen”.',
        icon: AddIcon,
      },
      {
        title: 'Save Enjoy Your Day to your device.',
        icon: SimpleCheckIcon,
      },
    ],
  },
} satisfies Record<string, InstallInstructions>;

type UserAgentData = {
  getHighEntropyValues: (options: string[]) => Promise<{
    architecture: string;
    brands: Array<{
      brand: string;
      version: string;
    }>;
    mobile: boolean;
  }>;
};

export async function getInstallInstructions(): Promise<InstallInstructions> {
  if ('userAgentData' in navigator) {
    try {
      const data = await (
        navigator.userAgentData as unknown as UserAgentData
      ).getHighEntropyValues([
        'architecture',
        'platform',
        'platformVersion',
        'uaFullVersion',
      ]);

      const isEdge = data.brands.some((brand) => brand.brand.includes('Edge'));
      if (isEdge) return installInstructions.edge;
      const isChrome = data.brands.some((brand) =>
        brand.brand.includes('Chrome')
      );
      if (isChrome) return installInstructions.chrome;
    } catch (e) {
      console.error(e);
    }
  }
  const isSafari =
    navigator.vendor &&
    navigator.vendor.indexOf('Apple') > -1 &&
    navigator.userAgent &&
    navigator.userAgent.indexOf('CriOS') === -1 &&
    navigator.userAgent.indexOf('FxiOS') === -1;

  if (isSafari) {
    return installInstructions.safari;
  }

  return installInstructions.default;
}
