import type { IconProps } from './props';

export function PowerOffIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M33.3334 12.6464C38.315 15.5281 41.6667 20.9144 41.6667 27.0833C41.6667 36.2881 34.2048 43.75 25 43.75C15.7953 43.75 8.33337 36.2881 8.33337 27.0833C8.33337 20.9144 11.685 15.5281 16.6667 12.6464M25 6.25V27.0833"
        stroke="currentColor"
        stroke-width="4.16667"
        stroke-linecap="round"
        xmlns="http://www.w3.org/2000/svg"
      />
    </svg>
  );
}

export default PowerOffIcon;
