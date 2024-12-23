import type { IconProps } from './props';

export function BarChartIcon(props: IconProps) {
  return (
    <svg
      width="25"
      height="27"
      viewBox="0 0 25 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>{props.title}</title>
      <rect
        xmlns="http://www.w3.org/2000/svg"
        x="1"
        y="13"
        width="8"
        height="13"
        rx="1.5"
        stroke="currentColor"
        stroke-width="2"
        data-bar-1
      />
      <rect
        xmlns="http://www.w3.org/2000/svg"
        x="9"
        y="8"
        width="7.5"
        height="18"
        rx="1.5"
        stroke="currentColor"
        stroke-width="2"
        data-bar-2
      />
      <rect
        xmlns="http://www.w3.org/2000/svg"
        x="17"
        y="2"
        width="7.5"
        height="24"
        rx="1.5"
        stroke="currentColor"
        stroke-width="2"
        data-bar-3
      />
    </svg>
  );
}

export default BarChartIcon;
