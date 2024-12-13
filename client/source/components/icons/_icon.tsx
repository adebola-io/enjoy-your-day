import type { IconProps } from './props';
import type { IconName } from '#/library/icon-name';

export type DynamicIconProps = IconProps & {
  name: IconName;
};

/**
 * Dynamically imports and renders an icon component based on the provided name.
 *
 * @param props - The props for the icon component, including the name of the icon to render.
 * @returns The rendered icon component.
 */
export async function Icon(props: DynamicIconProps) {
  const module = await import(`./${props.name}.tsx`);
  const IconComponent = module.default;
  return (<IconComponent {...props} />) as Node;
}
