import { For } from '@adbl/unfinished';
import { selectedCategories, username } from '#/data/state';
import { categories, type Category } from '#/data';
import { Button } from '#/components/button';
import { Cell } from '@adbl/cells';
import { useRouter } from '@adbl/unfinished/router';
import { vibrate } from '#/library/utils';
import classes from './select-categories.module.css';

export default async function SelectCategories() {
  const router = useRouter();
  const formRef = Cell.source<HTMLFormElement | null>(null);
  if (username.value === '') {
    await router.replace('/onboarding/enter-name');
    return;
  }

  const continueButtonIsDisabled = Cell.derived(() => {
    return selectedCategories.value.length < 3;
  });

  const loadApp = async () => {
    if (!formRef.value) return;
    formRef.value.style.opacity = '0';
    const animationPromises = formRef.value
      .getAnimations()
      .map((animation) => animation.finished);
    await Promise.all(animationPromises);
    await router.replace('/onboarding/loading');
  };

  return (
    <form ref={formRef} class={classes.categoryForm}>
      <h1 class={classes.categoryFormHeading}>What are you interested in?</h1>
      <p class={classes.categoryFormSubHeading}>
        Pick <i>at least 3</i> categories for the goals you want. Let's keep
        going!
      </p>
      <div class={classes.categoryListContainer}>
        <div class={classes.categoryList}>{For(categories, CategoryCard)}</div>
      </div>
      <Button
        class={classes.categorySubmitButton}
        disabled={continueButtonIsDisabled}
        vibrate
        onClick={loadApp}
      >
        Continue
      </Button>
    </form>
  );
}

function CategoryCard(category: Category, index: Cell<number>) {
  const selectCategory = function (this: HTMLInputElement) {
    vibrate();
    if (this.checked) {
      selectedCategories.value.push(category.name);
      return;
    }
    const index = selectedCategories.value.indexOf(category.name);
    selectedCategories.value.splice(index, 1);
  };

  const isSelected = Cell.derived(() => {
    return selectedCategories.value.includes(category.name);
  });

  const categoryStyles = {
    '--category-color': category.theme,
    animationDelay: `${index.value * 0.015 + 0.2}s`,
  };

  return (
    <label
      class={classes.category}
      style={categoryStyles}
      data-is-selected={isSelected}
    >
      <input
        type="checkbox"
        onChange={selectCategory}
        checked={isSelected.value}
      />
      <category.icon class={classes.categoryIcon} />
      {category.name}
    </label>
  );
}
