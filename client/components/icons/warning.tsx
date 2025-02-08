import type { IconProps } from './props';

export function WarningIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 50 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M25 31.4166H25.0209M25 25.1666V18.9166M10.3794 39.7499H39.6207C42.8365 39.7499 44.8402 36.2616 43.2198 33.4839L28.5992 8.4198C26.9913 5.66353 23.0088 5.66353 21.4009 8.4198L6.78029 33.4839C5.15994 36.2616 7.16356 39.7499 10.3794 39.7499Z"
        stroke="currentColor"
        stroke-width="4.16667"
        stroke-linecap="round"
        stroke-linejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      />
    </svg>
  );
}

export default WarningIcon;
