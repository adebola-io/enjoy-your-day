import type { IconProps } from './props';

export function BeakerIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 51 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.6111 0.500005C10.077 0.500005 8.83332 1.74366 8.83332 3.27778C8.83332 4.81191 10.077 6.05556 11.6111 6.05556H14.3889V21.8811L1.06782 41.8628L1.06778 41.8628C-1.39344 45.5549 1.25309 50.5 5.69032 50.5H45.3097C49.7468 50.5 52.3936 45.5549 49.9321 41.8628L49.932 41.8627L36.611 21.8811L36.6107 21.8808L36.6111 21.8811V6.05556H39.3889C40.923 6.05556 42.1667 4.81191 42.1667 3.27778C42.1667 1.74366 40.923 0.500005 39.3889 0.500005H11.6111ZM31.0555 6.05556H19.9444V21.8811C19.9444 22.9774 19.62 24.05 19.0114 24.9628L19.8249 6.05556H19.8249L19.0111 24.9632L5.69037 44.9444L5.69033 44.9444L45.3096 44.9444L31.9887 24.9631L31.9885 24.9628C31.3796 24.0497 31.0555 22.977 31.0555 21.8811V6.05556ZM39.1111 39.9445L33.2778 32.1667C32.753 31.4672 31.93 31.0556 31.0555 31.0556H19.9444C19.0701 31.0556 18.2468 31.4672 17.7222 32.1667L11.8889 39.9445C11.2022 40.86 11.8555 42.1667 13 42.1667H38C39.1444 42.1667 39.7978 40.86 39.1111 39.9445Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default BeakerIcon;
