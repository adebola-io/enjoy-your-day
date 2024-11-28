import { Loader } from '@/components/Loader';
import { setMetaThemeColor } from '@/library';
import { BackButton } from '@/components/BackButton';

import styles from './AutoSelection.module.css';

export default function AutoSelection() {
  setMetaThemeColor('#0e0e1f');
  return (
    <div class={styles.autoSelectionView}>
      <BackButton class={styles.backButton} />
      <div class={styles.loaderContainer}>
        <Loader class={styles.autoSelectionLoader} />
      </div>
      <h2 class={styles.heading}>Dreaming up the perfect day for you.</h2>
    </div>
  );
}
