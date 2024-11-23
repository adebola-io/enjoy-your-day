import type { JSX } from '@adbl/unfinished/jsx-runtime';
import styles from './button.module.css';
import { Cell } from '@adbl/cells';

type OriginalButtonProps = JSX.IntrinsicElements['button'];

export interface ButtonProps extends OriginalButtonProps {
  vibrateOnClick?: boolean;
}

export function Button(props: ButtonProps) {
  const buttonRef = Cell.source<HTMLButtonElement | undefined>(undefined);
  const { vibrateOnClick = false, ...rest } = props;

  const handleClick = (event: MouseEvent) => {
    if (!buttonRef.value) return;
    if (vibrateOnClick) {
      const vibrate = navigator.vibrate;
      if (vibrate) {
        vibrate(35);
      }
    }
    if (typeof props.onClick === 'function') {
      props.onClick.bind(buttonRef.value)(event);
    }
  };

  return (
    <button
      {...props}
      ref={rest.ref}
      onClick={handleClick}
      class={[styles.button, props.class ?? '']}
      type={props.type ?? 'button'}
    >
      {props.children}
    </button>
  );
}
