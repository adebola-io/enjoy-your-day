import { timeOfDay } from '#/data/state';
import { CSS_VARS } from '#/styles/variables';
import { Cell } from '@adbl/cells';
import type { JSX } from '@adbl/unfinished/jsx-runtime';

export function TimeBasedGreeting(props: JSX.IntrinsicElements['span']) {
  const greeting = Cell.derived(() => {
    switch (timeOfDay.value) {
      case 'morning':
        return 'Good morning';
      case 'afternoon':
        return 'Good afternoon';
      case 'evening':
        return 'Good evening';
    }
  });

  return (
    <span {...props}>
      {greeting}
      <span style={{ color: CSS_VARS['--space-cadet-200'] }}>.</span>
    </span>
  );
}
