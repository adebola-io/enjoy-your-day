import SearchIcon from '#/components/icons/search';
import { Input } from '#/components/input';
import { useObserver } from '#/library/useObserver';
import { For, If } from '@adbl/unfinished';
import type { JSX } from '@adbl/unfinished/jsx-runtime';
import { Cell } from '@adbl/cells';
import classes from './search-input.module.css';

export interface AutoCompleteOption<T> {
  onSelect?: (value: T) => void;
}

export type AutoCompleteGetter<T> = (value: string) => T[] | Promise<T[]>;

export type SearchInputProps<T> = JSX.IntrinsicElements['form'] & {
  ref?: Cell<HTMLFormElement | null>;
  placeholder?: JSX.ValueOrCell<string>;
  containerClasses?: unknown;
  autoCompleteGetter?: AutoCompleteGetter<T>;
  AutoCompleteTemplate?: (value: T) => JSX.Template;
  onDismiss?: () => void;
  onAutoCompleteSelect?: (value: T) => void;
  focused?: boolean;
};

export function SearchInput<T extends AutoCompleteOption<T>>(
  props: SearchInputProps<T>
) {
  const {
    placeholder,
    focused,
    autoCompleteGetter,
    AutoCompleteTemplate,
    containerClasses,
    onDismiss,
    onAutoCompleteSelect,
    ref = Cell.source(null),
    ...rest
  } = props;
  const observer = useObserver();
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

  const handleBlur = (event: FocusEvent) => {
    const relatedTarget = event.relatedTarget;
    const isWithinForm =
      relatedTarget instanceof Node && ref.value?.contains(relatedTarget);
    if (!isWithinForm) onDismiss?.();
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onDismiss?.();
    }
  };

  if (focused) {
    observer.onConnected(ref, (form) => {
      form.querySelector('input')?.focus();
    });
  }

  searchValue.listen(async (value) => {
    const options = await autoCompleteGetter?.(value);
    if (!options) return;
    completionOptions.value = options;
  });

  return (
    <form
      {...rest}
      ref={ref}
      class={[classes.searchContainer, props.class]}
      onKeyDown={handleKeyDown}
    >
      <div class={[classes.searchInputContainer, containerClasses]}>
        <SearchIcon class={classes.searchIcon} />
        <Input
          class={classes.searchBar}
          type="search"
          placeholder={placeholder}
          model={searchValue}
          onBlur={handleBlur}
        />
      </div>
      {AutoCompleteTemplate
        ? If(hasCompletion, () => {
            return (
              <ul
                ref={autoCompleteRef}
                class={classes.autoCompleteDropdown}
                style={ulStyles}
                tabIndex={-1}
                onFocusOut={handleBlur}
              >
                {For(completionOptions, (props) => {
                  return (
                    <AutoCompleteTemplate
                      {...props}
                      onSelect={onAutoCompleteSelect}
                    />
                  );
                })}
              </ul>
            );
          })
        : null}
    </form>
  );
}
