import type { IconProps } from './props';

export function NotificationIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 50 53"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M45.8333 22.9167V26.0417C45.8333 35.8625 45.8333 40.7732 42.7823 43.824C39.7314 46.875 34.8208 46.875 25 46.875C15.179 46.875 10.2686 46.875 7.21761 43.824C4.16663 40.7732 4.16663 35.8625 4.16663 26.0417C4.16663 16.2208 4.16663 11.3103 7.21761 8.25935C10.2686 5.20837 15.179 5.20837 25 5.20837H28.125"
        stroke="currentColor"
        stroke-width="3.125"
        stroke-linecap="round"
        xmlns="http://www.w3.org/2000/svg"
      />
      <path
        d="M39.5834 17.7084C43.0352 17.7084 45.8334 14.9101 45.8334 11.4584C45.8334 8.0066 43.0352 5.20837 39.5834 5.20837C36.1315 5.20837 33.3334 8.0066 33.3334 11.4584C33.3334 14.9101 36.1315 17.7084 39.5834 17.7084Z"
        stroke="currentColor"
        stroke-width="3.125"
        xmlns="http://www.w3.org/2000/svg"
      />
    </svg>
  );
}

export default NotificationIcon;
