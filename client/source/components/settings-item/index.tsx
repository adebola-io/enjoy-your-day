import { useRouter } from '@adbl/unfinished/router';
import { IconProps } from '../icons/props';
import CaretRightIcon from '../icons/caret-right';
import { InlinedIcon } from '../inlined-icon';
import type { JSX } from '@adbl/unfinished/jsx-runtime';
import classes from './settings-item.module.css';
import { CSS_VARS } from '#/styles/variables';

interface SettingsItemProps {
  title: string;
  description: string;
  link: string;
  Icon: (props: IconProps) => JSX.Template;
}

export function SettingsItem(props: SettingsItemProps) {
  const { title, description, Icon } = props;
  const router = useRouter();

  return (
    <router.Link href={props.link} class={classes.settingsItem}>
      <InlinedIcon
        Icon={Icon}
        class={classes.settingsIcon}
        color={CSS_VARS['--space-cadet-500']}
        title={`${title} settings icon`}
      />
      <h2 class={classes.settingsTitle}>{title}</h2>
      <p class={classes.settingsDescription}>{description}</p>
      <CaretRightIcon class={classes.settingsCaret} />
    </router.Link>
  );
}
