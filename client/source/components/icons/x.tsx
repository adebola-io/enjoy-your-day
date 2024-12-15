import type { IconProps } from './props';

export function XIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Cancel</title>
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M6.00024 6L14.2498 14.2496"
        stroke="white"
        stroke-width="1.66667"
        stroke-linecap="round"
      />
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M6.00024 14.2496L14.2498 6"
        stroke="white"
        stroke-width="1.66667"
        stroke-linecap="round"
      />
    </svg>
  );
}

export default XIcon;
