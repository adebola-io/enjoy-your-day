import type { IconProps } from './props';

export function ChatBubbleIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M25.0001 45.8333C36.5059 45.8333 45.8334 36.5058 45.8334 25C45.8334 13.4941 36.5059 4.16667 25.0001 4.16667C13.4941 4.16667 4.16675 13.4941 4.16675 25C4.16675 28.3327 4.94929 31.4825 6.34062 34.276C6.71037 35.0183 6.83344 35.8669 6.61908 36.6679L5.37823 41.3056C4.83956 43.3188 6.68135 45.1604 8.69456 44.6219L13.3321 43.381C14.1333 43.1667 14.9818 43.2898 15.7241 43.6594C18.5175 45.0508 21.6674 45.8333 25.0001 45.8333Z"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M16.6667 25H16.6855M24.9813 25H25.0001M33.3147 25H33.3334"
        stroke="currentColor"
        stroke-width="4.16667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default ChatBubbleIcon;
