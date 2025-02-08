import type { IconProps } from './props';

export function PaperPlaneIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clip-path="url(#clip0_930_3207)" xmlns="http://www.w3.org/2000/svg">
        <mask
          xmlns="http://www.w3.org/2000/svg"
          id="mask0_930_3207"
          style="mask-type:luminance"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="50"
          height="50"
        >
          <path
            d="M50 0H0V50H50V0Z"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          />
        </mask>
        <g xmlns="http://www.w3.org/2000/svg" mask="url(#mask0_930_3207)">
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M34.3753 18.75L20.3128 34.375V48.4375L25.0003 42.1875M48.4378 1.5625L1.56274 26.5625L39.0628 42.1875L48.4378 1.5625Z"
            stroke="currentColor"
            stroke-width="5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
      </g>
      <defs xmlns="http://www.w3.org/2000/svg">
        <clipPath id="clip0_930_3207" xmlns="http://www.w3.org/2000/svg">
          <rect
            width="50"
            height="50"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export default PaperPlaneIcon;
