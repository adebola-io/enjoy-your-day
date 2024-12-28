import type { IconProps } from './props';

export function ClockCheckIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M6.25 11.4583L10.4167 7.29167M43.75 11.4583L39.5833 7.29167M18.75 26.0417L22.9167 30.2083L31.25 21.875M41.6667 26.0417C41.6667 35.2465 34.2048 42.7083 25 42.7083C15.7952 42.7083 8.33333 35.2465 8.33333 26.0417C8.33333 16.8369 15.7952 9.37501 25 9.37501C34.2048 9.37501 41.6667 16.8369 41.6667 26.0417Z"
        stroke="currentColor"
        stroke-width="4.16667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default ClockCheckIcon;
