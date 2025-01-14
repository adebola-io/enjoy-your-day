import { Input } from '#/components/input';
import { Logo } from '#/components/logo';
import { Button } from '#/components/button';
import { username } from '#/data/state';
import { vibrate } from '#/library/utils';
import { useRouter } from '@adbl/unfinished/router';
import classes from './onboarding.module.css';

export default function EnterName() {
  const router = useRouter();

  const handleNameSubmit = () => {
    vibrate();
    router.navigate('/onboarding/select-categories');
  };

  return (
    <form class={classes.nameForm} onSubmit--prevent={handleNameSubmit}>
      <Logo class={classes.nameFormLogo} />
      <h2 class={classes.nameFormHeading}>What's your name?</h2>
      <p class={classes.nameFormSubHeading}>
        What should I call you to make this more personal?
      </p>
      <Input required class={classes.nameFormInput} model={username} />
      <Button type="submit" class={classes.nameSubmitButton} vibrate>
        Continue
      </Button>
    </form>
  );
}
