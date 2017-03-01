import 'hammerjs';
import { MaterialModule } from '@angular/material';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { routes } from './Components/app.routes';

import { AppComponent } from './Components/app.component';

import { HomeComponent } from './Components/home/home.component';

import { HeadingPanelComponent } from './Components/heading-panel/heading-panel.component';
import { NavbarComponent } from './Components/navbar/navbar.component';

import { YearsComponent } from './Components/years/years.component';
import { YearBoxComponent } from './Components/year-box/year-box.component';
import { YearComponent } from './Components/year/year.component';

import { ShowsComponent } from './Components/shows/shows.component';
import { ShowBoxComponent } from './Components/show-box/show-box.component';
import { ShowComponent } from './Components/show/show.component';

import { SongsComponent } from './Components/songs/songs.component';
import { SongBoxComponent } from './Components/song-box/song-box.component';
import { SongComponent } from './Components/song/song.component';

import { SubmissionBoxComponent } from './Components/submission-box/submission-box.component';

import { BackToTopComponent } from './Components/back-to-top/back-to-top.component';

import { CommentListComponent } from './Components/comment-list/comment-list.component';
import { CommentBoxComponent } from './Components/comment-box/comment-box.component';

import { UsersComponent } from './Components/users/users.component';
import { UserComponent } from './Components/user/user.component';
import { UserBoxComponent } from './Components/user-box/user-box.component';

import { LoginComponent } from './Components/login/login.component';

import { VoteComponent } from './Components/vote/vote.component';

import { YearService } from './Services/year.service';
import { ShowService } from './Services/show.service';
import { SongService } from './Services/song.service';
import { SubmissionService } from './Services/submission.service';
import { CommentService } from './Services/comment.service';
import { UserService } from './Services/user.service';
import { VoteService } from './Services/vote.service';

import { ShaderService } from './Services/shader.service';

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
    SongComponent,
    BackToTopComponent,
    CommentListComponent,
    CommentBoxComponent,
    UsersComponent,
    UserComponent,
    UserBoxComponent,
    LoginComponent,
    VoteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot(routes, {
        useHash: false,
    })
  ],
  providers: [
    YearService,
    ShowService,
    SongService,
    SubmissionService,
    CommentService,
    ShaderService,
    UserService,
    VoteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
