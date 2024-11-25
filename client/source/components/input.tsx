import type { JSX } from '@adbl/unfinished/jsx-runtime';
import styles from './input.module.css';
import { SourceCell } from '@adbl/cells';

type InputProps = JSX.IntrinsicElements['input'] & {
  model?: SourceCell<string>;
};
export function Input(props: InputProps) {
  const { model, ...rest } = props;
  const input = (
    <input
      {...rest}
      onInput={handleInput}
      class={[styles.input, props.class ?? '']}
    />
  ) as HTMLInputElement;

  const callback = (value: string) => {
    input.value = value;
  };
  model?.runAndListen(callback, { weak: true });

  function handleInput(event: Event) {
    callback; // Keeps the callback alive in memory until the input is freed.
    if (!input.value) return;
    if (model?.value === input.value) return;

    if (typeof props.onInput === 'function') {
      props.onInput.bind(input)(event);
      if (event.defaultPrevented) return;
    }
    if (model) {
      model.value = input.value;
    }
  }

  return input;
}
