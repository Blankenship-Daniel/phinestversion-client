import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Routes } from '@angular/router';
import { ShowComponent  } from './show/show.component';
import { ShowsComponent } from './shows/shows.component';
import { SongComponent  } from './song/song.component';
import { SongsComponent } from './songs/songs.component';
import { SubmitVersionComponent } from './submit-version/submit-version.component';
import { UserComponent } from './user/user.component';
import { UsersComponent } from './users/users.component';
import { YearComponent  } from './year/year.component';
import { YearsComponent } from './years/years.component';


export const routes: Routes = [
  { path: '',                 component: HomeComponent      },
  { path: 'login',            component: LoginComponent     },
  { path: 'register',         component: RegisterComponent  },
  { path: 'shows',            component: ShowsComponent     },
  { path: 'shows/:date',      component: ShowComponent      },
  { path: 'songs',            component: SongsComponent     },
  { path: 'songs/:slug',      component: SongComponent      },
  { path: 'submit',           component: SubmitVersionComponent },
  { path: 'users',            component: UsersComponent     },
  { path: 'users/:username',  component: UserComponent      },
  { path: 'years',            component: YearsComponent     },
  { path: 'years/:date',      component: YearComponent      }
];
