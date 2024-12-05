import { Loader } from '#/components/loader';
import { setMetaThemeColor } from '#/library';
import { BackButton } from '#/components/back-button';
import { finalTexts, headings } from '#/data/headings';
import { Cell } from '@adbl/cells';
import styles from './auto-select.module.css';

export default function AutoSelect() {
  const headingSet =
    headings[Math.floor(Math.random() * headings.length)].concat(finalTexts);

  const headingIndex = Cell.source(0);
  const heading = Cell.derived(() => {
    return headingSet[headingIndex.value];
  });
  const changeHeading = () => {
    headingIndex.value++;
  };

  const setMetaColor = (event: Event) => {
    const target = event.target as HTMLElement;
    if (target.tagName !== 'DIV') return;
    setMetaThemeColor('#0e0e1f');
  };

  return (
    <div onAnimationStart={setMetaColor} class={styles.autoSelectionView}>
      <BackButton class={styles.backButton} />
      <Loader class={styles.autoSelectionLoader} />
      <h2 class={styles.heading} onAnimationIteration={changeHeading}>
        {heading}
      </h2>
    </div>
  );
}
