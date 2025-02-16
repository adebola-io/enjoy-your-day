import { appendChild, setAttributeFromProps } from '@adbl/unfinished';
import type { JSX } from '@adbl/unfinished/jsx-runtime';

type DivProps = Omit<JSX.IntrinsicElements['div'], 'children'>;
export interface ElasticAreaProps extends DivProps {
  as?: keyof HTMLElementTagNameMap | `${string}-${string}`;
  scaleFactor?: number;
  children?: unknown;
  xAxis?: boolean;
  yAxis?: boolean;
}

export function ElasticArea(props: ElasticAreaProps): JSX.Template {
  const {
    yAxis,
    xAxis,
    children,
    scaleFactor = 0.08,
    as: tagname = 'div',
    ...rest
  } = props;
  const dragStartPosition = [0, 0];
  let dragging = false;
  let dragged = false;

  const handleTouchStart = (event: TouchEvent) => {
    if (!canStretch(event, xAxis, yAxis)) return;
    dragging = true;
    dragStartPosition[0] = event.touches[0].clientX;
    dragStartPosition[1] = event.touches[0].clientY;
  };

  const handleTouchMove = function (this: HTMLElement, event: TouchEvent) {
    if (!dragging) return;
    const deltaX = xAxis ? event.touches[0].clientX - dragStartPosition[0] : 0;
    const deltaY = yAxis ? event.touches[0].clientY - dragStartPosition[1] : 0;
    if (!canStretch(event, xAxis, yAxis)) return;
    const elementHeight = this.clientHeight;
    const elementWidth = this.clientWidth;

    const stretchX = (Math.abs(deltaX) / elementWidth) * scaleFactor;
    const stretchY = (Math.abs(deltaY) / elementHeight) * scaleFactor;
    const scaleX = 1 + Math.min(stretchX, scaleFactor);
    const scaleY = 1 + Math.min(stretchY, scaleFactor);
    const translateX = (deltaX / elementWidth) * 500 * scaleFactor;
    const translateY = (deltaY / elementHeight) * 500 * scaleFactor;

    const scale = `scale(${scaleX}, ${scaleY})`;
    const translate = `translate(${translateX}px, ${translateY}px)`;

    requestAnimationFrame(() => {
      this.style.transform = `${scale} ${translate}`;
    });
    dragged = Math.abs(deltaX) > 15 || Math.abs(deltaY) > 15;
  };

  const handleTouchEnd = function (this: HTMLDivElement) {
    const removeTransition = () => {
      this.style.removeProperty('transition');
      this.style.removeProperty('transform');
    };
    if (!dragging || !dragged) {
      removeTransition();
      return;
    }
    dragging = false;
    dragged = false;

    requestAnimationFrame(() => {
      this.style.transition = 'transform 0.2s ease-out';
      this.style.transform = 'none';
      this.addEventListener('transitionend', removeTransition, { once: true });
    });
  };

  const element: HTMLElement = document.createElement(tagname);
  for (const [key, value] of Object.entries(rest)) {
    setAttributeFromProps(element, key, value);
  }
  appendChild(element, tagname, children);

  element.addEventListener('touchstart', handleTouchStart, { passive: true });
  element.addEventListener('touchmove', handleTouchMove, { passive: true });
  element.addEventListener('touchend', handleTouchEnd, { passive: true });

  return element;
}

function canStretch(event: TouchEvent, xAxis?: boolean, yAxis?: boolean) {
  for (const element of event.composedPath()) {
    if (!(element instanceof HTMLElement)) continue;
    if (!(xAxis || yAxis)) return false;

    if (yAxis) {
      const isAtUpperEdge = element.scrollTop === 0;
      const isAtBottomEdge =
        element.scrollTop + element.clientHeight >= element.scrollHeight;
      if (!(isAtUpperEdge || isAtBottomEdge)) return false;
    }

    if (xAxis) {
      const isAtLeftEdge = element.scrollLeft === 0;
      const isAtRightEdge =
        element.scrollLeft + element.clientWidth >= element.scrollWidth;
      if (!(isAtLeftEdge || isAtRightEdge)) return false;
    }

    const rect = element.getBoundingClientRect();
    const isAtStartVertical = Math.round(rect.top) >= 0;
    const isAtEndVertical = innerHeight >= Math.round(rect.bottom);
    const isAtStartHorizontal = Math.round(rect.left) >= 0;
    const isAtEndHorizontal = innerWidth >= Math.round(rect.right);
    const shouldStretch =
      (isAtStartHorizontal || isAtEndHorizontal) &&
      (isAtStartVertical || isAtEndVertical);
    if (!shouldStretch) return false;
  }
  return true;
}
