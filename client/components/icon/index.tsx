import type { IconProps } from '../icons/props';
import type { IconName } from '#/library/icon-name';
import type { JSX } from '@adbl/unfinished/jsx-runtime';
import { setAttributeFromProps } from '@adbl/unfinished';

export type DynamicIconProps = IconProps & {
  name: IconName;
} & (
    | {
        inline: true;
        color: string;
        title: string;
      }
    | {
        inline?: false;
      }
  );

/**
 * Dynamically imports and renders an icon component based on the provided name.
 *
 * @param props - The props for the icon component, including the name of the icon to render.
 * @returns The rendered icon component.
 */
export async function Icon(props: DynamicIconProps) {
  const { name, inline, ...rest } = props;
  const module = await import(`../icons/${name}.tsx`);
  const IconComponent = module.default;
  const svgNode = IconComponent({ ...props }) as SVGElement;
  if (!inline) return svgNode;

  // Serializing as an <img> tag.
  const svgString = svgNode.outerHTML;
  const img = document.createElement('img');
  for (const [key, value] of Object.entries(rest)) {
    setAttributeFromProps(img, key, value);
  }
  img.src = `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
  return img;
}

export async function loadIconDataUrl(
  iconName: IconName,
  props: IconProps = {}
) {
  const module = await import(`../icons/${iconName}.tsx`);
  const IconComponent = module.default;
  const svgNode = (<IconComponent {...props} />) as [SVGElement];
  const svgString = svgNode[0].outerHTML;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
}

export function loadIconDataUrlEager(
  Icon?: (props: IconProps) => JSX.Template,
  props: IconProps = {}
) {
  if (!Icon) return '';
  const svgNode = (<Icon {...props} />) as [SVGElement];
  const svgString = svgNode[0].outerHTML;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
}
