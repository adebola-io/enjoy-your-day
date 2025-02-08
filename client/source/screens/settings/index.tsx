import NotificationIcon from '#/components/icons/notification';
import UserIcon from '#/components/icons/user';
import ArtsIcon from '#/components/icons/arts';
import BinIcon from '#/components/icons/bin';
import AboutLayer from './about';
import ResetDataDrawer from './reset-drawer';
import { StackLayerView } from '#/components/stack-layer-view';
import { ViewGroup } from '#/components/view-group';
import InfoIcon from '#/components/icons/info';
import { SettingsItem, SettingsItemList } from '#/components/settings-item';
import ProfileDrawer from './profile-drawer';
import NotificationsLayer from './notifications';
import AppearanceLayer from './appearance';
import classes from './settings.module.css';

export default function Settings() {
  return (
    <ViewGroup>
      <StackLayerView open>
        <div id="settingsView" class={classes.settings}>
          <SettingsItemList heading="Settings">
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
              link="/settings?level-one=appearance"
              title="Appearance"
              description="Fine-tune the app to your tastes."
              Icon={ArtsIcon}
            />
            <SettingsItem
              link="/settings?level-one=reset"
              title="Reset Data"
              description="Delete and wipe all your user data."
              Icon={BinIcon}
            />
            <SettingsItem
              link="/settings?level-one=about"
              title="About"
              description="Learn more about this app."
              Icon={InfoIcon}
            />
          </SettingsItemList>
        </div>
      </StackLayerView>
      <ProfileDrawer />
      <NotificationsLayer />
      <AppearanceLayer />
      <AboutLayer />
      <ResetDataDrawer />
    </ViewGroup>
  );
}
