import type { JSX } from '@adbl/unfinished/jsx-runtime';
import { Teleport } from '@adbl/unfinished/teleport';
import { Cell } from '@adbl/cells';
import { vibrate } from '#/library/utils';
import classes from './floating-action-button.module.css';

type ButtonProps = JSX.IntrinsicElements['button'];
interface FloatingActionButtonProps extends ButtonProps {
  inline?: 'end' | 'start' | 'center';
  block?: 'end' | 'start' | 'center';
  avoidNavbar?: boolean;
}

export function FloatingActionButton(props: FloatingActionButtonProps) {
  const {
    children,
    inline = 'center',
    block = 'center',
    type = 'button',
    avoidNavbar = true,
    onClick,
    ...rest
  } = props;

  const handleClick = function (this: HTMLButtonElement, event: MouseEvent) {
    vibrate();
    if (Cell.isCell(onClick)) onClick.value?.bind(this)(event);
    else onClick?.bind(this)(event);
  };

  return (
    <Teleport to="body">
      <button
        {...rest}
        class={[rest.class, classes.button]}
        data-inline={inline}
        data-block={block}
        data-avoid-navbar={avoidNavbar}
        onClick={handleClick}
      >
        {children}
      </button>
    </Teleport>
  );
}
