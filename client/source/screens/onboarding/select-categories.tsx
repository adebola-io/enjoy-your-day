import styles from './onboarding.module.css';
import { For, If } from '@adbl/unfinished';
import {
  categories,
  type Category,
  selectedCategories,
  username,
} from '#/data';
import { Button } from '#/components/Button';
import { Cell } from '@adbl/cells';
import { CheckIcon } from '#/components/icons/check';
import { useRouter } from '@adbl/unfinished/router';
import { vibrate } from '#/library';

export default async function SelectCategories() {
  const router = useRouter();
  const formRef = Cell.source<HTMLFormElement | null>(null);
  if (username.value === '') {
    await router.replace('/onboarding/name');
    return;
  }

  const continueButtonIsDisabled = Cell.derived(() => {
    return selectedCategories.value.length < 3;
  });

  const loadApp = async () => {
    if (!formRef.value) return;
    formRef.value.style.opacity = '0';

    await Promise.all(
      formRef.value.getAnimations().map((animation) => animation.finished)
    );
    await router.replace('/onboarding/loading');
  };

  return (
    <form ref={formRef} class={styles.categoryForm}>
      <h1 class={styles.categoryFormHeading}>What are you interested in?</h1>
      <p class={styles.categoryFormSubHeading}>
        Pick <i>at least 3</i> categories for the goals you want. Let's keep
        going!
      </p>
      <ul class={styles.categoryList}>{For(categories, CategoryCard)}</ul>
      <Button
        class={styles.categorySubmitButton}
        disabled={continueButtonIsDisabled}
        vibrateOnClick
        onClick={loadApp}
      >
        Continue
      </Button>
    </form>
  );
}

function CategoryCard(category: Category, index: Cell<number>) {
  const selectCategory = () => {
    vibrate();
    if (selectedCategories.value.includes(category.name)) {
      const index = selectedCategories.value.indexOf(category.name);
      selectedCategories.value.splice(index, 1);
      return;
    }
    selectedCategories.value.push(category.name);
  };

  const isSelected = Cell.derived(() => {
    return selectedCategories.value.includes(category.name);
  });

  const categoryStyles = {
    '--color': category.theme,
    animationDelay: `${index.value * 0.05 + 0.3}s`,
  };

  return (
    <li class={styles.category} style={categoryStyles}>
      {If(isSelected, () => {
        return <CheckIcon class={styles.categoryCheckIcon} />;
      })}
      <button
        type="button"
        class={styles.categoryButton}
        onClick={selectCategory}
      >
        <category.icon class={styles.categoryIcon} />
        {category.name}
      </button>
    </li>
  );
}
