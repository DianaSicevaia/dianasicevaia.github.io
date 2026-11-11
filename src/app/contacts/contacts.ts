import { Component, computed, inject } from '@angular/core';
import { I18n } from '../i18n/i18n';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.html',
  styleUrl: './contacts.scss'
})
export class Contacts {
  protected readonly i18n = inject(I18n);

  protected readonly links = computed(() => [
    {
      label: this.i18n.t().contacts.cv,
      text: this.i18n.t().contacts.cvDownload,
      href: 'Diana-Sicevaia-CV.pdf',
      newWindow: true,
    },
    { label: 'Telegram', text: '@ErgoProxyDi', href: 'https://t.me/ErgoProxyDi' },
    {
      label: this.i18n.t().contacts.email,
      text: 'sicevaiadiana@gmail.com',
      href: 'mailto:sicevaiadiana@gmail.com',
    },
    { label: 'GitHub', text: 'DianaSicevaia', href: 'https://github.com/DianaSicevaia' },
  ]);
}
