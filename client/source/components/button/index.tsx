import type { JSX } from '@adbl/unfinished/jsx-runtime';
import { type JsxElement, setAttributeFromProps } from '@adbl/unfinished';
import { useRouter, type RouterLinkProps } from '@adbl/unfinished/router';
import { vibrate } from '#/library/utils';
import classes from './button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'neutral';
export type ButtonProps = JSX.IntrinsicElements['button'] &
  RouterLinkProps & {
    vibrate?: boolean;
    variant?: JSX.ValueOrCell<ButtonVariant>;
    rounded?: boolean;
  };

export function Button(props: ButtonProps): JSX.Template {
  const router = useRouter();
  const {
    vibrate: vibrateOnClick = false,
    variant = 'neutral',
    onClick,
    rounded,
    ...rest
  } = props;

  let button: HTMLElement | HTMLElement[];
  if (props.href) {
    button = (
      <router.Link
        {...rest}
        href={props.href}
        data-variant={variant}
        data-rounded={rounded}
        class={[classes.button, props.class]}
      >
        {props.children}
      </router.Link>
    ) as HTMLElement[];
  } else {
    button = (
      <button
        {...rest}
        class={[classes.button, props.class]}
        data-variant={variant}
        data-rounded={rounded}
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
