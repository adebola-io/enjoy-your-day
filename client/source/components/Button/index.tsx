import type { JSX } from '@adbl/unfinished/jsx-runtime';
import styles from './Button.module.css';
import { type JsxElement, setAttributeFromProps } from '@adbl/unfinished';

type OriginalButtonProps = JSX.IntrinsicElements['button'];

export interface ButtonProps extends OriginalButtonProps {
  vibrateOnClick?: boolean;
}

export function Button(props: ButtonProps) {
  const { vibrateOnClick = false, onClick, ...rest } = props;
  const button = (
    <button
      {...rest}
      class={[styles.button, props.class]}
      type={props.type ?? 'button'}
    >
      {props.children}
    </button>
  ) as HTMLButtonElement;

  if (onClick) {
    setAttributeFromProps(button as unknown as JsxElement, 'onClick', onClick);
  }

  if (vibrateOnClick) {
    button.addEventListener('click', () => {
      navigator.vibrate?.(10);
    });
  }

  return button;
}
