import type { IconProps } from './props';

export function TombstoneIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M25 14.5833V35.4167M18.75 20.8333H31.25M39.5833 43.75V20.8333C39.5833 12.7792 33.0542 6.25 25 6.25C16.9459 6.25 10.4167 12.7792 10.4167 20.8333V43.75M6.25 43.75H43.75"
        stroke="currentColor"
        stroke-width="4.16667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default TombstoneIcon;
