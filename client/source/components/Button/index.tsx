import type { JSX } from '@adbl/unfinished/jsx-runtime';
import styles from './Button.module.css';
import { type JsxElement, setAttributeFromProps } from '@adbl/unfinished';
import { useRouter, type RouterLinkProps } from '@adbl/unfinished/router';
import { vibrate } from '@/library';

type OriginalButtonProps = JSX.IntrinsicElements['button'] & RouterLinkProps;

export interface ButtonProps extends OriginalButtonProps {
  vibrateOnClick?: boolean;
  variant?: JSX.ValueOrCell<'primary' | 'secondary' | 'neutral'>;
  href?: RouterLinkProps['href'];
}

export function Button(props: ButtonProps) {
  const router = useRouter();
  const {
    vibrateOnClick = false,
    variant = 'neutral',
    onClick,
    ...rest
  } = props;

  let button: HTMLElement;
  if (props.href) {
    button = (
      <router.Link
        {...rest}
        href={props.href}
        data-variant={variant}
        class={[styles.button, props.class]}
      >
        {props.children}
      </router.Link>
    ) as HTMLElement;
  } else {
    button = (
      <button
        {...rest}
        class={[styles.button, props.class]}
        data-variant={variant}
        type={props.type ?? 'button'}
      >
        {props.children}
      </button>
    ) as HTMLButtonElement;
  }

  if (onClick) {
    setAttributeFromProps(button as unknown as JsxElement, 'onClick', onClick);
  }

  if (vibrateOnClick) {
    button.addEventListener('click', vibrate);
  }

  return button;
}
