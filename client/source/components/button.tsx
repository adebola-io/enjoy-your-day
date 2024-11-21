import type { JSX } from '@adbl/unfinished/jsx-runtime';
import styles from './button.module.css';

type OriginalButtonProps = JSX.IntrinsicElements['button'];

export interface ButtonProps extends OriginalButtonProps {}

export function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      class={[styles.button, props.class ?? '']}
      type={props.type ?? 'button'}
    >
      {props.children}
    </button>
  );
}
