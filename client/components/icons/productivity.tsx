import type { IconProps } from './props';

export function ProductivityIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 63 63"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M41.8333 32.4233H31.5V22.0899M8.24997 14.3399L13.4166 9.17325M54.75 14.3399L49.5833 9.17325M52.1667 32.4233C52.1667 43.8372 42.9139 53.0899 31.5 53.0899C20.0861 53.0899 10.8333 43.8372 10.8333 32.4233C10.8333 21.0094 20.0861 11.7566 31.5 11.7566C42.9139 11.7566 52.1667 21.0094 52.1667 32.4233Z"
        stroke="currentColor"
        stroke-width="4.88"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default ProductivityIcon;
