import SearchIcon from '#/components/icons/search';
import { Input } from '#/components/input';
import { For, If } from '@adbl/unfinished';
import type { JSX } from '@adbl/unfinished/jsx-runtime';
import { Cell } from '@adbl/cells';
import classes from './search-input.module.css';

export type AutoCompleteGetter<T> = (value: string) => T[] | Promise<T[]>;

export type SearchInputProps<T> = JSX.IntrinsicElements['form'] & {
  ref?: Cell<HTMLFormElement | null>;
  placeholder?: string;
  containerClasses?: unknown;
  autoCompleteGetter?: AutoCompleteGetter<T>;
  autoCompleteTemplate?: (value: T) => JSX.Template;
  onDismiss?: () => void;
};

export function SearchInput<T>(props: SearchInputProps<T>) {
  const {
    placeholder,
    autoCompleteGetter,
    autoCompleteTemplate,
    ref: formRef = Cell.source(null),
    ...rest
  } = props;
  const autoCompleteRef = Cell.source<HTMLElement | null>(null);
  const searchValue = Cell.source('');
  const completionOptions = Cell.source<T[]>([]);
  const completionOptionsCount = Cell.derived(() => {
    return completionOptions.value.length;
  });
  const hasCompletion = Cell.derived(() => completionOptionsCount.value > 0);
  const ulStyles = {
    '--total': Cell.derived(() => String(completionOptionsCount.value)),
  };

  searchValue.listen(async (value) => {
    const options = await autoCompleteGetter?.(value);
    if (!options) return;
    completionOptions.value = options;
  });

  const handleBlur = (event: FocusEvent) => {
    const relatedTarget = event.relatedTarget;
    const isWithinForm =
      relatedTarget instanceof Node && formRef.value?.contains(relatedTarget);
    if (!isWithinForm) props.onDismiss?.();
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      props.onDismiss?.();
    }
  };

  return (
    <form
      {...rest}
      ref={formRef}
      class={[classes.searchContainer, props.class]}
      onKeyDown={handleKeyDown}
    >
      <div class={[classes.searchInputContainer, props.containerClasses]}>
        <SearchIcon class={classes.searchIcon} />
        <Input
          class={classes.searchBar}
          type="search"
          placeholder={placeholder}
          model={searchValue}
          onBlur={handleBlur}
        />
      </div>
      {autoCompleteTemplate
        ? If(hasCompletion, () => {
            return (
              <ul
                ref={autoCompleteRef}
                class={classes.autoCompleteDropdown}
                style={ulStyles}
                tabIndex={-1}
                onFocusOut={handleBlur}
              >
                {For(completionOptions, autoCompleteTemplate)}
              </ul>
            );
          })
        : null}
    </form>
  );
}
