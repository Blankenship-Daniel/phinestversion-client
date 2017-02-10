import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { LoginComponent } from './login/login.component';

import { YearsComponent } from './years/years.component';
import { YearComponent  } from './years/year/year.component';

import { ShowsComponent } from './shows/shows.component';
import { ShowComponent  } from './shows/show/show.component';

import { SongsComponent } from './songs/songs.component';
import { SongComponent  } from './songs/song/song.component';

import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';


export const routes: Routes = [
  { path: '',                 component: HomeComponent  },
  { path: 'login',            component: LoginComponent },
  { path: 'years',            component: YearsComponent },
  { path: 'years/:date',      component: YearComponent  },
  { path: 'shows',            component: ShowsComponent },
  { path: 'shows/:date',      component: ShowComponent  },
  { path: 'songs',            component: SongsComponent },
  { path: 'songs/:slug',      component: SongComponent  },
  { path: 'users',            component: UsersComponent },
  { path: 'users/:username',  component: UserComponent  }
];
