import type { IconProps } from '#/components/icons/props';
import LockedIcon from '#/components/icons/locked';
import NotificationIcon from '#/components/icons/notification';
import UserIcon from '#/components/icons/user';
import BinIcon from '#/components/icons/bin';
import { InlinedIcon } from '#/components/inlined-icon';
import CaretRightIcon from '#/components/icons/caret-right';
import InfoIcon from '#/components/icons/info';
import { CSS_VARS } from '#/styles/variables';
import { ProfileDrawer } from './profile-drawer';
import { useRouter } from '@adbl/unfinished/router';
import type { JSX } from '@adbl/unfinished/jsx-runtime';
import classes from './settings.module.css';
import { useObserver } from '@adbl/unfinished';
import { setMetaTheme } from '#/library/utils';
import { Cell } from '@adbl/cells';

export default function Settings() {
  const observer = useObserver();
  const containerRef = Cell.source<HTMLElement | null>(null);

  observer.onConnected(containerRef, () => {
    setMetaTheme('#ffffff');
  });

  return (
    <div ref={containerRef} id="settingsView" class={classes.settings}>
      <h1 class={classes.heading}>Settings</h1>
      <menu id="settingsMenu" class={classes.settingsMenu}>
        <SettingsItem
          link="profile"
          title="Profile"
          description="Change aspects of your experience."
          Icon={UserIcon}
        />
        <SettingsItem
          link="security"
          title="Security"
          description="Change your password and other security settings."
          Icon={LockedIcon}
        />
        <SettingsItem
          link="notifications"
          title="Notifications"
          description="Enable reminders and notifications."
          Icon={NotificationIcon}
        />
        <SettingsItem
          link="reset"
          title="Reset"
          description="Delete parts or all of your data and start over."
          Icon={BinIcon}
        />
        <SettingsItem
          link="about"
          title="About"
          description="Learn more about this app."
          Icon={InfoIcon}
        />
      </menu>
      <ProfileDrawer />
    </div>
  );
}

interface SettingsItemProps {
  title: string;
  description: string;
  link: string;
  Icon: (props: IconProps) => JSX.Template;
}

function SettingsItem(props: SettingsItemProps) {
  const { title, description, Icon } = props;
  const router = useRouter();

  return (
    <router.Link
      href={`/settings?level-one=${props.link}`}
      class={classes.settingsItem}
    >
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
