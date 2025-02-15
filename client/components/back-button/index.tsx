import { CaretRightIcon } from '#/components/icons/caret-right';
import { vibrate } from '#/library/utils';
import { useRouter } from '@adbl/unfinished/router';
import type { JSX } from '@adbl/unfinished/jsx-runtime';
import classes from './back-button.module.css';

const goBack = () => {
  const router = useRouter();
  vibrate();
  router.back();
};

export function BackButton(props: JSX.IntrinsicElements['button']) {
  const { class: className, ...rest } = props;
  return (
    <button
      id="backButton"
      type="button"
      title="Go back"
      onClick={goBack}
      {...rest}
      class={[classes.backButton, className]}
    >
      <CaretRightIcon class={classes.backButtonIcon} />
    </button>
  );
}
