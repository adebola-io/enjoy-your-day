import type { IconProps } from './props';

export function SearchIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title xmlns="http://www.w3.org/2000/svg">Search</title>
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M12.75 13.2501L16.5 17.0001M14.625 8.5625C14.625 12.1869 11.6869 15.125 8.0625 15.125C4.43813 15.125 1.5 12.1869 1.5 8.5625C1.5 4.93813 4.43813 2 8.0625 2C11.6869 2 14.625 4.93813 14.625 8.5625Z"
        stroke="#1B1B3A"
        stroke-width="3"
        stroke-linecap="round"
      />
    </svg>
  );
}

export default SearchIcon;
