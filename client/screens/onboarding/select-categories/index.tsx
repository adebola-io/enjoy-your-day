import { CategoryCard } from '#/components/category-card';
import { Button } from '#/components/button';
import { selectedCategories, username } from '#/data/state';
import { categories } from '#/data/categories';
import { Cell } from '@adbl/cells';
import { For } from '@adbl/unfinished';
import { useRouter } from '@adbl/unfinished/router';
import classes from './select-categories.module.css';
import { elementAnimationsFinished } from '#/library/utils';
import { ElasticArea } from '@adbl/iota/elastic-area';

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

  const goToInvolvement = async () => {
    if (!formRef.value) return;
    formRef.value.style.opacity = '0';
    await elementAnimationsFinished(formRef.value);
    await router.navigate('/onboarding/involvement');
  };

  return (
    <form ref={formRef} class={classes.categoryForm}>
      <h1 class={classes.categoryFormHeading}>What are you interested in?</h1>
      <p class={classes.categoryFormSubHeading}>
        Pick <i>at least 3</i> categories for the goals you want. Let's keep
        going!
      </p>
      <div class={classes.categoryListContainer}>
        <ElasticArea class={classes.categoryList} yAxis>
          {For(categories, CategoryCard)}
        </ElasticArea>
      </div>
      <Button
        class={classes.categorySubmitButton}
        disabled={continueButtonIsDisabled}
        vibrate
        onClick={goToInvolvement}
      >
        Continue
      </Button>
    </form>
  );
}
