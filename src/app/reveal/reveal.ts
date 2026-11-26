import { afterNextRender, DestroyRef, Directive, ElementRef, inject, input } from '@angular/core';

/**
 * Fades the host in the first time it scrolls into view.
 * The hidden state is applied from JS, so content stays visible if scripts or IntersectionObserver are unavailable.
 */
@Directive({
  selector: '[appReveal]',
  host: {
    '[style.--reveal-delay.ms]': 'revealDelay()',
  },
})
export class Reveal {
  /** Extra delay in ms, used to stagger items in a list. */
  readonly revealDelay = input(0);

  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (
        typeof IntersectionObserver === 'undefined' ||
        matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        return;
      }

      // Anything already on screen at load just shows up; only content below the fold animates.
      if (element.getBoundingClientRect().top < innerHeight) {
        return;
      }

      element.classList.add('reveal');

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            element.classList.add('reveal--visible');
            observer.disconnect();
          }
        },
        { rootMargin: '0px 0px -10% 0px' },
      );
      observer.observe(element);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
