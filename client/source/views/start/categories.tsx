import styles from './styles.module.css';
import { For, If } from '@adbl/unfinished';
import { categories, Category, name, selectedCategories } from '@/data';
import { Button } from '@/components/button';
import { Cell } from '@adbl/cells';
import { CheckIcon } from '@/components/icons/check';
import { useRouter } from '@adbl/unfinished/router';

export default async function CategoriesSelection() {
  const { navigate } = useRouter();
  if (name.value === '') {
    await navigate('/start/name');
    return;
  }

  const continueButtonIsDisabled = Cell.derived(() => {
    return selectedCategories.value.length < 2;
  });
  return (
    <form class={styles.categoryForm}>
      <h1 class={styles.categoryFormHeading}>What are you interested in?</h1>
      <p class={styles.categoryFormSubHeading}>
        Pick at least 2 categories for the goals you want. Let's keep going!
      </p>
      <ul class={styles.categoryList}>{For(categories, CategoryCard)}</ul>
      <Button
        class={styles.categorySubmitButton}
        disabled={continueButtonIsDisabled}
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
