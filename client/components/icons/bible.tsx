import type { IconProps } from './props';

export function BibleIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 50 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.5 45.9999H43.75V41.8333H12.525C11.5625 41.8083 10.4167 41.427 10.4167 39.7499C10.4167 38.0728 11.5625 37.6916 12.525 37.6666H43.75V8.49992C43.75 6.202 41.8812 4.33325 39.5833 4.33325H12.5C9.9875 4.33325 6.25 5.99784 6.25 10.5833V39.7499C6.25 44.3353 9.9875 45.9999 12.5 45.9999ZM10.4167 16.8333V10.5833C10.4167 8.90617 11.5625 8.52492 12.5 8.49992H39.5833V33.4999H10.4167V16.8333Z"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      />
      <path
        d="M22.9167 29.3333H27.0833V21H31.25V16.8333H27.0833V12.6666H22.9167V16.8333H18.75V21H22.9167V29.3333Z"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      />
    </svg>
  );
}

export default BibleIcon;
