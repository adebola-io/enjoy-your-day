import { InlinedIcon } from '#/components/inlined-icon';
import type { Category } from '#/data/categories';
import { selectedCategories } from '#/data/state';
import { vibrate } from '#/library/utils';
import { Cell } from '@adbl/cells';
import classes from './category-card.module.css';

export function CategoryCard(category: Category, index: Cell<number>) {
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
    animationDelay: `${index.value * 0.02 + 0.1}s`,
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
      <InlinedIcon
        Icon={category.icon}
        class={classes.categoryIcon}
        title="Illustrative Icon"
        color="white"
      />
      {category.name}
    </label>
  );
}
