import { CaretRightIcon } from '#/components/icons/caret-right';
import { vibrate } from '#/library';
import { backButtonText } from '#/data';
import { useRouter } from '@adbl/unfinished/router';
import type { JSX } from '@adbl/unfinished/jsx-runtime';
import styles from './styles.module.css';

const goBack = () => {
  const router = useRouter();
  vibrate();
  router.back();
};

export function BackButton(props: JSX.IntrinsicElements['button']) {
  return (
    <button
      type="button"
      onClick={goBack}
      {...props}
      class={[styles.backButton, props.class]}
    >
      <CaretRightIcon class={styles.backButtonIcon} />
      {backButtonText}
    </button>
  );
}
