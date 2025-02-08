import type { IconProps } from './props';

export function PhotoIcon(props: IconProps) {
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
        d="M16.6667 22.9167C18.9679 22.9167 20.8333 21.0512 20.8333 18.75C20.8333 16.4488 18.9679 14.5833 16.6667 14.5833C14.3655 14.5833 12.5 16.4488 12.5 18.75C12.5 21.0512 14.3655 22.9167 16.6667 22.9167Z"
        stroke="currentColor"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      />
      <path
        d="M13.6677 43.75C25.2718 18.5416 34.9176 14.125 45.8343 30.4792"
        stroke="currentColor"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      />
      <path
        d="M37.5001 6.25H12.5001C7.89771 6.25 4.16675 9.98096 4.16675 14.5833V35.4167C4.16675 40.019 7.89771 43.75 12.5001 43.75H37.5001C42.1024 43.75 45.8334 40.019 45.8334 35.4167V14.5833C45.8334 9.98096 42.1024 6.25 37.5001 6.25Z"
        stroke="currentColor"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      />
    </svg>
  );
}

export default PhotoIcon;
