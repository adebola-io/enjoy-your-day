import DigitalDesignIcon from '#/components/icons/digital-design';
import MoonAndStarsIcon from '#/components/icons/moon-and-starts';
import PaletteIcon from '#/components/icons/palette';
import { IconProps } from '#/components/icons/props';
import SunIcon from '#/components/icons/sun';
import { PillRadioList } from '#/components/pill-radio-list';
import { SettingsItemList } from '#/components/settings-item';
import { ViewLayer } from '#/components/view-layer';
import { themeColor, type ThemeColor } from '#/data/state';
import { useRouteQuery } from '#/library/utils';
import { JSX } from '@adbl/unfinished/jsx-runtime';
import classes from './appearance.module.css';

const themeIcons: Record<ThemeColor, (props: IconProps) => JSX.Template> = {
  System: DigitalDesignIcon,
  Light: SunIcon,
  Dark: MoonAndStarsIcon,
};

export default function AppearanceLayer() {
  return (
    <ViewLayer
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
