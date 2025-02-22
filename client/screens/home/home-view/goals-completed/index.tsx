import { BottomDrawer } from '#/components/bottom-drawer';
import { ConfettiIcon } from '#/components/icons/confetti';
import { CSS_VARS } from '#/styles/variables';
import confetti from 'canvas-confetti';
import classes from './goals-completed.module.css';
import { removeRouteQuery, useRouteQuery } from '@adbl/iota/utils/router';

export function GoalsCompletedDrawer() {
  const isOpen = useRouteQuery('goals-completed');
  const goBackHome = () => removeRouteQuery('goals-completed');

  isOpen.listen((isOpen) => {
    if (!isOpen) return;
    confetti({
      particleCount: 100,
      gravity: 0.8,
      spread: 100,
      origin: { y: 0.6 },
      disableForReducedMotion: true,
      colors: [CSS_VARS['--space-cadet-500'], CSS_VARS['--space-cadet-200']],
    });
  });

  return (
    <BottomDrawer
      class={classes.container}
      open={isOpen}
      onClose={goBackHome}
      shrinkTarget="#homeView"
      data-stagger-children={isOpen}
    >
      <ConfettiIcon class={classes.icon} />
      <h2 class={classes.heading}>Congratulations!</h2>
      <p class={classes.text}>
        Well done! You completed all your goals. I hope you had an interesting
        day.
      </p>
    </BottomDrawer>
  );
}
