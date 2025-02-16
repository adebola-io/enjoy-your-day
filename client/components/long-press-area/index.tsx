import { deriveProp } from '#/library/utils';
import type { JSX } from '@adbl/unfinished/jsx-runtime';
import classes from './long-press-area.module.css';

type DivProps = JSX.IntrinsicElements['div'];
export interface LongPressAreaProps extends DivProps {
  pressDuration?: JSX.ValueOrCell<number>;
  onLongPress?: (event: PointerEvent) => void;
}

export function LongPressArea(props: LongPressAreaProps) {
  const {
    pressDuration: pressDurationProp = 450,
    onPointerDown: onPointerDownInitial,
    onLongPress,
    children,
    ...rest
  } = props;
  const pressDuration = deriveProp(pressDurationProp);
  const startingPointerPosition = [0, 0];
  let timeout: ReturnType<typeof setTimeout> | undefined = undefined;

  const handlePointerDown = (event: PointerEvent) => {
    startingPointerPosition[0] = event.clientX;
    startingPointerPosition[1] = event.clientY;
    if (pressDuration.value === undefined || onLongPress === undefined) return;
    timeout = setTimeout(() => {
      onLongPress?.(event);
    }, pressDuration.value);
  };

  const handlePointerUp = () => {
    clearTimeout(timeout);
  };

  const handlePointerMove = (event: PointerEvent) => {
    const dx = Math.abs(event.clientX - startingPointerPosition[0]);
    const dy = Math.abs(event.clientY - startingPointerPosition[1]);
    if (dx > 15 || dy > 15) {
      clearTimeout(timeout);
    }
  };

  return (
    <div
      {...rest}
      class={[classes.longPressArea, rest.class]}
      onPointerDown--passive={handlePointerDown}
      onPointerUp--passive={handlePointerUp}
      onPointerMove--passive={handlePointerMove}
    >
      {children}
    </div>
  );
}
