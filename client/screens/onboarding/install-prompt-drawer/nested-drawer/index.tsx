import { BottomDrawer } from '#/components/bottom-drawer';
import type { IconProps } from '#/components/icons/props';
import { Button } from '#/components/button';
import type { JSX } from '@adbl/unfinished/jsx-runtime';
import { getInstallInstructions } from '#/data/install-instructions';
import { removeRouteQuery, useRouteQuery } from '@adbl/iota/utils/router';
import { For, If } from '@adbl/unfinished';
import classes from './nested-drawer.module.css';

interface InstallInstructionsDrawerProps {
  shrinkTarget?: string;
  children?: JSX.Children;
}

export const installInstructionsDrawerQuery = 'nested-install-prompt-drawer';
export async function InstallationInstructionsDrawer(
  props: InstallInstructionsDrawerProps
) {
  const instructions = await getInstallInstructions();
  if (instructions === undefined) return <></>;

  const isOpen = useRouteQuery(installInstructionsDrawerQuery);

  const toggleNestedDrawerAttribute = (value: boolean) => {
    document.body.toggleAttribute('data-nested-drawer-is-open', value);
  };

  const closeDrawer = async () => {
    await removeRouteQuery(installInstructionsDrawerQuery, isOpen);
  };

  isOpen.runAndListen(toggleNestedDrawerAttribute);
  const heading = `Install with ${instructions.name}.`;
  const paragraph = 'Follow these steps to install Enjoy Your Day:';

  return (
    <BottomDrawer
      class={classes.nestedDrawer}
      shrinkTarget={props.shrinkTarget}
      open={isOpen}
      onClose={closeDrawer}
      onBeforeClose={toggleNestedDrawerAttribute}
    >
      <h3 class={classes.heading}>{heading}</h3>
      {If(props.children, () => (
        <>{props.children}</>
      ))}
      <p class={classes.paragraph}>{paragraph}</p>
      <ol>
        {For(instructions.instructions, (instruction) => (
          <ListItem Icon={instruction.icon} text={instruction.title} />
        ))}
      </ol>
      <Button
        class={classes.closeButton}
        variant="secondary"
        rounded
        vibrate
        onClick={closeDrawer}
      >
        Close
      </Button>
    </BottomDrawer>
  );
}

interface ListItemProps {
  Icon: (props: IconProps) => JSX.Template;
  text: string;
}

function ListItem(props: ListItemProps) {
  const { Icon, text } = props;
  return (
    <li class={classes.listItem}>
      <Icon class={classes.listItemIcon} />
      {text}
    </li>
  );
}
