import type { IconProps } from './props';

export function StackIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 31 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Stack</title>
      <rect
        xmlns="http://www.w3.org/2000/svg"
        width="17.6441"
        height="17.0472"
        x="-0.3"
        y="2.5"
        rx="4"
        transform="matrix(0.88729 -0.461211 0.88729 0.461211 0.21875 8.13763) scale(0.9)"
        stroke="currentColor"
        stroke-width="2.8"
      />
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M2.10522 19.2476L15.3641 25.4952L29.6429 19.2476"
        stroke="currentColor"
        stroke-width="2.2"
        stroke-linecap="round"
      />
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M2.10522 14L15.3641 20.2476L29.6429 14"
        stroke="currentColor"
        stroke-width="2.2"
        stroke-linecap="round"
      />
    </svg>
  );
}

export default StackIcon;
