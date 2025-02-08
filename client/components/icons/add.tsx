import type { IconProps } from './props';

export function AddIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.5 25H25M25 25H37.5M25 25V37.5M25 25V12.5"
        stroke="currentColor"
        stroke-width="4.16667"
        stroke-linecap="round"
        stroke-linejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      />
    </svg>
  );
}

export default AddIcon;
