import { afterNextRender, Component, DestroyRef, ElementRef, inject, viewChild } from '@angular/core';
import { I18n } from '../i18n/i18n';
import { LANGUAGES, TRANSLATIONS } from '../i18n/translations';
import { LanguageSwitcher } from '../language-switcher/language-switcher';
import { startCritters } from './critters';

@Component({
  selector: 'app-hero',
  imports: [LanguageSwitcher],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class Hero {
  protected readonly i18n = inject(I18n);
  protected readonly copies = LANGUAGES.map(({ code }) => TRANSLATIONS[code].hero);
  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('critters');
  private readonly top = viewChild.required<ElementRef<HTMLElement>>('top');
  private readonly intro = viewChild.required<ElementRef<HTMLElement>>('intro');

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() =>
      destroyRef.onDestroy(
        startCritters(
          this.canvas().nativeElement,
          this.top().nativeElement,
          this.intro().nativeElement,
        ),
      ),
    );
  }
}
