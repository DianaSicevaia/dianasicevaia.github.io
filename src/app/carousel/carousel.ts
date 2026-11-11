import { Component, computed, ElementRef, inject, input, signal, viewChild } from '@angular/core';
import { I18n } from '../i18n/i18n';

export interface CarouselImage {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.html',
  styleUrl: './carousel.scss',
})
export class Carousel {
  readonly images = input.required<readonly CarouselImage[]>();
  readonly label = input.required<string>();

  protected readonly i18n = inject(I18n);
  protected readonly current = signal(0);
  protected readonly enlargedIndex = signal<number | null>(null);
  protected readonly enlarged = computed(() => {
    const index = this.enlargedIndex();
    return index === null ? undefined : this.images()[index];
  });
  private readonly track = viewChild.required<ElementRef<HTMLElement>>('track');
  private readonly lightbox = viewChild.required<ElementRef<HTMLDialogElement>>('lightbox');
  private readonly scroller = viewChild<ElementRef<HTMLElement>>('scroller');

  protected go(step: number) {
    const count = this.images().length;
    const track = this.track().nativeElement;
    const next = (this.current() + step + count) % count;
    track.scrollTo({ left: track.clientWidth * next });
  }

  protected enlarge(index: number) {
    this.enlargedIndex.set(index);
    this.lightbox().nativeElement.showModal();
  }

  protected step(step: number) {
    const count = this.images().length;
    this.enlargedIndex.update((index) => ((index ?? 0) + step + count) % count);
    // Each picture starts from its left edge, where panning on phones begins.
    const scroller = this.scroller()?.nativeElement;
    if (scroller) {
      scroller.scrollLeft = 0;
      scroller.scrollTop = 0;
    }
  }

  protected onLightboxKeydown(event: KeyboardEvent) {
    const step = { ArrowLeft: -1, ArrowRight: 1 }[event.key];
    if (step && this.images().length > 1) {
      event.preventDefault();
      this.step(step);
    }
  }

  // Taps on the picture and the arrows are left alone; anything else closes the lightbox.
  protected onLightboxClick(event: MouseEvent) {
    const target = event.target as Element;
    if (!(target instanceof HTMLImageElement) && !target.closest('.lightbox__nav')) {
      this.lightbox().nativeElement.close();
    }
  }

  // The carousel stays on the picture that was viewed last.
  protected onLightboxClose() {
    const index = this.enlargedIndex();
    this.enlargedIndex.set(null);
    if (index !== null) {
      const track = this.track().nativeElement;
      track.scrollTo({ left: track.clientWidth * index, behavior: 'instant' });
    }
  }

  protected onScroll() {
    const track = this.track().nativeElement;
    this.current.set(Math.round(track.scrollLeft / track.clientWidth));
  }
}
