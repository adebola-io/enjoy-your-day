import NotificationIcon from '#/components/icons/notification';
import UserIcon from '#/components/icons/user';
import BinIcon from '#/components/icons/bin';
import InfoIcon from '#/components/icons/info';
import { SettingsItem } from '#/components/settings-item';
import ProfileDrawer from './profile-drawer';
import NotificationsLayer from './notifications';
import classes from './settings.module.css';
import { ViewLayer, ViewLayerGroup } from '#/components/view-layer';

export default function Settings() {
  return (
    <ViewLayerGroup>
      <ViewLayer open>
        <div id="settingsView" class={classes.settings}>
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
            <ProfileDrawer />
          </menu>
        </div>
      </ViewLayer>
      <NotificationsLayer />
    </ViewLayerGroup>
  );
}
