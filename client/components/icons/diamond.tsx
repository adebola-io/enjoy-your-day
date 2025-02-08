import type { IconProps } from './props';

export function DiamondIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M9.375 4.6875L1.5625 15.625M9.375 4.6875H40.625M9.375 4.6875L17.1875 15.625M1.5625 15.625L25 48.4375M1.5625 15.625H48.4375M40.625 4.6875L48.4375 15.625M40.625 4.6875L32.8125 15.625M17.1875 15.625L25 48.4375M17.1875 15.625L25 4.6875L32.8125 15.625M25 48.4375L48.4375 15.625M25 48.4375L32.8125 15.625"
        stroke="currentColor"
        stroke-width="3.125"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default DiamondIcon;
