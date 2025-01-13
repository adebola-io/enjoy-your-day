import { Loader } from '#/components/loader';

export default function Settings() {
  const spin = function (this: HTMLElement) {
    this.animate(
      [
        {
          transform: 'rotate3d(0, 1, 0, -78deg) translate(80%, 50%)',
        },
        {
          transform: 'rotate3d(0, 1, 0, 0deg)',
        },
      ],
      { duration: 900, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' }
    );
  };
  return (
    <div
      style={{
        height: '100%',
        display: 'grid',
        placeItems: 'center',
        placeContent: 'center',
      }}
    >
      <Loader style={{ width: '50px' }} />
      <br />
      Under Construction.
    </div>
  );
}
