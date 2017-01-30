import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { YearsComponent } from './years/years.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'years', component: YearsComponent }
];
