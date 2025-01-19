import type { IconProps } from '../icons/props';
import type { IconName } from '#/library/icon-name';
import { setAttributeFromProps, useObserver } from '@adbl/unfinished';
import type { JSX } from '@adbl/unfinished/jsx-runtime';
import { Cell } from '@adbl/cells';

export type DynamicIconProps = IconProps & {
  name: JSX.ValueOrCell<IconName | undefined>;
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
export function Icon(props: DynamicIconProps) {
  const observer = useObserver();
  const { name, inline, ...rest } = props;
  let placeholder: ChildNode = document.createComment('---');

  const getIcon = async (name?: string) => {
    if (!name) return;
    const module = await import(`../icons/${name}.tsx`);
    const IconComponent = module.default;
    const svgNode = (<IconComponent {...props} />) as [SVGElement];
    if (!inline) {
      placeholder.replaceWith(svgNode[0]);
      placeholder = svgNode[0];
      return;
    }

    // Serializing as an <img> tag.
    const svgString = svgNode[0].outerHTML;
    const img = document.createElement('img');
    for (const [key, value] of Object.entries(rest)) {
      setAttributeFromProps(img, key, value);
    }
    img.src = `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
    placeholder.replaceWith(img);
    placeholder = img;
  };

  observer.onConnected(Cell.source(placeholder), () => {
    if (Cell.isCell(name)) {
      name.runAndListen((value) => {
        getIcon(value);
        Reflect.set(placeholder, 'cell', name);
      });
    } else getIcon(name);
  });

  return placeholder as JSX.Template;
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
