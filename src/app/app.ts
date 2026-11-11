import { Component } from '@angular/core';
import { Contacts } from './contacts/contacts';
import { Hero } from './hero/hero';
import { Services } from './services/services';
import { Tools } from './tools/tools';
import { Works } from './works/works';

@Component({
  selector: 'app-root',
  imports: [Hero, Tools, Services, Works, Contacts],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
