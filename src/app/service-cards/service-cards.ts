import { Component, input, signal } from '@angular/core';

export interface ServiceCard {
  title: string;
  text: string;
}

// Line icons in a 24×24 box, matched to the cards by position.
const ICONS = [
  // Truck
  'M3 6h11v10H3zM14 10h4l3 3v3h-7M7.5 18.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0M18.5 18.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0',
  // Calendar
  'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
  // Bank card
  'M3 6h18v12H3zM3 10h18M7 15h4',
  // Chat bubble
  'M4 5h16v11H9l-5 4z',
];

@Component({
  selector: 'app-service-cards',
  templateUrl: './service-cards.html',
  styleUrl: './service-cards.scss',
})
export class ServiceCards {
  readonly items = input.required<readonly ServiceCard[]>();
  readonly label = input.required<string>();

  protected readonly icons = ICONS;
  /** Card held down on a touch screen; the mouse uses plain :hover instead. */
  protected readonly pressed = signal<number | null>(null);

  protected press(event: PointerEvent, index: number) {
    if (event.pointerType !== 'mouse') {
      this.pressed.set(index);
    }
  }

  protected release() {
    this.pressed.set(null);
  }
}
