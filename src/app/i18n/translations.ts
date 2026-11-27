export type Language = 'en' | 'uk' | 'ro' | 'ru';

export const LANGUAGES: readonly { code: Language; label: string; name: string }[] = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'uk', label: 'UA', name: 'Українська' },
  { code: 'ro', label: 'RO', name: 'Română' },
  { code: 'ru', label: 'RU', name: 'Русский' },
];

export const DEFAULT_LANGUAGE: Language = 'en';

export interface Translations {
  meta: { title: string; description: string; languageSwitcher: string };
  hero: { eyebrow: string; greeting: string; lead: string; role: string; text: string };
  tools: {
    title: string;
    frontend: string;
    backend: string;
    cloud: string;
    testing: string;
    workflow: string;
    microservices: string;
    webhooks: string;
  };
  services: { title: string; items: readonly { title: string; description: string }[] };
  templates: {
    title: string;
    intro: string;
    marquee: { title: string; description: string; label: string; items: readonly string[] };
    cards: {
      title: string;
      description: string;
      label: string;
      items: readonly { title: string; text: string }[];
    };
    trail: { title: string; description: string; hint: string };
  };
  works: {
    title: string;
    demo: string;
    newWindow: string;
    screenshots: string;
    stack: string;
    padelScore: {
      description: string;
      alts: { dashboard: string; matches: string; club: string; login: string };
    };
    movieHub: { description: string; alts: { popular: string; search: string; details: string } };
    alienInTheRoom: {
      description: string;
      alts: { mainPage: string; createRoom: string; creatorsPage: string; playersPage: string };
    };
  };
  carousel: { enlarge: string; lightbox: string; close: string; previous: string; next: string };
  contacts: {
    title: string;
    email: string;
    note: string;
    toTop: string;
    cv: string;
    cvDownload: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    meta: {
      title: 'Diana Sicevaia — web developer',
      description:
        'Portfolio of a front-end and full-stack developer with 5 years of experience: Angular, React, TypeScript, AWS Lambda, Salesforce. Web applications, integrations and microservices.',
      languageSwitcher: 'Language',
    },
    hero: {
      eyebrow: 'Portfolio',
      greeting: 'Hi, I’m Diana,',
      lead: 'and I’m a',
      role: 'web developer',
      text: 'For 5 years I’ve been building web applications with Angular and React, from the interface to APIs, integrations and microservices on AWS.',
    },
    tools: {
      title: 'Tools',
      frontend: 'Front-end',
      backend: 'Back-end and data',
      cloud: 'Cloud and integrations',
      testing: 'Testing and monitoring',
      workflow: 'Everyday tools',
      microservices: 'Microservices',
      webhooks: 'Webhooks',
    },
    services: {
      title: 'How I can help',
      items: [
        {
          title: 'Web application',
          description:
            'The full cycle: estimating the task, UI, business logic, API work and release.',
        },
        {
          title: 'Improving an existing product',
          description:
            'New features with an assessment of their impact on current functionality and data, without regressions.',
        },
        {
          title: 'Connecting external services',
          description:
            'Linking your application to the back-end and third-party systems via REST APIs and webhooks.',
        },
        {
          title: 'Microservice on AWS Lambda',
          description:
            'From infrastructure setup to logging. For example, generating PDFs from templates.',
        },
        {
          title: 'E2E tests with Playwright',
          description:
            'Maintaining and extending tests, fixing failing scenarios, keeping the suite stable.',
        },
        {
          title: 'Website for a small business',
          description:
            'On a no-code platform with custom code, from gathering requirements to final revisions.',
        },
      ],
    },
    templates: {
      title: 'Templates',
      intro:
        'Examples of ready-made blocks you might want on your own website. Each one adapts to your content, colors and fonts.',
      marquee: {
        title: 'Marquee',
        description:
          'A scrolling strip for announcements, special offers or key advantages. It catches the eye while taking up very little space.',
        label: 'Sample announcements',
        items: [
          'Free city delivery',
          'New collection is here',
          'Open daily 9:00–21:00',
          '−20% on your first order',
          'Online booking 24/7',
        ],
      },
      cards: {
        title: 'Service cards',
        description:
          'Cards for services, payment or delivery options. On hover, or when you press and hold one on a phone, the card darkens and the icon tilts.',
        label: 'Sample services',
        items: [
          { title: 'Delivery', text: 'Same day across the city' },
          { title: 'Installments', text: 'From 3 to 12 months' },
          { title: 'Card payment', text: 'Visa, Mastercard, Apple Pay' },
          { title: 'Support', text: 'Every day, 9:00–21:00' },
        ],
      },
      trail: {
        title: 'Cursor trail',
        description:
          'An interactive background: the cursor turns into a flower and leaves a trail of blossoms that fade away. The pattern can be anything: shapes, symbols, your logo.',
        hint: 'Move the cursor here or swipe sideways',
      },
    },
    works: {
      title: 'My work',
      demo: 'View demo',
      newWindow: 'opens in a new window',
      screenshots: 'Screenshots',
      stack: 'Built with',
      padelScore: {
        description:
          'A web app for padel clubs: match scores, player rankings and game scheduling.',
        alts: {
          dashboard: 'Dashboard: statistics, club rankings and upcoming matches',
          matches: 'List of upcoming matches',
          club: 'Club page: players and match results',
          login: 'Application sign-in screen',
        },
      },
      movieHub: {
        description:
          'Browse popular movies, search with live results and open a movie page. Data comes from the TMDb API.',
        alts: {
          popular: 'Grid of popular movies with a search field',
          search: 'Search results, including movies without a poster',
          details: 'Movie page: poster, rating, genres and overview',
        },
      },
      alienInTheRoom: {
        description:
          'Party game: Almost all players get one word, the aliens get a similar one. Players describe their word and try to find the alien.',
        alts: {
          mainPage: 'Main page of the game',
          createRoom: 'Creating a room for the game',
          creatorsPage: 'Creator page of the game',
          playersPage: 'Player page of the game',
        },
      },
    },
    carousel: {
      enlarge: 'Enlarge photo',
      lightbox: 'Enlarged photo',
      close: 'Close',
      previous: 'Previous photo',
      next: 'Next photo',
    },
    contacts: {
      title: 'Let’s talk about your project',
      email: 'Email',
      toTop: 'Back to top',
      cv: 'CV',
      cvDownload: 'Open PDF',
      note: 'Moldova, working remotely. Languages: Russian, Romanian, English, Chinese (HSK 4).',
    },
  },
  uk: {
    meta: {
      title: 'Diana Sicevaia — веб-розробник',
      description:
        'Портфоліо фронтенд- і фулстек-розробника з досвідом 5 років: Angular, React, TypeScript, AWS Lambda, Salesforce. Вебзастосунки, інтеграції та мікросервіси.',
      languageSwitcher: 'Мова',
    },
    hero: {
      eyebrow: 'Портфоліо',
      greeting: 'Привіт, я Діана,',
      lead: 'і я',
      role: 'веб-розробник',
      text: 'Вже 5 років створюю вебзастосунки на Angular і React: від інтерфейсу до API, інтеграцій і мікросервісів на AWS.',
    },
    tools: {
      title: 'Інструменти',
      frontend: 'Фронтенд',
      backend: 'Бекенд і дані',
      cloud: 'Хмара та інтеграції',
      testing: 'Тести й моніторинг',
      workflow: 'Робочі інструменти',
      microservices: 'Мікросервіси',
      webhooks: 'Вебхуки',
    },
    services: {
      title: 'З чим можна звернутися',
      items: [
        {
          title: 'Вебзастосунок',
          description:
            'Повний цикл: оцінка задачі, інтерфейс, бізнес-логіка, робота з API та реліз.',
        },
        {
          title: 'Доопрацювання наявного продукту',
          description: 'Нові функції з оцінкою впливу на поточний функціонал і дані, без регресій.',
        },
        {
          title: 'Підключення зовнішніх сервісів',
          description:
            'Зв’язка застосунку з бекендом і сторонніми системами через REST API та вебхуки.',
        },
        {
          title: 'Мікросервіс на AWS Lambda',
          description:
            'Від налаштування інфраструктури до логування. Наприклад, генерація PDF за шаблонами.',
        },
        {
          title: 'E2E-тести на Playwright',
          description:
            'Підтримка й розвиток тестів, виправлення сценаріїв, що падають, стабільність набору.',
        },
        {
          title: 'Сайт для малого бізнесу',
          description:
            'На no-code-платформі з кастомним кодом: від збору вимог до фінальних правок.',
        },
      ],
    },
    templates: {
      title: 'Шаблони',
      intro:
        'Приклади готових блоків, які можуть знадобитися на вашому сайті. Кожен підлаштовується під ваш контент, кольори та шрифти.',
      marquee: {
        title: 'Бігучий рядок',
        description:
          'Стрічка для оголошень, акцій або ключових переваг. Привертає увагу й майже не займає місця.',
        label: 'Приклади оголошень',
        items: [
          'Безкоштовна доставка містом',
          'Нова колекція вже тут',
          'Працюємо щодня 9:00–21:00',
          '−20% на перше замовлення',
          'Онлайн-запис 24/7',
        ],
      },
      cards: {
        title: 'Картки послуг',
        description:
          'Картки для послуг, способів оплати чи доставки. При наведенні, а на телефоні при утриманні, картка темніє, а іконка нахиляється.',
        label: 'Приклади послуг',
        items: [
          { title: 'Доставка', text: 'У день замовлення містом' },
          { title: 'Розстрочка', text: 'Від 3 до 12 місяців' },
          { title: 'Оплата карткою', text: 'Visa, Mastercard, Apple Pay' },
          { title: 'Підтримка', text: 'Щодня, 9:00–21:00' },
        ],
      },
      trail: {
        title: 'Слід від курсора',
        description:
          'Інтерактивний фон: курсор стає квіткою й лишає за собою слід із квітів, що поступово зникають. Візерунок може бути будь-яким: фігури, символи, ваш логотип.',
        hint: 'Проведіть тут курсором або пальцем убік',
      },
    },
    works: {
      title: 'Мої роботи',
      demo: 'Переглянути демо',
      newWindow: 'відкриється в новому вікні',
      screenshots: 'Скриншоти',
      stack: 'Технології',
      padelScore: {
        description:
          'Вебзастосунок для падел-клубів: рахунок матчів, рейтинг гравців і запис на ігри.',
        alts: {
          dashboard: 'Дашборд: статистика, рейтинг клубу та найближчі матчі',
          matches: 'Список майбутніх матчів',
          club: 'Сторінка клубу: гравці та результати матчів',
          login: 'Екран входу в застосунок',
        },
      },
      movieHub: {
        description:
          'Популярні фільми, пошук із результатами під час введення і сторінка фільму. Дані беруться з TMDb API.',
        alts: {
          popular: 'Сітка популярних фільмів із полем пошуку',
          search: 'Результати пошуку, зокрема фільми без постера',
          details: 'Сторінка фільму: постер, рейтинг, жанри та опис',
        },
      },
      alienInTheRoom: {
        description:
          'Party-гра: Майже всі гравці отримують одне слово, чужі отримують схоже. Гравці описують своє слово та шукають чужогоя.',
        alts: {
          mainPage: 'Головна сторінка гри',
          createRoom: 'Створення кімнати для гри',
          creatorsPage: 'Сторінка створювача гри',
          playersPage: 'Сторінка гравця',
        },
      },
    },
    carousel: {
      enlarge: 'Збільшити фото',
      lightbox: 'Збільшене фото',
      close: 'Закрити',
      previous: 'Попереднє фото',
      next: 'Наступне фото',
    },
    contacts: {
      title: 'Обговорити задачу',
      email: 'Пошта',
      toTop: 'Нагору',
      cv: 'Резюме',
      cvDownload: 'Відкрити PDF',
      note: 'Молдова, працюю віддалено. Мови: російська, румунська, англійська, китайська (HSK 4).',
    },
  },
  ro: {
    meta: {
      title: 'Diana Sicevaia — web developer',
      description:
        'Portofoliul unui dezvoltator front-end și full-stack cu 5 ani de experiență: Angular, React, TypeScript, AWS Lambda, Salesforce. Aplicații web, integrări și microservicii.',
      languageSwitcher: 'Limbă',
    },
    hero: {
      eyebrow: 'Portofoliu',
      greeting: 'Bună, sunt Diana,',
      lead: 'și sunt',
      role: 'web developer',
      text: 'De 5 ani creez aplicații web cu Angular și React: de la interfață la API-uri, integrări și microservicii pe AWS.',
    },
    tools: {
      title: 'Instrumente',
      frontend: 'Front-end',
      backend: 'Back-end și date',
      cloud: 'Cloud și integrări',
      testing: 'Teste și monitorizare',
      workflow: 'Instrumente de lucru',
      microservices: 'Microservicii',
      webhooks: 'Webhook-uri',
    },
    services: {
      title: 'Cu ce te pot ajuta',
      items: [
        {
          title: 'Aplicație web',
          description:
            'Ciclu complet: estimarea sarcinii, interfață, logică de business, lucru cu API-uri și lansare.',
        },
        {
          title: 'Dezvoltarea unui produs existent',
          description:
            'Funcționalități noi, cu evaluarea impactului asupra celor actuale și a datelor, fără regresii.',
        },
        {
          title: 'Conectarea serviciilor externe',
          description:
            'Legarea aplicației de back-end și de sisteme terțe prin REST API și webhook-uri.',
        },
        {
          title: 'Microserviciu pe AWS Lambda',
          description:
            'De la configurarea infrastructurii la logare. De exemplu, generarea de PDF-uri din șabloane.',
        },
        {
          title: 'Teste E2E cu Playwright',
          description:
            'Menținerea și extinderea testelor, repararea scenariilor care eșuează, stabilitatea suitei.',
        },
        {
          title: 'Site pentru afaceri mici',
          description:
            'Pe o platformă no-code cu cod personalizat: de la colectarea cerințelor până la ultimele modificări.',
        },
      ],
    },
    templates: {
      title: 'Șabloane',
      intro:
        'Exemple de blocuri gata făcute pe care le-ai putea dori pe site-ul tău. Fiecare se adaptează la conținutul, culorile și fonturile tale.',
      marquee: {
        title: 'Bandă derulantă',
        description:
          'O bandă pentru anunțuri, oferte sau avantaje cheie. Atrage atenția și ocupă foarte puțin spațiu.',
        label: 'Exemple de anunțuri',
        items: [
          'Livrare gratuită în oraș',
          'Noua colecție a sosit',
          'Deschis zilnic 9:00–21:00',
          '−20% la prima comandă',
          'Programare online 24/7',
        ],
      },
      cards: {
        title: 'Carduri de servicii',
        description:
          'Carduri pentru servicii, metode de plată sau livrare. La trecerea cursorului sau la apăsare lungă pe telefon, cardul se întunecă, iar pictograma se înclină.',
        label: 'Exemple de servicii',
        items: [
          { title: 'Livrare', text: 'În aceeași zi, prin oraș' },
          { title: 'Rate', text: 'De la 3 la 12 luni' },
          { title: 'Plata cu cardul', text: 'Visa, Mastercard, Apple Pay' },
          { title: 'Suport', text: 'Zilnic, 9:00–21:00' },
        ],
      },
      trail: {
        title: 'Urma cursorului',
        description:
          'Un fundal interactiv: cursorul devine o floare și lasă în urmă flori care dispar treptat. Modelul poate fi oricare: forme, simboluri, logo-ul tău.',
        hint: 'Mișcă cursorul aici sau glisează lateral',
      },
    },
    works: {
      title: 'Proiectele mele',
      demo: 'Vezi demo',
      newWindow: 'se deschide într-o fereastră nouă',
      screenshots: 'Capturi de ecran',
      stack: 'Tehnologii',
      padelScore: {
        description:
          'Aplicație web pentru cluburi de padel: scorul meciurilor, clasamentul jucătorilor și programarea jocurilor.',
        alts: {
          dashboard: 'Panou principal: statistici, clasamentul clubului și meciurile următoare',
          matches: 'Lista meciurilor viitoare',
          club: 'Pagina clubului: jucători și rezultatele meciurilor',
          login: 'Ecranul de autentificare al aplicației',
        },
      },
      movieHub: {
        description:
          'Filme populare, căutare cu rezultate în timp real și pagina filmului. Datele vin din API-ul TMDb.',
        alts: {
          popular: 'Grila filmelor populare cu câmpul de căutare',
          search: 'Rezultatele căutării, inclusiv filme fără afiș',
          details: 'Pagina filmului: afiș, rating, genuri și descriere',
        },
      },
      alienInTheRoom: {
        description:
          'Joc de petrecere: Aproape toți jucătorii primesc un cuvânt, străinii primesc unul similar. Jucătorii își descriu cuvântul și încearcă să găsească străinul.',
        alts: {
          mainPage: 'Pagina principală a jocului',
          createRoom: 'Crearea unei camere pentru joc',
          creatorsPage: 'Pagina creatorului jocului',
          playersPage: 'Pagina jucătorului',
        },
      },
    },
    carousel: {
      enlarge: 'Mărește fotografia',
      lightbox: 'Fotografie mărită',
      close: 'Închide',
      previous: 'Fotografia anterioară',
      next: 'Fotografia următoare',
    },
    contacts: {
      title: 'Hai să discutăm proiectul',
      email: 'E-mail',
      toTop: 'Înapoi sus',
      cv: 'CV',
      cvDownload: 'Deschide PDF',
      note: 'Moldova, lucrez la distanță. Limbi: rusă, română, engleză, chineză (HSK 4).',
    },
  },
  ru: {
    meta: {
      title: 'Diana Sicevaia — веб-разработчик',
      description:
        'Портфолио фронтенд и фулл-стак разработчика с опытом 5 лет: Angular, React, TypeScript, AWS Lambda, Salesforce. Веб-приложения, интеграции и микросервисы.',
      languageSwitcher: 'Язык',
    },
    hero: {
      eyebrow: 'Портфолио',
      greeting: 'Привет, я Диана,',
      lead: 'и я',
      role: 'веб-разработчик',
      text: 'Уже 5 лет создаю веб-приложения на Angular и React: от интерфейса до API, интеграций и микросервисов на AWS.',
    },
    tools: {
      title: 'Инструменты',
      frontend: 'Фронтенд',
      backend: 'Бэкенд и данные',
      cloud: 'Облако и интеграции',
      testing: 'Тесты и мониторинг',
      workflow: 'Рабочие инструменты',
      microservices: 'Микросервисы',
      webhooks: 'Вебхуки',
    },
    services: {
      title: 'С чем можно прийти',
      items: [
        {
          title: 'Веб-приложение',
          description:
            'Полный цикл: оценка задачи, интерфейс, бизнес-логика, работа с API и релиз.',
        },
        {
          title: 'Доработка существующего продукта',
          description:
            'Новые функции с оценкой влияния на текущий функционал и данные, без регрессий.',
        },
        {
          title: 'Подключение внешних сервисов',
          description:
            'Связка приложения с бэкендом и сторонними системами через REST API и вебхуки.',
        },
        {
          title: 'Микросервис на AWS Lambda',
          description:
            'От настройки инфраструктуры до логирования. Например, генерация PDF по шаблонам.',
        },
        {
          title: 'E2E-тесты на Playwright',
          description:
            'Поддержка и развитие тестов, исправление падающих сценариев, стабильность набора.',
        },
        {
          title: 'Сайт для малого бизнеса',
          description:
            'На no-code-платформе с кастомным кодом: от сбора требований до финальных правок.',
        },
      ],
    },
    templates: {
      title: 'Шаблоны',
      intro:
        'Примеры готовых блоков, которые могут пригодиться на вашем сайте. Каждый подстраивается под ваш контент, цвета и шрифты.',
      marquee: {
        title: 'Бегущая строка',
        description:
          'Лента для объявлений, акций или ключевых преимуществ. Привлекает внимание и почти не занимает места.',
        label: 'Примеры объявлений',
        items: [
          'Бесплатная доставка по городу',
          'Новая коллекция уже здесь',
          'Работаем ежедневно 9:00–21:00',
          '−20% на первый заказ',
          'Онлайн-запись 24/7',
        ],
      },
      cards: {
        title: 'Карточки услуг',
        description:
          'Карточки для услуг, способов оплаты или доставки. При наведении, а на телефоне при удержании, карточка темнеет, а иконка наклоняется.',
        label: 'Примеры услуг',
        items: [
          { title: 'Доставка', text: 'В день заказа по городу' },
          { title: 'Рассрочка', text: 'От 3 до 12 месяцев' },
          { title: 'Оплата картой', text: 'Visa, Mastercard, Apple Pay' },
          { title: 'Поддержка', text: 'Ежедневно, 9:00–21:00' },
        ],
      },
      trail: {
        title: 'След от курсора',
        description:
          'Интерактивный фон: курсор превращается в цветок и оставляет за собой след из цветов, которые постепенно исчезают. Узор может быть любым: фигуры, символы, ваш логотип.',
        hint: 'Проведите здесь курсором или пальцем в сторону',
      },
    },
    works: {
      title: 'Мои работы',
      demo: 'Посмотреть демо',
      newWindow: 'откроется в новом окне',
      screenshots: 'Скриншоты',
      stack: 'Технологии',
      padelScore: {
        description:
          'Веб-приложение для падел-клубов: счёт матчей, рейтинг игроков и запись на игры.',
        alts: {
          dashboard: 'Дашборд: статистика, рейтинг клуба и ближайшие матчи',
          matches: 'Список предстоящих матчей',
          club: 'Страница клуба: игроки и результаты матчей',
          login: 'Экран входа в приложение',
        },
      },
      movieHub: {
        description:
          'Популярные фильмы, поиск с результатами по мере ввода и страница фильма. Данные берутся из TMDb API.',
        alts: {
          popular: 'Сетка популярных фильмов с полем поиска',
          search: 'Результаты поиска, в том числе фильмы без постера',
          details: 'Страница фильма: постер, рейтинг, жанры и описание',
        },
      },
      alienInTheRoom: {
        description:
          'Party-игра: Почти все игроки получают одно слово, чужие получают похожее. Игроки описывают своё слово и ищут чужого.',
        alts: {
          mainPage: 'Главная страница игры',
          createRoom: 'Создание комнаты для игры',
          creatorsPage: 'Страница создателя игры',
          playersPage: 'Страница игрока',
        },
      },
    },
    carousel: {
      enlarge: 'Увеличить фото',
      lightbox: 'Увеличенное фото',
      close: 'Закрыть',
      previous: 'Предыдущее фото',
      next: 'Следующее фото',
    },
    contacts: {
      title: 'Обсудить задачу',
      email: 'Почта',
      toTop: 'Наверх',
      cv: 'Резюме',
      cvDownload: 'Открыть PDF',
      note: 'Молдова, работаю удалённо. Языки: русский, румынский, английский, китайский (HSK 4).',
    },
  },
};
