import { BottomDrawer } from '#/components/bottom-drawer';
import type { IconProps } from '#/components/icons/props';
import { Button } from '#/components/button';
import type { JSX } from '@adbl/unfinished/jsx-runtime';
import type { InstallInstructions } from '#/data/install-instructions';
import { removeRouteQuery, useRouteQuery } from '#/library/utils';
import { For } from '@adbl/unfinished';
import classes from './nested-drawer.module.css';

interface NestedDrawerProps {
  instructions: InstallInstructions;
}

export const nestedDrawerQuery = 'nested-install-prompt-drawer';
export function NestedDrawer(props: NestedDrawerProps) {
  const { instructions } = props;
  const isOpen = useRouteQuery(nestedDrawerQuery);

  const toggleNestedDrawerAttribute = (value: boolean) => {
    document.body.toggleAttribute('data-nested-drawer-is-open', value);
  };

  const closeDrawer = async () => {
    await removeRouteQuery(nestedDrawerQuery, isOpen);
  };

  isOpen.listen(toggleNestedDrawerAttribute);
  const heading = `Install with ${instructions.name}.`;
  const paragraph = 'Follow these steps to install Enjoy Your Day:';

  71;

  return (
    <BottomDrawer
      class={classes.nestedDrawer}
      shrinkTarget="#installPromptDrawer"
      open={isOpen}
      onClose={closeDrawer}
      onBeforeClose={toggleNestedDrawerAttribute}
    >
      <h3 class={classes.heading}>{heading}</h3>
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
