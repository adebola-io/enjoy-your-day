import { CaretRightIcon } from '#/components/icons/caret-right';
import { vibrate } from '#/library';
import { useRouter } from '@adbl/unfinished/router';
import type { JSX } from '@adbl/unfinished/jsx-runtime';
import classes from './back-button.module.css';

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
      class={[classes.backButton, props.class]}
    >
      <CaretRightIcon class={classes.backButtonIcon} />
    </button>
  );
}
