import type { IconProps } from './props';

export function RewindIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M26.7848 23.944L42.509 14.8656C43.8979 14.0637 45.634 15.0661 45.634 16.6698V35.5712C45.634 37.175 43.8979 38.1773 42.509 37.3754L26.7848 28.2971V35.5712C26.7848 37.175 25.0485 38.1773 23.6598 37.3754L7.29068 27.9248C5.9018 27.1229 5.9018 25.1181 7.29068 24.3162L23.6598 14.8656C25.0485 14.0637 26.7848 15.0661 26.7848 16.6698V23.944Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default RewindIcon;
