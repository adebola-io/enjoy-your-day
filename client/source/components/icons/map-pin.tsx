import type { IconProps } from './props';

export function MapPinIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M7.875 27.25C4.40369 28.5735 2.25 30.4177 2.25 32.4577C2.25 36.4852 10.6447 39.75 21 39.75C31.3554 39.75 39.75 36.4852 39.75 32.4577C39.75 30.4177 37.5962 28.5735 34.125 27.25M21 14.75H21.0208M33.5 14.75C33.5 23.216 24.125 27.25 21 33.5C17.875 27.25 8.5 23.216 8.5 14.75C8.5 7.84644 14.0964 2.25 21 2.25C27.9035 2.25 33.5 7.84644 33.5 14.75ZM23.0833 14.75C23.0833 15.9006 22.1506 16.8333 21 16.8333C19.8494 16.8333 18.9167 15.9006 18.9167 14.75C18.9167 13.5994 19.8494 12.6667 21 12.6667C22.1506 12.6667 23.0833 13.5994 23.0833 14.75Z"
        stroke="currentColor"
        stroke-width="3.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default MapPinIcon;
