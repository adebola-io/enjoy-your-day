import type { IconProps } from './props';

export function CubeIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M41.6667 8.33337H17.5926L8.33337 16.6667M41.6667 8.33337V32.4075L33.3334 41.6667M41.6667 8.33337L33.3334 16.6667M8.33337 16.6667H33.3334M8.33337 16.6667V41.6667H33.3334M33.3334 41.6667V16.6667"
        stroke="currentColor"
        stroke-width="4.16667"
        stroke-linecap="round"
        stroke-linejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      />
    </svg>
  );
}

export default CubeIcon;
