import NotificationIcon from '#/components/icons/notification';
import UserIcon from '#/components/icons/user';
import BinIcon from '#/components/icons/bin';
import InfoIcon from '#/components/icons/info';
import { SettingsItem } from '#/components/settings-item';
import { setMetaTheme } from '#/library/utils';
import ProfileDrawer from './profile-drawer';
import Notifications from './notifications';
import { useObserver } from '@adbl/unfinished';
import { useRouter } from '@adbl/unfinished/router';
import { Cell } from '@adbl/cells';
import classes from './settings.module.css';

export default function Settings() {
  const router = useRouter();
  const route = router.getCurrentRoute();
  const observer = useObserver();
  const containerRef = Cell.source<HTMLElement | null>(null);

  observer.onConnected(containerRef, () => {
    setMetaTheme('#ffffff');
  });

  const notificationsPageIsOpen = Cell.derived(() => {
    return route.value.query.get('level-one') === 'notifications';
  });

  return (
    <div
      ref={containerRef}
      id="settingsView"
      class={classes.settings}
      data-notifications-page-is-open={notificationsPageIsOpen}
    >
      <menu id="settingsMenu" class={classes.settingsMenu}>
        <h1 class={classes.heading}>Settings</h1>
        <SettingsItem
          link="/settings?level-one=profile"
          title="Profile"
          description="Change aspects of your experience."
          Icon={UserIcon}
        />
        <SettingsItem
          link="/settings?level-one=notifications"
          title="Notifications"
          description="Enable reminders and notifications."
          Icon={NotificationIcon}
        />
        <SettingsItem
          link="/settings?level-one=reset"
          title="Reset"
          description="Delete parts or all of your data and start over."
          Icon={BinIcon}
        />
        <SettingsItem
          link="/about?level-one=about"
          title="About"
          description="Learn more about this app."
          Icon={InfoIcon}
        />
      </menu>
      <ProfileDrawer />
      <Notifications />
    </div>
  );
}
