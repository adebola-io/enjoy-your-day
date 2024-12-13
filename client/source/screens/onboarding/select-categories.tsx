import classes from './onboarding.module.css';
import { For, If } from '@adbl/unfinished';
import { selectedCategories, username } from '#/data/state';
import { categories, Category } from '#/data';
import { Button } from '#/components/button';
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
      <ul class={classes.categoryList}>{For(categories, CategoryCard)}</ul>
      <Button
        class={classes.categorySubmitButton}
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
    <li class={classes.category} style={categoryStyles}>
      {If(isSelected, () => {
        return <CheckIcon class={classes.categoryCheckIcon} />;
      })}
      <button
        type="button"
        class={classes.categoryButton}
        onClick={selectCategory}
      >
        <category.icon class={classes.categoryIcon} />
        {category.name}
      </button>
    </li>
  );
}
