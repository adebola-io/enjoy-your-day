import type { JSX } from '@adbl/unfinished/jsx-runtime';
import styles from './input.module.css';
import { Cell, SourceCell } from '@adbl/cells';

type InputProps = JSX.IntrinsicElements['input'] & {
  model?: SourceCell<string>;
};
export function Input(props: InputProps) {
  const input = Cell.source<HTMLInputElement | undefined>(undefined);
  const { model, ...rest } = props;
  const callback = (value: string) => {
    if (!input.value) return;
    input.value.value = value;
  };
  model?.listen(callback, { weak: true });

  const handleInput = (event: Event) => {
    callback; // Keeps the callback alive in memory until the input is freed.
    if (!input.value) return;
    const inputElement = input.value;
    if (model?.value === inputElement.value) {
      return;
    }
    if (typeof props.onInput === 'function') {
      props.onInput.bind(inputElement)(event);
      if (event.defaultPrevented) return;
    }
    if (model) {
      model.value = inputElement.value;
    }
  };

  return (
    <input
      {...rest}
      ref={input}
      onInput={handleInput}
      class={[styles.input, props.class ?? '']}
    />
  );
}
