import type { IconProps } from './props';

export function SpeedIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 50 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clip-path="url(#clip0_1192_149)" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M25 50.1666C11.25 50.1666 0 38.9166 0 25.1666C0 11.4166 11.25 0.166626 25 0.166626C38.75 0.166626 50 11.4166 50 25.1666C50 38.9166 38.75 50.1666 25 50.1666ZM25 5.16663C14 5.16663 5 14.1666 5 25.1666C5 36.1666 14 45.1666 25 45.1666C36 45.1666 45 36.1666 45 25.1666C45 14.1666 36 5.16663 25 5.16663Z"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        />
        <path
          d="M21.5 28.6666C19.5 26.6666 14.5 14.4166 14.5 14.4166C14.5 14.4166 26.75 19.4166 28.75 21.4166C30.75 23.4166 30.75 26.4166 28.75 28.4166C26.5 30.6666 23.5 30.6666 21.5 28.6666Z"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        />
      </g>
      <defs xmlns="http://www.w3.org/2000/svg">
        <clipPath id="clip0_1192_149" xmlns="http://www.w3.org/2000/svg">
          <rect
            width="50"
            height="50"
            fill="white"
            transform="translate(0 0.166626)"
            xmlns="http://www.w3.org/2000/svg"
          ></rect>
        </clipPath>
      </defs>
    </svg>
  );
}

export default SpeedIcon;
