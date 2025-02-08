import type { IconProps } from './props';

export function SimpleCheckIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.5 25L21.3388 33.8387L39.0146 16.1611"
        stroke="currentColor"
        stroke-width="4.16667"
        stroke-linecap="round"
        stroke-linejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      />
    </svg>
  );
}

export default SimpleCheckIcon;
