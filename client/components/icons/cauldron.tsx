import type { IconProps } from './props';

export function CauldronIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M2.25 16.8333H39.75M14.75 2.25L14.7647 2.26473M35.5833 16.8333V23.0833C35.5833 31.1375 29.0542 37.6667 21 37.6667C12.9459 37.6667 6.41667 31.1375 6.41667 23.0833V16.8333M8.5 30.5992V39.75M33.5 30.5992V39.75M27.25 8.5C27.25 9.65058 26.3173 10.5833 25.1667 10.5833C24.016 10.5833 23.0833 9.65058 23.0833 8.5C23.0833 7.34942 24.016 6.41667 25.1667 6.41667C26.3173 6.41667 27.25 7.34942 27.25 8.5Z"
        stroke="currentColor"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default CauldronIcon;
