import { Component, inject } from '@angular/core';
import { I18n } from '../i18n/i18n';
import { Marquee } from '../marquee/marquee';
import { Reveal } from '../reveal/reveal';
import { ServiceCards } from '../service-cards/service-cards';

@Component({
  selector: 'app-templates',
  imports: [Marquee, Reveal, ServiceCards],
  templateUrl: './templates.html',
  styleUrl: './templates.scss',
})
export class Templates {
  protected readonly i18n = inject(I18n);
}
