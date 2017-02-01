import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { YearsComponent } from './years/years.component';
import { YearComponent  } from './years/year/year.component';

import { ShowsComponent } from './shows/shows.component';
import { ShowComponent  } from './shows/show/show.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'years', component: YearsComponent },
  { path: 'years/:date', component: YearComponent },
  { path: 'shows', component: ShowsComponent },
  { path: 'shows/:date', component: ShowComponent },
];
