import type { IconProps } from './props';

export function InfoIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M25.0001 45.8334C36.506 45.8334 45.8334 36.506 45.8334 25C45.8334 13.4941 36.506 4.16669 25.0001 4.16669C13.4941 4.16669 4.16675 13.4941 4.16675 25C4.16675 36.506 13.4941 45.8334 25.0001 45.8334Z"
        stroke="currentColor"
        stroke-width="3.125"
        xmlns="http://www.w3.org/2000/svg"
      />
      <path
        d="M25 35.4167V22.9167"
        stroke="currentColor"
        stroke-width="3.125"
        stroke-linecap="round"
        xmlns="http://www.w3.org/2000/svg"
      />
      <path
        d="M25.0001 14.5833C26.1507 14.5833 27.0834 15.5161 27.0834 16.6667C27.0834 17.8173 26.1507 18.75 25.0001 18.75C23.8495 18.75 22.9167 17.8173 22.9167 16.6667C22.9167 15.5161 23.8495 14.5833 25.0001 14.5833Z"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      />
    </svg>
  );
}

export default InfoIcon;
