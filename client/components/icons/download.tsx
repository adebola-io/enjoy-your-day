import type { IconProps } from './props';

export function DownloadIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M25 33.3333L14.5834 22.9166L17.5 19.8958L22.9167 25.3125V8.33331H27.0834V25.3125L32.5 19.8958L35.4167 22.9166L25 33.3333ZM12.5 41.6666C11.3542 41.6666 10.3733 41.2587 9.55733 40.4427C8.74136 39.6267 8.33337 38.6458 8.33337 37.5V31.25H12.5V37.5H37.5V31.25H41.6667V37.5C41.6667 38.6458 41.2587 39.6267 40.4427 40.4427C39.6268 41.2587 38.6459 41.6666 37.5 41.6666H12.5Z"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      />
    </svg>
  );
}

export default DownloadIcon;
