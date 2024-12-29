import type { IconProps } from './props';

export function DogIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M27.6022 4.16673L34.2387 4.16669C35.2995 4.16669 36.3375 4.46117 37.24 5.01656L43.0064 8.56512C43.4685 8.8495 43.75 9.35325 43.75 9.89585V13.0209C43.75 15.6097 41.6512 17.7084 39.0625 17.7084H38.5416V36.5561C40.6187 36.8348 42.0718 37.7115 42.9054 39.2134C43.3706 40.0515 43.5679 40.9636 43.6602 41.8023C43.7502 42.6169 43.75 43.4673 43.75 44.2181V44.2709C43.75 45.1338 43.0504 45.8334 42.1875 45.8334H33.8558H12.1527C7.74213 45.8334 4.16663 42.2579 4.16663 37.8473C4.16663 34.9346 5.72686 32.3879 8.04965 30.9946C8.78969 30.5509 9.74944 30.7909 10.1933 31.5309C10.6372 32.2709 10.3971 33.2306 9.65706 33.6746C8.2366 34.5265 7.29163 36.0773 7.29163 37.8473C7.29163 40.5319 9.46802 42.7084 12.1527 42.7084C12.8164 42.7084 13.2291 42.535 13.5033 42.3421C13.7933 42.1379 14.02 41.8456 14.1947 41.4934C14.3708 41.1384 14.4724 40.7648 14.5281 40.4673C14.5553 40.3221 14.5699 40.2044 14.5775 40.1286C14.5807 40.0959 14.5826 40.0715 14.5836 40.0569L14.5845 39.9844C14.5857 39.9138 14.588 39.8134 14.5924 39.6861C14.6012 39.4319 14.6186 39.0698 14.653 38.6244C14.7218 37.7359 14.859 36.5048 15.1346 35.1306C15.6744 32.439 16.7927 28.9469 19.2002 26.5067C20.9668 24.7163 21.927 22.0927 22.4237 19.4984C22.9148 16.9337 22.9166 14.6 22.9166 13.5417V8.85423C22.9166 6.2666 25.0122 4.16675 27.6022 4.16673ZM16.1458 40.1042C17.7074 40.1563 17.7074 40.1577 17.7074 40.1577L17.7072 40.1627L17.7069 40.1706L17.706 40.1915L17.7026 40.2511C17.6995 40.2986 17.6947 40.3615 17.6871 40.4377C17.672 40.5898 17.6456 40.7977 17.5996 41.0431C17.5165 41.4863 17.3637 42.0836 17.0771 42.7084H32.1818C31.9918 41.68 31.4745 40.6123 30.0698 39.9581C30.0466 39.9475 30.0239 39.9363 30.0016 39.9244C29.8929 39.8673 29.582 39.7648 29.0658 39.6831C28.5866 39.6075 28.057 39.569 27.6041 39.569C27.4925 39.569 27.2464 39.5723 27.015 39.5761L26.72 39.5809L26.5968 39.5831H26.5948C25.7318 39.599 25.0197 38.9123 25.0039 38.0494C24.9881 37.1867 25.6747 36.4744 26.5375 36.4586L26.6656 36.4563L26.9656 36.4513C27.1897 36.4477 27.4629 36.444 27.6041 36.444C28.0929 36.444 28.636 36.4763 29.1666 36.5421V31.7767C29.1666 30.9138 29.8662 30.2142 30.7291 30.2142C31.592 30.2142 32.2916 30.9138 32.2916 31.7767V37.6194C34.51 39.0388 35.1539 41.1665 35.3406 42.7084H40.5989C40.5885 42.5146 40.5741 42.3271 40.5541 42.1446C40.485 41.5179 40.3581 41.0631 40.1731 40.73C39.902 40.2415 39.2704 39.5834 36.9791 39.5834C36.1162 39.5834 35.4166 38.8838 35.4166 38.0209V16.1459C35.4166 15.2829 36.1162 14.5834 36.9791 14.5834H39.0625C39.9254 14.5834 40.625 13.8838 40.625 13.0209V10.769L35.602 7.678C35.1912 7.42512 34.7202 7.29169 34.2387 7.29169L27.6022 7.29173C26.7406 7.29173 26.0416 7.99008 26.0416 8.85423V13.5036C26.0683 13.9802 26.2333 14.3898 26.4689 14.6577C26.6795 14.8968 27.012 15.1042 27.6041 15.1042C28.2016 15.1042 28.5473 14.8931 28.7618 14.6479C29.0012 14.3743 29.1666 13.9497 29.1666 13.4375C29.1666 12.5746 29.8662 11.875 30.7291 11.875C31.592 11.875 32.2916 12.5746 32.2916 13.4375C32.2916 14.5919 31.9223 15.782 31.1131 16.7062C30.2791 17.6591 29.0622 18.2292 27.6041 18.2292C26.9541 18.2292 26.3568 18.116 25.8218 17.9084C25.7433 18.5999 25.637 19.3331 25.4929 20.0861C24.9479 22.9321 23.8248 26.2692 21.4248 28.7017C19.6656 30.4846 18.7005 33.2423 18.1986 35.745C17.9534 36.9679 17.8303 38.07 17.7688 38.8654C17.7381 39.2621 17.7229 39.5796 17.7155 39.7944C17.7118 39.9019 17.71 39.9834 17.7091 40.0361L17.7084 40.0929L17.7083 40.1042C17.7083 40.1213 17.7079 40.1406 17.7074 40.1577L16.1458 40.1042Z"
        fill="#212121"
        xmlns="http://www.w3.org/2000/svg"
      />
    </svg>
  );
}

export default DogIcon;
