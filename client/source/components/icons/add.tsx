import type { IconProps } from './props';

export function AddIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>{props.title}</title>
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M1.5 10.5H18.5M10 2V19"
        stroke="#383853"
        stroke-width="2.83333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default AddIcon;
