import { Component, inject } from '@angular/core';
import { I18n } from '../i18n/i18n';
import { LANGUAGES } from '../i18n/translations';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.scss',
})
export class LanguageSwitcher {
  protected readonly i18n = inject(I18n);
  protected readonly languages = LANGUAGES;
}
