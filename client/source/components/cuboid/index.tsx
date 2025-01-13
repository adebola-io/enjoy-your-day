import { ShadowRoot } from '@adbl/unfinished/shadowroot';
import styles from './cuboid.css?inline';
import { JSX } from '@adbl/unfinished/jsx-runtime';

type DivProps = JSX.IntrinsicElements['div'];
export interface CuboidProps extends DivProps {
  length?: string;
  height?: string;
  breadth?: string;
  fill?: string;
  strokeWidth?: string;
  strokeStyle?: string;
  strokeColor?: string;
  curvature?: string;
  extraVars?: Record<string, JSX.ValueOrCell<string>>;
}

export function Cuboid(props: CuboidProps) {
  const {
    length,
    height,
    breadth,
    fill,
    strokeWidth,
    strokeStyle,
    strokeColor,
    extraVars,
    curvature,
    ...rest
  } = props;

  let extraStyles = `:host(x-cuboid) {`;
  if (length) extraStyles += `--cuboid-length: ${length};`;
  if (height) extraStyles += `--cuboid-height: ${height};`;
  if (breadth) extraStyles += `--cuboid-breadth: ${breadth};`;
  if (curvature) extraStyles += `--cuboid-curve: ${curvature};`;
  if (fill) extraStyles += `--cuboid-fill: ${fill};`;
  if (strokeWidth) extraStyles += `--cuboid-stroke-width: ${strokeWidth};`;
  if (strokeStyle) extraStyles += `--cuboid-stroke-style: ${strokeStyle};`;
  if (strokeColor) extraStyles += `--cuboid-stroke-color: ${strokeColor};`;

  if (extraVars)
    for (const [key, value] of Object.entries(extraVars)) {
      extraStyles += `${key}: ${value};`;
    }
  extraStyles += '}';

  return (
    <x-cuboid data-curved={curvature !== undefined} {...rest}>
      <ShadowRoot mode="closed">
        <style>
          {styles} {extraStyles}
        </style>
        <div class="cuboid-face cuboid-back" part="back-face">
          <slot name="back" />
        </div>
        <div class="cuboid-face cuboid-left" part="left-face">
          <slot name="left" />
        </div>
        <div class="cuboid-face cuboid-right" part="right-face">
          <slot name="right" />
        </div>
        <div class="cuboid-face cuboid-bottom" part="bottom-face">
          <slot name="bottom" />
        </div>
        <div class="cuboid-face cuboid-top" part="top-face">
          <slot name="top" />
        </div>
        <div class="cuboid-face cuboid-front" part="front-face">
          <slot name="front" />
        </div>
      </ShadowRoot>
      {props.children}
    </x-cuboid>
  );
}
