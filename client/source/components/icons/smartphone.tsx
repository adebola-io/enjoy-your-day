import type { IconProps } from './props';

export function SmartphoneIcon(props: IconProps) {
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
        d="M35.9375 7.8125H14.0625V6.25C14.0625 4.525 15.4625 3.125 17.1875 3.125H32.8125C34.5375 3.125 35.9375 4.525 35.9375 6.25V7.8125ZM14.0625 10.9375H35.9375V31.25H14.0625V10.9375ZM35.9375 43.75C35.9375 45.475 34.5375 46.875 32.8125 46.875H17.1875C15.4625 46.875 14.0625 45.475 14.0625 43.75V34.375H35.9375V43.75ZM32.8125 0H17.1875C13.7359 0 10.9375 2.79844 10.9375 6.25V43.75C10.9375 47.2016 13.7359 50 17.1875 50H32.8125C36.2641 50 39.0625 47.2016 39.0625 43.75V6.25C39.0625 2.79844 36.2641 0 32.8125 0ZM25 43.75C26.725 43.75 28.125 42.35 28.125 40.625C28.125 38.9 26.725 37.5 25 37.5C23.275 37.5 21.875 38.9 21.875 40.625C21.875 42.35 23.275 43.75 25 43.75Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default SmartphoneIcon;
