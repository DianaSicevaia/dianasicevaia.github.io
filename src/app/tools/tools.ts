import { Component, computed, inject } from '@angular/core';
import { I18n } from '../i18n/i18n';
import { Reveal } from '../reveal/reveal';

@Component({
  selector: 'app-tools',
  imports: [Reveal],
  templateUrl: './tools.html',
  styleUrl: './tools.scss',
})
export class Tools {
  protected readonly i18n = inject(I18n);

  protected readonly groups = computed(() => {
    const t = this.i18n.t().tools;
    return [
      {
        title: t.frontend,
        items: ['Angular', 'React', 'TypeScript', 'JavaScript', 'Redux', 'HTML', 'CSS', 'SASS'],
      },
      { title: t.backend, items: ['Node.js', 'REST API', 'PostgreSQL', 'SQL', 'Swagger'] },
      { title: t.cloud, items: ['AWS Lambda', t.microservices, t.webhooks, 'Salesforce', 'SOQL'] },
      { title: t.testing, items: ['Playwright', 'BrowserStack', 'Datadog'] },
      { title: t.workflow, items: ['Git', 'Docker', 'Postman', 'Jira'] },
    ];
  });
}
