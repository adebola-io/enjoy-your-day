import { vibrate } from '#/library';
import { useRouter } from '@adbl/unfinished/router';
import { CaretRightIcon } from '#/components/icons/caret-right';
import type { JSX } from '@adbl/unfinished/jsx-runtime';
import styles from './styles.module.css';

export function BackButton(props: JSX.IntrinsicElements['button']) {
  const router = useRouter();

  const goBack = () => {
    vibrate();
    router.back();
  };

  return (
    <button
      type="button"
      onClick={goBack}
      {...props}
      class={[styles.backButton, props.class]}
    >
      <CaretRightIcon class={styles.backButtonIcon} />
      Back
    </button>
  );
}
