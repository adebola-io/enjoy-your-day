import type { JSX } from '@adbl/unfinished/jsx-runtime';
import { type JsxElement, setAttributeFromProps } from '@adbl/unfinished';
import { useRouter, type RouterLinkProps } from '@adbl/unfinished/router';
import { vibrate } from '#/library/utils';
import classes from './button.module.css';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'neutral'
  | 'transparent'
  | 'outlined';
export type ButtonProps = JSX.IntrinsicElements['button'] &
  Omit<RouterLinkProps, 'onClick'> & {
    vibrate?: boolean;
    variant?: JSX.ValueOrCell<ButtonVariant>;
    rounded?: boolean;
  };

export function Button(props: ButtonProps): JSX.Template {
  const {
    vibrate: vibrateOnClick = false,
    class: className,
    variant = 'neutral',
    onClick,
    rounded,
    href,
    children,
    type,
    ...rest
  } = props;
  const router = useRouter();

  let button: HTMLElement | HTMLElement[];
  if (href) {
    button = (
      <router.Link
        {...rest}
        href={href}
        data-variant={variant}
        data-rounded={rounded}
        class={[classes.button, className]}
      >
        {children}
      </router.Link>
    ) as HTMLElement[];
  } else {
    button = (
      <button
        {...rest}
        class={[classes.button, className]}
        data-variant={variant}
        data-rounded={rounded}
        type={type ?? 'button'}
      >
        {children}
      </button>
    ) as HTMLButtonElement;
  }

  if (onClick) {
    setAttributeFromProps(button as unknown as JsxElement, 'onClick', onClick);
  }

  if (vibrateOnClick) {
    if (Array.isArray(button)) {
      for (const element of button) {
        element.addEventListener('click', () => vibrate());
      }
    } else {
      button.addEventListener('click', () => vibrate());
    }
  }

  return button;
}
