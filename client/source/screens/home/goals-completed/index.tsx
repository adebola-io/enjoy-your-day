import { Button } from '#/components/button';
import { ConfettiIcon } from '#/components/icons/confetti';
import { CSS_VARS } from '#/styles/variables';
import { useObserver } from '@adbl/unfinished';
import { Cell } from '@adbl/cells';
import confetti from 'canvas-confetti';
import classes from './goals-completed.module.css';

export function GoalsCompleted() {
  const observer = useObserver();
  const containerRef = Cell.source<HTMLDivElement | null>(null);

  observer.onConnected(containerRef, () => {
    confetti({
      particleCount: 300,
      gravity: 0.8,
      spread: 90,
      origin: { y: 0.6 },
      disableForReducedMotion: true,
      colors: [CSS_VARS['--space-cadet-500'], CSS_VARS['--space-cadet-200']],
    });
  });

  return (
    <div ref={containerRef} class={classes.container} data-stagger-children>
      <ConfettiIcon class={classes.icon} />
      <h1>Congrats to you!</h1>
      <p>
        You completed all your goals. Well done! I hope you enjoyed your day.
      </p>
      <Button rounded variant="secondary">
        Plan for tomorrow
      </Button>
    </div>
  );
}