import type { IconProps } from './props';

export function PaperIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M27.0833 6.25H14.5833C12.2821 6.25 10.4166 8.11548 10.4166 10.4167V39.5833C10.4166 41.8846 12.2821 43.75 14.5833 43.75H35.4166C37.7179 43.75 39.5833 41.8846 39.5833 39.5833V18.75M27.0833 6.25L39.5833 18.75M27.0833 6.25V16.6667C27.0833 17.8172 28.016 18.75 29.1666 18.75H39.5833M18.75 27.0833H31.25M18.75 35.4167H31.25"
        stroke="currentColor"
        stroke-width="4.16667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default PaperIcon;
