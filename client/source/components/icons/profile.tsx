import type { IconProps } from './props';

export function ProfileIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 25 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M12.5001 12.2732C15.3703 12.2732 17.697 9.94646 17.697 7.07628C17.697 4.20611 15.3703 1.87937 12.5001 1.87937C9.62994 1.87937 7.3032 4.20611 7.3032 7.07628C7.3032 9.94646 9.62994 12.2732 12.5001 12.2732Z"
        stroke="currentColor"
        stroke-width="2.24125"
        data-head
      />
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M19.8073 18.4195C20.8282 19.5291 21.6204 20.8504 22.1448 22.2951C22.4296 23.08 22.2366 23.7996 21.7251 24.3696C21.1921 24.9635 20.3112 25.38 19.3199 25.38L5.67986 25.38C4.68854 25.38 3.80763 24.9635 3.27461 24.3696C2.76308 23.7996 2.57008 23.08 2.85493 22.2951C3.37927 20.8504 4.17148 19.5291 5.19237 18.4195C7.14759 16.2942 9.77847 15.12 12.4999 15.12C15.2212 15.12 17.8521 16.2942 19.8073 18.4195Z"
        stroke="currentColor"
        stroke-width="2.24"
        data-body
      />
    </svg>
  );
}

export default ProfileIcon;
