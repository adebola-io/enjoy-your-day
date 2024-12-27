import type { IconProps } from './props';

export function MusicIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 55 55"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M19.1667 46.9444C19.1667 50.0128 15.4357 52.5 10.8333 52.5C6.23097 52.5 2.5 50.0128 2.5 46.9444C2.5 43.8761 6.23097 41.3889 10.8333 41.3889C15.4357 41.3889 19.1667 43.8761 19.1667 46.9444ZM19.1667 46.9444V8.05556L52.5 2.5V41.3889M52.5 41.3889C52.5 44.4572 48.7692 46.9444 44.1667 46.9444C39.5642 46.9444 35.8333 44.4572 35.8333 41.3889C35.8333 38.3206 39.5642 35.8333 44.1667 35.8333C48.7692 35.8333 52.5 38.3206 52.5 41.3889ZM19.1667 19.1667L52.5 13.6111"
        stroke="currentColor"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default MusicIcon;
