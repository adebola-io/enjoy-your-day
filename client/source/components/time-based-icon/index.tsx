import { CupIcon } from '#/components/icons/cup';
import { SunIcon } from '#/components/icons/sun';
import { MoonAndStarsIcon } from '#/components/icons/moon-and-starts';
import type { IconProps } from '#/components/icons/props';
import { timeOfDay } from '#/data/state';
import { Switch } from '@adbl/unfinished';

export function TimeBasedIcon(props: IconProps) {
  return Switch(timeOfDay, {
    morning: () => <CupIcon {...props} />,
    afternoon: () => <SunIcon {...props} />,
    evening: () => <MoonAndStarsIcon {...props} />,
  });
}
