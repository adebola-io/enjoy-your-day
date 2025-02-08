import type { IconProps } from './props';

export function AnchorIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M25.0001 14.5833C27.3013 14.5833 29.1667 12.7179 29.1667 10.4167C29.1667 8.11548 27.3013 6.25 25.0001 6.25C22.6988 6.25 20.8334 8.11548 20.8334 10.4167C20.8334 12.7179 22.6988 14.5833 25.0001 14.5833ZM25.0001 14.5833V20.8333M25.0001 20.8333V43.75M25.0001 20.8333H31.2501M25.0001 20.8333H18.7501M25.0001 43.75C34.6513 43.75 42.5992 36.4583 43.6357 27.0833L38.5417 29.1667M25.0001 43.75C15.3489 43.75 7.40086 36.4583 6.3645 27.0833L11.4584 29.1667"
        stroke="currentColor"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default AnchorIcon;
