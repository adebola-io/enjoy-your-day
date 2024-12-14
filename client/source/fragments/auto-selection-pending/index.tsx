import { Loader } from '#/components/loader';
import { finalTexts, headings } from '#/data/headings';
import { Cell } from '@adbl/cells';
import classes from './auto-selection-pending.module.css';

export default function AutoSelectionPending() {
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
