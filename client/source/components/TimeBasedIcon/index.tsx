import { CupIcon } from '#/components/icons/cup';
import { SunIcon } from '#/components/icons/sun';
import { MoonAndStartsIcon } from '#/components/icons/moon-and-starts';
import type { IconProps } from '#/components/icons/props';
import { timeOfDay } from '#/data';
import { Cell } from '@adbl/cells';

export function TimeBasedIcon(props: IconProps) {
  const Icon = Cell.derived(() => {
    switch (timeOfDay.value) {
      case 'morning':
        return CupIcon;
      case 'afternoon':
        return SunIcon;
      case 'evening':
        return MoonAndStartsIcon;
    }
  });

  return <Icon.value {...props} />;
}
