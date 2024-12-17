import type { IconProps } from '../icons/props';
import type { JSX } from '@adbl/unfinished/jsx-runtime';
import { setAttributeFromProps } from '@adbl/unfinished';

export interface InlinedIconProps extends IconProps {
  Icon: (props: IconProps) => JSX.Template;
  color: string;
  title: string;
}

export function InlinedIcon(props: InlinedIconProps) {
  const { Icon, color, ...rest } = props;
  const icon = (<Icon {...rest} color={color} />) as [SVGElement];

  // Serializing as an <img> tag.
  const svgString = icon[0].outerHTML;
  const img = document.createElement('img');
  for (const [key, value] of Object.entries(rest)) {
    setAttributeFromProps(img, key, value);
  }
  img.src = `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
  setAttributeFromProps(img, 'alt', rest.title);
  return img;
}
