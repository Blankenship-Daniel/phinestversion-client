import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { routes } from './Components/app.routes';

import { AppComponent } from './Components/app.component';

import { HomeComponent } from './Components/home/home.component';

import { HeadingPanelComponent } from './Components/global_components/heading-panel/heading-panel.component';
import { NavbarComponent } from './Components/global_components/navbar/navbar.component';

import { YearsComponent } from './Components/years/years.component';
import { YearBoxComponent } from './Components/years/year-box/year-box.component';
import { YearComponent } from './Components/years/year/year.component';

import { ShowsComponent } from './Components/shows/shows.component';
import { ShowBoxComponent } from './Components/shows/show-box/show-box.component';
import { ShowComponent } from './Components/shows/show/show.component';

import { SongsComponent } from './Components/songs/songs.component';
import { SongBoxComponent } from './Components/songs/song-box/song-box.component';
import { SongComponent } from './Components/songs/song/song.component';

import { SubmissionBoxComponent } from './Components/songs/song/submission-box/submission-box.component';

import { YearService } from './Services/year.service';
import { ShowService } from './Services/show.service';
import { SongService } from './Services/song.service';
import { Shader } from './Services/shader';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    YearsComponent,
    YearBoxComponent,
    ShowsComponent,
    ShowBoxComponent,
    ShowComponent,
    YearComponent,
    HeadingPanelComponent,
    SongsComponent,
    SongBoxComponent,
    SubmissionBoxComponent,
    SongComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes, {
        useHash: true,
    })
  ],
  providers: [
    YearService,
    ShowService,
    SongService,
    Shader
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
