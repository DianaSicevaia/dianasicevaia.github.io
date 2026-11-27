import { Component, input } from '@angular/core';

@Component({
  selector: 'app-marquee',
  templateUrl: './marquee.html',
  styleUrl: './marquee.scss',
})
export class Marquee {
  readonly items = input.required<readonly string[]>();
  readonly label = input.required<string>();
}
