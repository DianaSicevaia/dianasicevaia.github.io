import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { LANGUAGES, TRANSLATIONS } from './i18n/translations';

describe('App', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should open in English with the greeting and years of experience', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(document.documentElement.lang).toBe('en');
    expect(compiled.querySelector('h1')?.textContent).toContain('I’m Diana');
    expect(compiled.querySelector('.hero__text')?.textContent).toContain('5');
  });

  it('should switch language and remember the choice', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    compiled.querySelector<HTMLButtonElement>('.switcher__button[lang="uk"]')?.click();
    await fixture.whenStable();
    expect(document.documentElement.lang).toBe('uk');
    expect(compiled.querySelector('h1')?.textContent).toContain('Діана');
    expect(compiled.querySelector('#services-title')?.textContent).toBe(
      TRANSLATIONS.uk.services.title,
    );
    expect(localStorage.getItem('language')).toBe('uk');
  });

  it('should reserve hero space for every language with hidden copies', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const sizers = compiled.querySelectorAll('.hero__sizer[aria-hidden="true"]');
    expect(sizers.length).toBe(LANGUAGES.length * 2);
    expect(compiled.querySelectorAll('h1').length).toBe(1);
  });

  it('should have the same list of services in every language', () => {
    const counts = LANGUAGES.map(({ code }) => TRANSLATIONS[code].services.items.length);
    expect(new Set(counts).size).toBe(1);
  });

  it('should render tools and services', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.tool-group li')).toBeTruthy();
    expect(compiled.querySelector('#services .service h3')).toBeTruthy();
  });

  it('should render works with a demo link opening in a new window', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const link = compiled.querySelector<HTMLAnchorElement>('.work__link');
    expect(link?.textContent).toContain('View demo');
    expect(link?.target).toBe('_blank');
    expect(compiled.querySelector('.work__description')?.textContent).toBe(
      TRANSLATIONS.en.works.padelScore.description,
    );
    expect(compiled.querySelector('.work__stack li')?.textContent).toBe('Vue 3');
    expect(compiled.querySelectorAll('.work').length).toBe(3);
    expect(compiled.querySelectorAll('.work img').length).toBeGreaterThan(1);
  });

  it('should enlarge a carousel image on click', async () => {
    HTMLDialogElement.prototype.showModal = () => {};
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.lightbox__image')).toBeNull();
    compiled.querySelector<HTMLButtonElement>('.carousel__open')?.click();
    await fixture.whenStable();
    expect(compiled.querySelector<HTMLImageElement>('.lightbox__image')?.src).toContain('.webp');
  });

  it('should flip through images in the enlarged view', async () => {
    HTMLDialogElement.prototype.showModal = () => {};
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    compiled.querySelector<HTMLButtonElement>('.carousel__open')?.click();
    await fixture.whenStable();
    const first = compiled.querySelector<HTMLImageElement>('.lightbox__image')?.src;
    compiled.querySelectorAll<HTMLButtonElement>('.lightbox__nav button')[1].click();
    await fixture.whenStable();
    expect(compiled.querySelector<HTMLImageElement>('.lightbox__image')?.src).not.toBe(first);
    expect(compiled.querySelector('.lightbox__counter')?.textContent).toContain('2 /');
  });

  it('should render contact links', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('a[href="https://t.me/ErgoProxyDi"]')).toBeTruthy();
    expect(compiled.querySelector('a[href="mailto:sicevaiadiana@gmail.com"]')).toBeTruthy();
  });
});
