import { Input } from '@/components/input';
import { Logo } from '@/components/logo';
import { Button } from '@/components/button';
import styles from './styles.module.css';
import { useRouter } from '@adbl/unfinished/router';
import { name } from '@/data';

export function NameForm() {
  const router = useRouter();

  const handleNameSubmit = (event: Event) => {
    event.preventDefault();
    router.navigate('/start/categories');
  };

  return (
    <form class={styles.nameForm} onSubmit={handleNameSubmit}>
      <Logo class={styles.nameFormLogo} />
      <h2 class={styles.nameFormHeading}>What's your name?</h2>
      <p class={styles.nameFormSubHeading}>
        What should I call you to make this more personal?
      </p>
      <Input required class={styles.nameFormInput} model={name} />
      <Button type="submit" class={styles.nameSubmitButton} vibrateOnClick>
        Continue
      </Button>
    </form>
  );
}
