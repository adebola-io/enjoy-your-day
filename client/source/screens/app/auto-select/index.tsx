import { Loader } from '#/components/loader';
import { BackButton } from '#/components/back-button';
import { Button } from '#/components/button';
import { GoalCard, type GoalCardProps } from '#/components/goal-card';
import { getResourceState, setMetaThemeColor, vibrate } from '#/library';
import { finalTexts, headings } from '#/data/headings';
import { getDatabaseHandle } from '#/data/db';
import { Cell } from '@adbl/cells';
import { For, Switch } from '@adbl/unfinished';
import classes from './auto-select.module.css';

export default function AutoSelect() {
  const resource = Cell.async(getAutoRecommendations);
  const state = getResourceState(resource);
  resource.run();
  resource.data.listen((data) => {
    if (!data) return;
    vibrate();
  });
  setMetaThemeColor('#0e0e1f');

  return (
    <div class={classes.autoSelectionView} data-state={state}>
      <BackButton class={classes.backButton} />
      {Switch(state, {
        pending: AutoSelectionPending,
        error: () => <div>Error, {resource.error.value?.message}</div>,
        success: () => <AutoSelectedCards goals={resource.data.value} />,
      })}
    </div>
  );
}

interface AutoSelectedCardsProps {
  goals: GoalCardProps[] | null;
}

function AutoSelectedCards(props: AutoSelectedCardsProps) {
  const { goals } = props;
  if (!goals) return <></>;
  const ref = Cell.source<HTMLElement | null>(null);

  const observer = new MutationObserver(() => {
    if (!ref.value?.isConnected) return;
    ref.value.scrollTop = ref.value.scrollHeight;
    observer.disconnect();
  });
  observer.observe(document.body, { subtree: true, childList: true });

  const styles = { '--total': goals.length };
  return (
    <>
      <ul ref={ref} class={classes.goalCards} style={styles}>
        {For(goals, (goal, index) => {
          return <GoalCard {...goal} index={index} />;
        })}
      </ul>
      <Button class={classes.continueButton} vibrateOnClick>
        Continue
      </Button>
    </>
  );
}

function AutoSelectionPending() {
  const headingSetIndex = Math.floor(Math.random() * headings.length);
  const headingSet = headings[headingSetIndex].concat(finalTexts);

  const headingIndex = Cell.source(0);
  const heading = Cell.derived(() => headingSet[headingIndex.value]);
  const changeHeading = () => headingIndex.value++;

  return (
    <>
      <Loader class={classes.autoSelectionLoader} />
      <h2 class={classes.heading} onAnimationIteration={changeHeading}>
        {heading}
      </h2>
    </>
  );
}

async function getAutoRecommendations(_: never): Promise<GoalCardProps[]> {
  // The first card seems to flicker if there is no wait set.
  const wait = new Promise((resolve) => setTimeout(resolve, 300));
  const databaseHandle = await getDatabaseHandle();
  const result = await databaseHandle.query('SELECT * FROM goals;');
  console.log(result);
  await wait;
  return [
    {
      title: 'Hydrate Regularly',
      instruction: 'Drink 8 glasses of water.',
      info: 'Staying hydrated improves energy levels, concentration, and overall health. Keep a water bottle handy!',
      color: '#003f5c', // Dark blue
      icon: 'cup',
    },
    {
      title: 'Mindful Moments',
      instruction: 'Practice 5 minutes of mindfulness.',
      info: 'Take a break to breathe deeply and focus on the present. This can reduce stress and improve focus.',
      color: '#444e86', // Deep indigo
      icon: 'self-care',
    },
    {
      title: 'Step It Up',
      instruction: 'Take at least 7,000 steps today.',
      info: 'Walking is a great way to stay active. Track your steps with a phone or fitness tracker.',
      color: '#9a0007', // Dark red
      icon: 'fitness',
    },
    {
      title: 'Stretch & Flex',
      instruction: 'Do 10 minutes of stretching.',
      info: 'Stretching improves flexibility, posture, and can relieve muscle tension. Perfect for a morning routine!',
      color: '#004d40', // Dark teal
      icon: 'bar-chart',
    },
    {
      title: 'Read & Learn',
      instruction: 'Read for 20 minutes.',
      info: 'Expand your knowledge or escape into a story. Reading is a fantastic way to stimulate your mind.',
      color: '#3e2723', // Dark brown
      icon: 'learning',
    },
    {
      title: 'Healthy Plate',
      instruction: 'Eat at least one serving of fruits or vegetables.',
      info: 'Boost your intake of vitamins and minerals. Add some color to your meal with fresh produce.',
      color: '#00600f', // Deep green
      icon: 'bar-chart',
    },
  ];
}
