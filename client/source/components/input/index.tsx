import type { JSX } from '@adbl/unfinished/jsx-runtime';
import type { SourceCell } from '@adbl/cells';
import classes from './input.module.css';

export type InputProps = JSX.IntrinsicElements['input'] & {
  model?: SourceCell<string>;
  icon?: JSX.Element;
};
export function Input(props: InputProps) {
  const { model, icon, ...rest } = props;
  const input = (
    <input
      {...rest}
      onInput={handleInput}
      class={[classes.input, props.class]}
    />
  ) as HTMLInputElement;

  const callback = (value: string) => {
    input.value = value;
  };
  model?.runAndListen(callback, { weak: true });

  function handleInput(event: Event) {
    callback; // Keeps the callback alive in memory until the input is freed.
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
