import { DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { I18n } from '../i18n/i18n';
import { Reveal } from '../reveal/reveal';

@Component({
  selector: 'app-services',
  imports: [DecimalPipe, Reveal],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services {
  protected readonly i18n = inject(I18n);
}
