import type { IconProps } from '../icons/props';

interface LogoProps extends IconProps {
  thick?: boolean;
}

export function Logo(props: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      inert
      viewBox="0 0 186 186"
      fill="none"
      {...props}
    >
      <title xmlns="http://www.w3.org/2000/svg">enjoy-your-day</title>
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M118.549 106.509C119.837 103.606 117.794 100.516 114.686 99.8616C111.578 99.2079 76.2657 103.195 74.5542 105.871C71.7739 107.407 70.7254 110.959 72.8068 113.358C75.181 116.095 78.0873 118.348 81.37 119.97C86.3823 122.445 92.0313 123.328 97.5598 122.5C103.088 121.673 108.231 119.174 112.299 115.339C114.962 112.827 117.081 109.821 118.549 106.509Z"
        fill="currentColor"
      />
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M110.322 69.6249L111.275 76.4077M69.6249 75.3445L70.5782 82.1273M67.4984 158.645L135.327 149.112C150.311 147.007 160.751 133.152 158.645 118.168L149.112 50.3396C147.007 35.3554 133.152 24.9155 118.168 27.0213L50.3396 36.554C35.3554 38.6599 24.9154 52.5142 27.0213 67.4984L36.554 135.327C38.6599 150.311 52.5142 160.751 67.4984 158.645Z"
        stroke="currentColor"
        strokeWidth={props.thick ? 14 : 10}
        stroke-linecap="round"
      />
    </svg>
  );
}
