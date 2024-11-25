import styles from './start.module.css';
import { For, If } from '@adbl/unfinished';
import {
  appLoadingState,
  categories,
  type Category,
  name,
  selectedCategories,
} from '@/data';
import { Button } from '@/components/button';
import { Cell } from '@adbl/cells';
import { CheckIcon } from '@/components/icons/check';
import { useRouter } from '@adbl/unfinished/router';

export default async function CategoriesSelection() {
  const { replace } = useRouter();
  const formRef = Cell.source<HTMLFormElement | null>(null);
  if (name.value === '') {
    await replace('/start/name');
    return;
  }

  const continueButtonIsDisabled = Cell.derived(() => {
    return selectedCategories.value.length < 2;
  });

  const loadApp = async () => {
    if (!formRef.value) return;
    formRef.value.style.opacity = '0';

    await Promise.all(
      formRef.value.getAnimations().map((animation) => animation.finished)
    );

    appLoadingState.value = 'loading';
    setTimeout(() => {
      appLoadingState.value = 'finishing';
      setTimeout(() => replace('/app'), 1000);
    }, 2000);
  };

  return (
    <form ref={formRef} class={styles.categoryForm}>
      <h1 class={styles.categoryFormHeading}>What are you interested in?</h1>
      <p class={styles.categoryFormSubHeading}>
        Pick at least 2 categories for the goals you want. Let's keep going!
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
    navigator.vibrate?.(10);
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
    color: category.theme,
    animationDelay: `${index.value * 0.05}s`,
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
