import { BottomDrawer } from '#/components/bottom-drawer';
import { ConfettiIcon } from '#/components/icons/confetti';
import { useRouter } from '@adbl/unfinished/router';
import { CSS_VARS } from '#/styles/variables';
import { Cell } from '@adbl/cells';
import classes from './goals-completed.module.css';
import confetti from 'canvas-confetti';
import { InlinedIcon } from '#/components/inlined-icon';

export function GoalsCompletedDrawer() {
  const router = useRouter();
  const route = router.getCurrentRoute();
  const drawerRef = Cell.source<HTMLDialogElement | null>(null);
  const isOpen = Cell.derived(() => {
    return route.value.query.has('goals-completed');
  });
  const goBackHome = () => router.navigate('/home');

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
      ref={drawerRef}
      class={classes.container}
      open={isOpen}
      onClose={goBackHome}
      root="#mainOutlet"
      data-stagger-children={isOpen}
    >
      <InlinedIcon
        Icon={ConfettiIcon}
        class={classes.icon}
        color={CSS_VARS['--space-cadet-500']}
        title="Confetti Icon"
      />
      <h2 class={classes.heading}>Congratulations!</h2>
      <p class={classes.text}>
        Well done! You completed all your goals. I hope you had an interesting
        day.
      </p>
    </BottomDrawer>
  );
}
