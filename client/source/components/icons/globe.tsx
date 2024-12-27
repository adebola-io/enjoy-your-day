import type { IconProps } from './props';

export function GlobeIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 55 55"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M27.5 52.5C41.3071 52.5 52.5 41.3071 52.5 27.5C52.5 13.6929 41.3071 2.5 27.5 2.5M27.5 52.5C13.6929 52.5 2.5 41.3071 2.5 27.5C2.5 13.6929 13.6929 2.5 27.5 2.5M27.5 52.5C34.3182 52.5 36.5909 41.1364 36.5909 27.5C36.5909 13.8636 34.3182 2.5 27.5 2.5M27.5 52.5C20.6818 52.5 18.4091 41.1364 18.4091 27.5C18.4091 13.8636 20.6818 2.5 27.5 2.5M4.77273 36.5909H50.2273M4.77273 18.4091H50.2273"
        stroke="currentColor"
        stroke-width="4"
      />
    </svg>
  );
}
