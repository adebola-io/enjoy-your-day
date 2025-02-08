import CompassIcon from '#/components/icons/compass';
import BullseyeIcon from '#/components/icons/bullseye';
import MountainIcon from '#/components/icons/mountain';
import { InvolvementLevel } from '#/components/involvement-level';
import { Button } from '#/components/button';
import { selectedCategories, username } from '#/data/state';
import { useRouter } from '@adbl/unfinished/router';
import { BackButton } from '#/components/back-button';
import classes from './involvement.module.css';

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
    await router.replace('/onboarding/loading');
  };

  return (
    <>
      <form
        class={classes.container}
        onSubmit--prevent={handleInvolvementSelection}
      >
        <h1 class={classes.heading}>How involved should your goals be?</h1>
        <p class={classes.subHeading}>
          You can select a preferred level of difficulty for your goals.
        </p>
        {/* Involvement Levels. */}
        <fieldset class={classes.inputs}>
          <InvolvementLevel
            Icon={CompassIcon}
            value={1}
            title="Explorer"
            description="Light, mundane and manageable goals."
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
        </fieldset>
        <Button class={classes.submitBtn} type="submit" vibrate>
          Continue
        </Button>
      </form>
      <BackButton class={classes.backButton} />
    </>
  );
}
