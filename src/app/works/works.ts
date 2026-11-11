import { Component, computed, inject } from '@angular/core';
import { Carousel } from '../carousel/carousel';
import { I18n } from '../i18n/i18n';

@Component({
  selector: 'app-works',
  imports: [Carousel],
  templateUrl: './works.html',
  styleUrl: './works.scss',
})
export class Works {
  protected readonly i18n = inject(I18n);

  protected readonly works = computed(() => {
    const { padelScore, movieHub, alienInTheRoom } = this.i18n.t().works;
    return [
      {
        title: 'Padel Score',
        description: padelScore.description,
        stack: ['Vue 3', 'TypeScript', 'Pinia', 'Firebase'],
        demoUrl: 'https://padel-club-score.web.app',
        images: [
          { src: 'works/padel-score/dashboard.webp', alt: padelScore.alts.dashboard },
          { src: 'works/padel-score/matches.webp', alt: padelScore.alts.matches },
          { src: 'works/padel-score/clubs.webp', alt: padelScore.alts.club },
          { src: 'works/padel-score/login.webp', alt: padelScore.alts.login },
        ],
      },
      {
        title: 'HSMovieHub',
        description: movieHub.description,
        stack: ['Angular 21', 'TypeScript', 'Tailwind CSS', 'RxJS'],
        demoUrl: 'https://dianasicevaia.github.io/hs-test-movie-app/',
        images: [
          { src: 'works/movie-hub/popular.webp', alt: movieHub.alts.popular },
          { src: 'works/movie-hub/search.webp', alt: movieHub.alts.search },
          { src: 'works/movie-hub/details.webp', alt: movieHub.alts.details },
        ],
      },
      {
        title: 'Alien in the Room',
        description: alienInTheRoom.description,
        stack: ['React', 'TypeScript', 'Next.js', 'Firebase'],
        demoUrl: 'https://alien-in-the-room.vercel.app/en',
        images: [
          { src: 'works/alien-in-the-room/main-page.webp', alt: alienInTheRoom.alts.mainPage },
          { src: 'works/alien-in-the-room/create-room.webp', alt: alienInTheRoom.alts.createRoom },
          {
            src: 'works/alien-in-the-room/creators-page.webp',
            alt: alienInTheRoom.alts.creatorsPage,
          },
          {
            src: 'works/alien-in-the-room/players-page.webp',
            alt: alienInTheRoom.alts.playersPage,
          },
        ],
      },
    ];
  });
}
