import DigitalDesignIcon from '#/components/icons/digital-design';
import MoonAndStarsIcon from '#/components/icons/moon-and-starts';
import FontIcon from '#/components/icons/font';
import PaletteIcon from '#/components/icons/palette';
import type { IconProps } from '#/components/icons/props';
import SunIcon from '#/components/icons/sun';
import { PillRadioList } from '#/components/pill-radio-list';
import { SettingsItemList } from '#/components/settings-item';
import { StackLayerView } from '#/components/stack-layer-view';
import {
  type FontFamily,
  selectedFont,
  themeColor,
  type ThemeColor,
} from '#/data/state';
import { useRouteQuery } from '#/library/utils';
import type { JSX } from '@adbl/unfinished/jsx-runtime';
import classes from './appearance.module.css';

const themeIcons: Record<ThemeColor, (props: IconProps) => JSX.Template> = {
  System: DigitalDesignIcon,
  Light: SunIcon,
  Dark: MoonAndStarsIcon,
};

const fontNames: Record<FontFamily, string> = {
  System: 'System',
  Inter: 'Default',
  Cursive: 'Cursive',
  SchibstedGrotesk: 'Relaxed',
};

export default function AppearanceLayer() {
  return (
    <StackLayerView
      open={useRouteQuery('level-one', 'appearance')}
      content={() => (
        <SettingsItemList id="appearanceSettings" heading="Appearance" subList>
          <PillRadioList
            name="theme"
            heading="Theme"
            model={themeColor}
            Icon={PaletteIcon}
            items={['Light', 'Dark', 'System']}
            Template={ThemePillItem}
          />
          <PillRadioList
            name="font"
            heading="Font"
            model={selectedFont}
            Icon={FontIcon}
            items={['Inter', 'SchibstedGrotesk', 'Cursive', 'System']}
            Template={FontPillItem}
          />
        </SettingsItemList>
      )}
    />
  );
}

function ThemePillItem(item: ThemeColor) {
  const Icon = themeIcons[item];
  return (
    <div class={classes.theme}>
      <Icon class={classes.icon} />
      <span>{item}</span>
    </div>
  );
}

function FontPillItem(item: FontFamily) {
  const fontName = fontNames[item];
  return (
    <div class={classes.font} data-font={item}>
      <span>{fontName}</span>
    </div>
  );
}
