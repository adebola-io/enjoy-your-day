import { useRouter } from '@adbl/unfinished/router';
import type { IconProps } from '../icons/props';
import CaretRightIcon from '../icons/caret-right';
import { InlinedIcon } from '../inlined-icon';
import { CSS_VARS } from '#/styles/variables';
import type { JSX } from '@adbl/unfinished/jsx-runtime';
import { If } from '@adbl/unfinished';
import type { Cell } from '@adbl/cells';
import classes from './settings-item.module.css';
import { BackButton } from '../back-button';

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

interface SettingsButtonItemProps {
  type: 'button';
  title: string;
  description?: JSX.ValueOrCell<string>;
  Icon: (props: IconProps) => JSX.Template;
  disabled?: JSX.ValueOrCell<boolean>;
  onClick: (this: HTMLButtonElement, event: Event) => void;
}

type SettingsItemProps =
  | SettingsLinkItemProps
  | SettingsToggleItemProps
  | SettingsButtonItemProps;

export function SettingsItem(props: SettingsItemProps) {
  const router = useRouter();
  const { title, description, Icon, type = 'link' } = props;
  const link = 'link' in props ? props.link : undefined;
  const onChange = 'onChange' in props ? props.onChange : undefined;
  const inputRef = 'inputRef' in props ? props.inputRef : undefined;
  const checked = 'checked' in props ? props.checked : undefined;
  const onClick = 'onClick' in props ? props.onClick : undefined;
  const disabled = 'disabled' in props ? props.disabled : undefined;

  const Content = () => {
    return (
      <>
        <Icon class={classes.settingsIcon} />
        <h2 class={classes.settingsTitle}>{title}</h2>
        {If(description, (description) => {
          return <p class={classes.settingsDescription}>{description}</p>;
        })}
      </>
    );
  };

  switch (type) {
    case 'toggle':
      return (
        <label class={classes.settingsItem}>
          <Content />
          <input
            ref={inputRef}
            type="checkbox"
            class={classes.settingsToggle}
            onChange={onChange}
            checked={checked}
          />
        </label>
      );
    case 'link':
      return (
        <router.Link href={link} class={classes.settingsItem}>
          <Content />
          <CaretRightIcon class={classes.settingsCaret} />
        </router.Link>
      );
    case 'button':
      return (
        <button
          type="button"
          class={classes.settingsItem}
          onClick={onClick}
          disabled={disabled}
        >
          <Content />
        </button>
      );
    default:
      return <></>;
  }
}

type MenuProps = JSX.IntrinsicElements['menu'];
interface SettingsItemListProps extends MenuProps {
  heading?: string;
  children?: unknown;
  subList?: boolean;
}
export function SettingsItemList(props: SettingsItemListProps) {
  const { heading, children, subList, ...rest } = props;
  return (
    <>
      {If(subList, () => (
        <BackButton class={classes.backButton} />
      ))}
      <menu {...rest} class={[classes.listMenu, props.class]}>
        {If(heading, () => {
          if (subList) return <h2 class={classes.listSubHeading}>{heading}</h2>;
          return <h1 class={classes.listHeading}>{heading}</h1>;
        })}
        {children}
      </menu>
    </>
  );
}
