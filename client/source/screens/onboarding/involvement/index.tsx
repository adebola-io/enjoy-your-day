import CompassIcon from '#/components/icons/compass';
import BullseyeIcon from '#/components/icons/bullseye';
import MountainIcon from '#/components/icons/mountain';
import type { IconProps } from '#/components/icons/props';
import { Button } from '#/components/button';
import { involvementLevel, selectedCategories, username } from '#/data/state';
import type { JSX } from '@adbl/unfinished/jsx-runtime';
import { useRouter } from '@adbl/unfinished/router';
import classes from './involvement.module.css';
import { vibrate } from '#/library/utils';

export default async function Involvement() {
  const router = useRouter();

  if (username.value === '') {
    await router.replace('/onboarding/enter-name');
    return;
  }

  if (selectedCategories.value.length < 3) {
    await router.replace('/onboarding/select-categories');
    return;
  }

  const handleInvolvementSelection = async function (this: HTMLFormElement) {
    const formData = new FormData(this);
    const value = Number(formData.get('involvementLevel'));
    involvementLevel.value = value;
    await router.replace('/onboarding/loading');
  };

  return (
    <form
      class={classes.container}
      onSubmit--prevent={handleInvolvementSelection}
    >
      <h1 class={classes.heading}>How involved should your goals be?</h1>
      <InvolvementLevel
        Icon={CompassIcon}
        value={1}
        title="Explorer"
        description="Light, mundane and manageable goals each day."
        color="#a1d8ff"
      />
      <InvolvementLevel
        Icon={BullseyeIcon}
        value={2}
        title="Navigator"
        description="Focus to achieve results, balance effort and reward."
        color="#53f6eb"
      />
      <InvolvementLevel
        Icon={MountainIcon}
        value={3}
        title="Trailblazer"
        description="Looking for a challenge?"
        color="#ff8bdf"
      />
      <Button class={classes.submitBtn} type="submit" vibrate>
        Continue
      </Button>
    </form>
  );
}

interface InvolvementLevelProps {
  value: number;
  title: string;
  Icon: (props: IconProps) => JSX.Template;
  description: string;
  color: string;
}

function InvolvementLevel(props: InvolvementLevelProps) {
  const { title, Icon, description, color, value } = props;
  const styles = { '--level-color': color, '--level-value': value };
  return (
    <label
      class={classes.involvementLevel}
      style={styles}
      onClick={() => vibrate()}
    >
      <Icon class={classes.icon} />
      <input type="radio" name="involvementLevel" value={value} required />
      <h2 class={classes.title}>{title}</h2>
      <p class={classes.description}>{description}</p>
    </label>
  );
}
