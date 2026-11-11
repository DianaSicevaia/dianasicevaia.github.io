import { DOCUMENT } from '@angular/common';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DEFAULT_LANGUAGE, Language, LANGUAGES, TRANSLATIONS } from './translations';

const STORAGE_KEY = 'language';

function readStoredLanguage(): Language {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return LANGUAGES.find(({ code }) => code === stored)?.code ?? DEFAULT_LANGUAGE;
  } catch {
    return DEFAULT_LANGUAGE;
  }
}

@Injectable({ providedIn: 'root' })
export class I18n {
  readonly language = signal(readStoredLanguage());
  readonly t = computed(() => TRANSLATIONS[this.language()]);

  constructor() {
    const document = inject(DOCUMENT);
    const title = inject(Title);
    const meta = inject(Meta);

    effect(() => {
      const { meta: content } = this.t();
      document.documentElement.lang = this.language();
      title.setTitle(content.title);
      meta.updateTag({ name: 'description', content: content.description });
    });
  }

  setLanguage(language: Language) {
    this.language.set(language);
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // The choice just won't be remembered between visits.
    }
  }
}
