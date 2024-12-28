import type { IconProps } from './props';

export function PaletteIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M10 0C15.522 0 20 3.978 20 8.889C19.9992 10.3622 19.4136 11.7748 18.3717 12.8165C17.3299 13.8581 15.9172 14.4435 14.444 14.444H12.478C11.556 14.444 10.811 15.189 10.811 16.111C10.811 16.533 10.978 16.922 11.233 17.211C11.5 17.511 11.667 17.9 11.667 18.333C11.667 19.256 10.9 20 10 20C4.478 20 0 15.522 0 10C0 4.478 4.478 0 10 0ZM8.811 16.111C8.81061 15.6293 8.90519 15.1523 9.08933 14.7072C9.27347 14.2622 9.54357 13.8578 9.88416 13.5172C10.2248 13.1766 10.6292 12.9065 11.0742 12.7223C11.5193 12.5382 11.9963 12.4436 12.478 12.444H14.444C15.3866 12.4435 16.2905 12.0689 16.9572 11.4026C17.6239 10.7363 17.9989 9.8326 18 8.89C18 5.139 14.468 2 10 2C7.93558 1.99812 5.95034 2.79436 4.45938 4.22225C2.96841 5.65014 2.08715 7.59913 1.99986 9.66171C1.91256 11.7243 2.62599 13.7408 3.99097 15.2895C5.35595 16.8383 7.2668 17.7994 9.324 17.972C8.98917 17.4093 8.81197 16.7658 8.811 16.111ZM5.5 10C5.10218 10 4.72064 9.84196 4.43934 9.56066C4.15804 9.27936 4 8.89782 4 8.5C4 8.10218 4.15804 7.72064 4.43934 7.43934C4.72064 7.15804 5.10218 7 5.5 7C5.89782 7 6.27936 7.15804 6.56066 7.43934C6.84196 7.72064 7 8.10218 7 8.5C7 8.89782 6.84196 9.27936 6.56066 9.56066C6.27936 9.84196 5.89782 10 5.5 10ZM14.5 10C14.1022 10 13.7206 9.84196 13.4393 9.56066C13.158 9.27936 13 8.89782 13 8.5C13 8.10218 13.158 7.72064 13.4393 7.43934C13.7206 7.15804 14.1022 7 14.5 7C14.8978 7 15.2794 7.15804 15.5607 7.43934C15.842 7.72064 16 8.10218 16 8.5C16 8.89782 15.842 9.27936 15.5607 9.56066C15.2794 9.84196 14.8978 10 14.5 10ZM10 7C9.60218 7 9.22064 6.84196 8.93934 6.56066C8.65804 6.27936 8.5 5.89782 8.5 5.5C8.5 5.10218 8.65804 4.72064 8.93934 4.43934C9.22064 4.15804 9.60218 4 10 4C10.3978 4 10.7794 4.15804 11.0607 4.43934C11.342 4.72064 11.5 5.10218 11.5 5.5C11.5 5.89782 11.342 6.27936 11.0607 6.56066C10.7794 6.84196 10.3978 7 10 7Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default PaletteIcon;
