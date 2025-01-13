import { Cuboid } from '#/components/cuboid';
import { Cell } from '@adbl/cells';
import classes from './settings.module.css';

export default function Settings() {
  const text = Cell.source('Click Me!!');
  return (
    <div
      style={{
        height: '100%',
        display: 'grid',
        placeItems: 'center',
        placeContent: 'center',
      }}
    >
      <Cuboid
        length="200px"
        height="230px"
        breadth="200px"
        fill="var(--space-cadet-50)"
        strokeColor="black"
        strokeWidth="2px"
        strokeStyle="solid"
        class={classes.cuboid}
        onClick={function () {
          if (this.classList.contains(classes.spinning)) {
            this.addEventListener(
              'animationiteration',
              () => {
                this.classList.remove(classes.spinning);
                text.value = 'Click Me!!';
              },
              { once: true }
            );
          } else {
            this.classList.add(classes.spinning);
            text.value = 'weeee!';
          }
        }}
      >
        <div
          slot="front"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          {text}
        </div>
        <div
          slot="left"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          ahhhhh
        </div>
        <div
          slot="right"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          yeeeee
        </div>
        <div
          slot="top"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          lmaoo
        </div>
        <div
          slot="bottom"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          omg
        </div>
        <div
          slot="back"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          wut
        </div>
      </Cuboid>
      <br />
    </div>
  );
}
