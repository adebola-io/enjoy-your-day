import { Loader } from '#/components/Loader';
import { setMetaThemeColor } from '#/library';
import { BackButton } from '#/components/BackButton';
import { finalTexts, headings } from '#/data';
import { Cell } from '@adbl/cells';
import styles from './auto-select.module.css';

export default function AutoSelect() {
  setMetaThemeColor('#0e0e1f');

  const headingSet =
    headings[Math.floor(Math.random() * headings.length)].concat(finalTexts);

  const headingIndex = Cell.source(0);
  const heading = Cell.derived(() => {
    return headingSet[headingIndex.value];
  });
  const changeHeading = () => {
    headingIndex.value++;
  };

  return (
    <div class={styles.autoSelectionView}>
      <BackButton class={styles.backButton} />
      <Loader class={styles.autoSelectionLoader} />
      <h2 class={styles.heading} onAnimationIteration={changeHeading}>
        {heading}
      </h2>
    </div>
  );
}
