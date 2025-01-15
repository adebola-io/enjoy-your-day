import AddIcon from '#/components/icons/add';
import ShareIosIcon from '#/components/icons/share-ios';
import SimpleCheckIcon from '#/components/icons/simple-check';
import AppsIcon from '#/components/icons/apps';
import FluentCubeIcon from '#/components/icons/fluent-cube';
import CircleCheckMarkIcon from '#/components/icons/circle-check-mark';
import ThreeDotsIcon from '#/components/icons/three-dots';
import AddToHomeScreenIcon from '#/components/icons/add-to-home-screen';
import DownloadIcon from '#/components/icons/download';
import CheckUnderlinedIcon from '#/components/icons/check-underlined';
import type { IconProps } from '#/components/icons/props';
import type { JSX } from '@adbl/unfinished/jsx-runtime';
import InstallToDesktopIcon from '#/components/icons/install-to-desktop';

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
  edgeDesktop: {
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
  chromeDesktop: {
    name: 'Chrome',
    instructions: [
      {
        title:
          'Click the download icon in the right corner of the address bar.',
        icon: InstallToDesktopIcon,
      },
      {
        title: "Tap 'Install' on the notification.",
        icon: DownloadIcon,
      },
      {
        title: 'Save Enjoy Your Day to your device.',
        icon: CheckUnderlinedIcon,
      },
    ],
  },
  chromeMobile: {
    name: 'Chrome',
    instructions: [
      {
        title: 'Open your browser’s menu from the top right corner.',
        icon: ThreeDotsIcon,
      },
      {
        title: 'Click “Add to Home screen”.',
        icon: AddToHomeScreenIcon,
      },
      {
        title: "Tap 'Install' on the notification.",
        icon: DownloadIcon,
      },
      {
        title: 'Save Enjoy Your Day to your device.',
        icon: CheckUnderlinedIcon,
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
    platform: string;
  }>;
};

export async function getInstallInstructions(): Promise<
  InstallInstructions | undefined
> {
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

      const isEdgeDesktop =
        data.brands.some((brand) => brand.brand.includes('Edge')) &&
        !data.mobile;
      if (isEdgeDesktop) return installInstructions.edgeDesktop;

      const isChrome = data.brands.some((brand) =>
        brand.brand.includes('Chrome')
      );
      if (isChrome) {
        if (data.mobile) return installInstructions.chromeMobile;
        return installInstructions.chromeDesktop;
      }
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
}
