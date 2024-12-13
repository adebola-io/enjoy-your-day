import type { IconProps } from './props';

export function HamburgerIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Hamburger Icon</title>
      <g xmlns="http://www.w3.org/2000/svg" clip-path="url(#clip0_200_474)">
        <path
          xmlns="http://www.w3.org/2000/svg"
          d="M10 18.5H39.1667"
          stroke="currentColor"
          stroke-width="4.16667"
          stroke-linecap="round"
        />
        <path
          xmlns="http://www.w3.org/2000/svg"
          d="M10 31.5H39.1667"
          stroke="currentColor"
          stroke-width="4.16667"
          stroke-linecap="round"
        />
      </g>
      <defs xmlns="http://www.w3.org/2000/svg">
        <clipPath xmlns="http://www.w3.org/2000/svg" id="clip0_200_474">
          <rect
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="white"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export default HamburgerIcon;
