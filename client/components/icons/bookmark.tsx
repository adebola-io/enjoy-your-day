import type { IconProps } from './props';

export function BookmarkIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.4167 12.9167C10.4167 10.5831 10.4167 9.41633 10.8709 8.52504C11.2704 7.74102 11.9078 7.1036 12.6918 6.70415C13.5831 6.25 14.7499 6.25 17.0834 6.25H32.9167C35.2503 6.25 36.4172 6.25 37.3084 6.70415C38.0924 7.1036 38.7299 7.74102 39.1292 8.52504C39.5834 9.41633 39.5834 10.5831 39.5834 12.9167V43.75L25.0001 33.3333L10.4167 43.75V12.9167Z"
        stroke="currentColor"
        stroke-width="4.16667"
        stroke-linejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      />
    </svg>
  );
}

export default BookmarkIcon;
