import { AppComponent } from './Components/app.component';
import { BackToTopComponent } from './Components/back-to-top/back-to-top.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommentBoxComponent } from './Components/comment-box/comment-box.component';
import { CommentListComponent } from './Components/comment-list/comment-list.component';
import { CommentService } from './Services/comment.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeadingPanelComponent } from './Components/heading-panel/heading-panel.component';
import { HomeComponent } from './Components/home/home.component';
import { HttpModule } from '@angular/http';
import { LoginComponent } from './Components/login/login.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './Components/register/register.component';
import { routes } from './Components/app.routes';
import { ShaderService } from './Services/shader.service';
import { ShowBoxComponent } from './Components/show-box/show-box.component';
import { ShowComponent } from './Components/show/show.component';
import { ShowsComponent } from './Components/shows/shows.component';
import { ShowService } from './Services/show.service';
import { SongBoxComponent } from './Components/song-box/song-box.component';
import { SongComponent } from './Components/song/song.component';
import { SongsComponent } from './Components/songs/songs.component';
import { SongService } from './Services/song.service';
import { SubmissionBoxComponent } from './Components/submission-box/submission-box.component';
import { SubmissionService } from './Services/submission.service';
import { UserBoxComponent } from './Components/user-box/user-box.component';
import { UserComponent } from './Components/user/user.component';
import { UsersComponent } from './Components/users/users.component';
import { UserLocalStorageService } from './Services/userLocalStorage.service';
import { UserService } from './Services/user.service';
import { VoteComponent } from './Components/vote/vote.component';
import { VoteService } from './Services/vote.service';
import { YearBoxComponent } from './Components/year-box/year-box.component';
import { YearComponent } from './Components/year/year.component';
import { YearsComponent } from './Components/years/years.component';
import { YearService } from './Services/year.service';

@NgModule({
  declarations: [
    AppComponent,
    BackToTopComponent,
    CommentBoxComponent,
    CommentListComponent,
    HeadingPanelComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    RegisterComponent,
    ShowBoxComponent,
    ShowComponent,
    ShowsComponent,
    SongBoxComponent,
    SongComponent,
    SongsComponent,
    SubmissionBoxComponent,
    UserBoxComponent,
    UserComponent,
    UsersComponent,
    VoteComponent,
    YearBoxComponent,
    YearComponent,
    YearsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, {
        useHash: false,
    })
  ],
  providers: [
    CommentService,
    ShaderService,
    ShowService,
    SongService,
    SubmissionService,
    UserLocalStorageService,
    UserService,
    VoteService,
    YearService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
