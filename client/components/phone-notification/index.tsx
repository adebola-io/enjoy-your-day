import type { JSX } from '@adbl/unfinished/jsx-runtime';
import type { IconProps } from '../icons/props';
import classes from './phone-notification.module.css';
import { InlinedIcon } from '../inlined-icon';

type DivProps = JSX.IntrinsicElements['div'];
export interface PhoneNotificationProps extends DivProps {
  title: string;
  description: string;
  time: string;
  Icon: (props: IconProps) => JSX.Template;
}

export function PhoneNotification(props: PhoneNotificationProps) {
  const { time, Icon, title, description, ...rest } = props;
  return (
    <div {...rest} class={[classes.container, rest.class]}>
      <InlinedIcon
        Icon={Icon}
        class={classes.icon}
        color="white"
        title="Notification Icon"
      />
      <h5 class={classes.title}>{title}</h5>
      <p class={classes.description}>{description}</p>
      <time class={classes.time}>{time}</time>
    </div>
  );
}
