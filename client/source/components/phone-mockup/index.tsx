import { Cuboid } from '../cuboid';
import type { JSX } from '@adbl/unfinished/jsx-runtime';
import classes from './phone-mockup.module.css';

type DivProps = JSX.IntrinsicElements['div'];
export interface PhoneMockupProps extends DivProps {
  phoneWidth?: JSX.ValueOrCell<string>;
  notchColor?: JSX.ValueOrCell<string>;
  phoneColor?: string;
  contentClasses?: string;
  children?: JSX.Children;
}

export function PhoneMockup(props: PhoneMockupProps) {
  const {
    children,
    notchColor = 'var(--space-cadet-500)',
    phoneColor = 'var(--space-cadet-500)',
    phoneWidth: size = '200px',
    contentClasses,
    ...rest
  } = props;
  const phoneStyles = { '--phone-size': size, '--notch-color': notchColor };

  return (
    <Cuboid
      length="var(--phone-size)"
      height="calc(var(--phone-size) * 2)"
      breadth="calc(var(--phone-size) * 0.075)"
      strokeWidth="calc(var(--phone-size) * 0.03)"
      strokeStyle="solid"
      strokeColor={phoneColor}
      fill={phoneColor}
      curvature="calc(var(--phone-size) * 0.15)"
      extraVars={phoneStyles}
      {...rest}
    >
      <div slot="front" class={classes.phoneFront}>
        <div class={[classes.content, contentClasses]}>{children}</div>
      </div>
    </Cuboid>
  );
}
