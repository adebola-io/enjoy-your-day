import { BottomDrawer } from '#/components/bottom-drawer';
import { Button } from '#/components/button';
import { InvolvementLevel } from '#/components/involvement-level';
import CompassIcon from '#/components/icons/compass';
import BullseyeIcon from '#/components/icons/bullseye';
import MountainIcon from '#/components/icons/mountain';
import { removeRouteQuery } from '#/library/utils';
import ProfileIcon from '#/components/icons/profile';
import {
  username,
  involvementLevelStr,
  involvementLevelIcon,
  selectedCategories,
  involvementLevel,
} from '#/data/state';
import { Cell } from '@adbl/cells';
import { useRouter } from '@adbl/unfinished/router';
import { Input } from '#/components/input';
import { For, If } from '@adbl/unfinished';
import { categories } from '#/data/categories';
import { MAX_USERNAME_LENGTH } from '#/data/constants';
import classes from './profile-drawer.module.css';
import { ElasticView } from '#/components/elastic-view';
import { CategoryCard } from '#/components/category-card';

export function ProfileDrawer() {
  const router = useRouter();
  const route = router.getCurrentRoute();
  const usernameIsFocused = Cell.source(false);
  const involvementLevelIsFocused = Cell.source(false);
  const usernameInput = Cell.source<HTMLInputElement | null>(null);
  const categoriesFocused = Cell.source(false);
  let initialUsernameValue = '';
  const isOpen = Cell.derived(
    () => route.value.query.get('level-one') === 'profile'
  );
  const focused = Cell.derived(
    () =>
      involvementLevelIsFocused.value ||
      usernameIsFocused.value ||
      categoriesFocused.value
  );
  const buttonText = Cell.derived(() => (focused.value ? 'Save' : 'Close'));
  const isClosable = Cell.derived(() => !focused.value);
  const selectedCategoriesSnippet = Cell.derived(() =>
    selectedCategories.value.slice(0, 3)
  );
  const selectedCategoriesRestCount = Cell.derived(() =>
    Math.max(0, selectedCategories.value.length - 3)
  );
  const buttonDisabled = Cell.derived(
    () => selectedCategories.value.length < 3
  );

  const handleDrawerClose = async () => {
    await removeRouteQuery('level-one', isOpen);
  };

  const handleUsernameFocus = () => {
    usernameIsFocused.value = true;
    initialUsernameValue = username.value;
  };

  const saveUsername = () => {
    usernameIsFocused.value = false;
    if (username.value === '') username.value = initialUsernameValue;
  };

  const handleUsernameBlur = (event: FocusEvent) => {
    if (event.relatedTarget instanceof HTMLButtonElement) return;
    saveUsername();
  };

  const handleInvolvementClick = () => {
    involvementLevelIsFocused.value = true;
  };

  const handleCategoriesClick = () => {
    categoriesFocused.value = true;
  };

  const handleInvolvementBlur = () => {
    involvementLevelIsFocused.value = false;
  };

  const handleSubmit = async () => {
    if (usernameIsFocused.value) {
      saveUsername();
      usernameInput.value?.blur();
      return;
    }

    if (involvementLevelIsFocused.value) {
      involvementLevelIsFocused.value = false;
      return;
    }

    if (categoriesFocused.value) {
      categoriesFocused.value = false;
      return;
    }

    await handleDrawerClose();
  };

  focused.listen((focused) => {
    document.body.toggleAttribute('data-drawer-inner-focus', focused);
  });

  return (
    <BottomDrawer
      open={isOpen}
      closable={isClosable}
      shrinkTarget="#settingsView"
      class={classes.profileDrawer}
      data-username-focused={usernameIsFocused}
      data-involvement-level-focused={involvementLevelIsFocused}
      data-categories-focused={categoriesFocused}
      onClose={handleDrawerClose}
    >
      <form class={classes.content} onSubmit--prevent={handleSubmit}>
        <div class={classes.profilePictureContainer}>
          <ProfileIcon class={classes.profilePicture} />
        </div>
        <Input
          ref={usernameInput}
          class={classes.username}
          model={username}
          onFocus={handleUsernameFocus}
          onBlur={handleUsernameBlur}
          maxlength={MAX_USERNAME_LENGTH}
          spellcheck="false"
          autoCorrect="off"
        />
        <button
          type="button"
          class={classes.involvementLevel}
          onClick={handleInvolvementClick}
        >
          <involvementLevelIcon.value class={classes.involvementLevelIcon} />
          <span class={classes.involvementLevelText}>
            {involvementLevelStr}
          </span>
        </button>
        <InvolvementLevels onBlur={handleInvolvementBlur} />
        <Categories />
        <button
          type="button"
          class={classes.selectedCategoriesListContainer}
          onClick={handleCategoriesClick}
        >
          <ul class={classes.selectedCategoriesList}>
            {For(selectedCategoriesSnippet, SelectedCategory)}
            {If(selectedCategoriesRestCount, (count) => {
              return <div class={classes.restIndicator}>+{count}</div>;
            })}
          </ul>
        </button>
        <Button
          class={classes.closeButton}
          rounded
          vibrate
          variant="primary"
          type="submit"
          disabled={buttonDisabled}
        >
          {buttonText}
        </Button>
      </form>
    </BottomDrawer>
  );
}

function SelectedCategory(categoryName: string) {
  const category = categories.find((c) => c.name === categoryName);
  if (!category) return <></>;

  const styles = { backgroundColor: category.theme };

  return (
    <li class={classes.selectedCategory} style={styles}>
      <category.icon class={classes.selectedCategoryIcon} />
      <span class={classes.selectedCategoryName}>{categoryName}</span>
    </li>
  );
}

interface InvolvementLevelProps {
  onBlur: () => void;
}

function InvolvementLevels(props: InvolvementLevelProps) {
  const { onBlur } = props;
  return (
    <fieldset class={classes.involvementLevelsFieldset} onClick--self={onBlur}>
      <InvolvementLevel
        checked={Cell.derived(() => involvementLevel.value === 1)}
        Icon={CompassIcon}
        value={1}
        title="Explorer"
        description="Light, mundane and manageable goals."
        color="#a1d8ff"
      />
      <InvolvementLevel
        checked={Cell.derived(() => involvementLevel.value === 2)}
        Icon={BullseyeIcon}
        value={2}
        title="Navigator"
        description="Focus to achieve results, balance effort and reward."
        color="#53f6eb"
      />
      <InvolvementLevel
        checked={Cell.derived(() => involvementLevel.value === 3)}
        Icon={MountainIcon}
        value={3}
        title="Trailblazer"
        description="Looking for a challenge?"
        color="#ff8bdf"
      />
    </fieldset>
  );
}

function Categories() {
  return (
    <ElasticView class={classes.categoryList} yAxis>
      {For(categories, CategoryCard)}
    </ElasticView>
  );
}
