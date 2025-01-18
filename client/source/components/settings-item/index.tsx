import { useRouter } from '@adbl/unfinished/router';
import type { IconProps } from '../icons/props';
import CaretRightIcon from '../icons/caret-right';
import { InlinedIcon } from '../inlined-icon';
import { CSS_VARS } from '#/styles/variables';
import type { JSX } from '@adbl/unfinished/jsx-runtime';
import { If } from '@adbl/unfinished';
import type { Cell } from '@adbl/cells';
import classes from './settings-item.module.css';

interface SettingsLinkItemProps {
  type?: 'link';
  title: string;
  description?: string;
  link: string;
  Icon: (props: IconProps) => JSX.Template;
}

interface SettingsToggleItemProps {
  type: 'toggle';
  title: string;
  description?: string;
  Icon: (props: IconProps) => JSX.Template;
  onChange?: (this: HTMLInputElement, event: Event) => void;
  checked?: JSX.ValueOrCell<boolean>;
  inputRef?: Cell<HTMLInputElement | null>;
}

type SettingsItemProps = SettingsLinkItemProps | SettingsToggleItemProps;

export function SettingsItem(props: SettingsItemProps) {
  const { title, description, Icon, type = 'link' } = props;
  const link = 'link' in props ? props.link : undefined;
  const onChange = 'onChange' in props ? props.onChange : undefined;
  const inputRef = 'inputRef' in props ? props.inputRef : undefined;
  const router = useRouter();

  const Content = () => {
    return (
      <>
        <InlinedIcon
          Icon={Icon}
          class={classes.settingsIcon}
          color={CSS_VARS['--space-cadet-500']}
          title={`${title} settings icon`}
        />
        <h2 class={classes.settingsTitle}>{title}</h2>
        {If(description, (description) => {
          return <p class={classes.settingsDescription}>{description}</p>;
        })}
        {If(link, {
          true: () => <CaretRightIcon class={classes.settingsCaret} />,
          false: () => (
            <input
              ref={inputRef}
              type="checkbox"
              class={classes.settingsToggle}
              onChange={onChange}
            />
          ),
        })}
      </>
    );
  };

  switch (type) {
    case 'toggle':
      return (
        <label class={classes.settingsItem}>
          <Content />
        </label>
      );
    case 'link':
      return (
        <router.Link href={link} class={classes.settingsItem}>
          <Content />
        </router.Link>
      );
    default:
      return <></>;
  }
}
