import styles from './styles.module.css';
import { For } from '@adbl/unfinished';
import { categories } from '@/data';
import { Button } from '@/components/button';

export default function CategoriesSelection() {
  return (
    <form class={styles.categoryForm}>
      <h1 class={styles.categoryFormHeading}>What are you interested in?</h1>
      <p class={styles.categoryFormSubHeading}>
        Pick at least 2 categories for the goals you want. Let's keep going!
      </p>
      <ul class={styles.categoryList}>
        {For(categories, (category) => {
          return (
            <li class={styles.category} style={{ color: category.theme }}>
              <category.icon class={styles.categoryIcon} />
            </li>
          );
        })}
      </ul>
      <Button class={styles.categorySubmitButton}>Continue</Button>
    </form>
  );
}
