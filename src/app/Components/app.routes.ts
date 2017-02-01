import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { YearsComponent } from './years/years.component';
import { ShowsComponent } from './shows/shows.component';
import { ShowComponent  } from './show/show.component';
import { YearComponent  } from './year/year.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'years', component: YearsComponent },
  { path: 'years/:date', component: YearComponent },
  { path: 'shows', component: ShowsComponent },
  { path: 'shows/:date', component: ShowComponent },
];
