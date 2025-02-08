import type { IconProps } from './props';

export function TreeIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 46 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M23 27.1667L28.2083 21.9583M23 24.0417L16.75 17.7917M23 43.8333V16.75M11.5883 12.5833C12.1146 6.74323 17.0229 2.16666 23 2.16666C28.977 2.16666 33.8853 6.74323 34.4116 12.5833H34.4583C39.636 12.5833 43.8333 16.7806 43.8333 21.9583C43.8333 27.136 39.636 31.3333 34.4583 31.3333H11.5416C6.36396 31.3333 2.16663 27.136 2.16663 21.9583C2.16663 16.7806 6.36396 12.5833 11.5416 12.5833H11.5883Z"
        stroke="currentColor"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default TreeIcon;
