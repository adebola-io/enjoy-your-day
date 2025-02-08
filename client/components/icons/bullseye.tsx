import type { IconProps } from './props';

export function BullseyeIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M43.75 25C43.75 35.3554 35.3554 43.75 25 43.75C14.6447 43.75 6.25 35.3554 6.25 25C6.25 14.6447 14.6447 6.25 25 6.25M35.4167 25C35.4167 30.7529 30.7529 35.4167 25 35.4167C19.247 35.4167 14.5833 30.7529 14.5833 25C14.5833 19.247 19.247 14.5833 25 14.5833M30.7456 19.4825L38.9935 20.3488L43.4644 14.0894L38.0992 12.301L36.3108 6.93585L30.0515 11.4068L30.7456 19.4825ZM30.7456 19.4825L25 24.9998"
        stroke="currentColor"
        stroke-width="4.16667"
        stroke-linecap="round"
        stroke-linejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      />
    </svg>
  );
}

export default BullseyeIcon;
