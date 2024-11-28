import { Input } from '#/components/Input';
import { Logo } from '#/components/Logo';
import { Button } from '#/components/Button';
import { useRouter } from '@adbl/unfinished/router';
import { username } from '#/data';
import styles from './Onboarding.module.css';
import { vibrate } from '#/library';

export default function EnterUsername() {
  const router = useRouter();

  const handleNameSubmit = (event: Event) => {
    event.preventDefault();
    vibrate();
    router.navigate('/onboarding/select-categories');
  };

  return (
    <form class={styles.nameForm} onSubmit={handleNameSubmit}>
      <Logo class={styles.nameFormLogo} />
      <h2 class={styles.nameFormHeading}>What's your name?</h2>
      <p class={styles.nameFormSubHeading}>
        What should I call you to make this more personal?
      </p>
      <Input required class={styles.nameFormInput} model={username} />
      <Button type="submit" class={styles.nameSubmitButton} vibrateOnClick>
        Continue
      </Button>
    </form>
  );
}
