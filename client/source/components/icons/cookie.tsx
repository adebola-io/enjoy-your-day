import type { IconProps } from './props';

export function CookieIcon(props: IconProps) {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M18.75 33.3333H18.7708M25 22.9167H25.0208M14.5833 20.8333H14.6042M31.25 33.3333H31.2708M43.75 25C43.75 35.3554 35.3554 43.75 25 43.75C14.6447 43.75 6.25 35.3554 6.25 25C6.25 14.6447 14.6447 6.25 25 6.25C25 12.003 28.731 16.6667 33.3333 16.6667C33.3333 21.269 37.9971 25 43.75 25Z"
        stroke="currentColor"
        stroke-width="4.16667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default CookieIcon;
