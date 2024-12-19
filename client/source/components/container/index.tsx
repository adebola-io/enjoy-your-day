import { appendChild, setAttributeFromProps } from '@adbl/unfinished';
import type { JSX } from '@adbl/unfinished/jsx-dev-runtime';
import classes from './container.module.css';

export type ContainerProps = JSX.IntrinsicElements['div'] & {
  as?: keyof HTMLElementTagNameMap;
  children?: unknown;
};

export function Container(props: ContainerProps): JSX.Template {
  const { children, as: tagname = 'div', ...rest } = props;
  const container = document.createElement(tagname);
  for (const [key, value] of Object.entries(rest)) {
    if (key === 'class') {
      setAttributeFromProps(container, key, [classes.container, value]);
      continue;
    }
    setAttributeFromProps(container, key, value);
  }
  appendChild(container, tagname, props.children);
  return container;
}
