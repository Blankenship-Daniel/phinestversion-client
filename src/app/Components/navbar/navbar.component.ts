import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { User } from '../../Models/user.model';

import { SongService } from '../../Services/song.service';
import { ShowService } from '../../Services/show.service';
import { SubmissionService } from '../../Services/submission.service';

import { Song } from '../../Models/song.model';
import { Show } from '../../Models/show.model';
import { Submission } from '../../Models/submission.model';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private user  : User;
  private songs : Song[];
  private shows : Show[];
  private formSubmitted       : boolean;
  private submitAVersionForm  : FormGroup;

  constructor(
    private router: Router,
    private songService: SongService,
    private showService: ShowService,
    private submissionService: SubmissionService
  ) {
    this.user = null;
    this.formSubmitted = false;
    this.submitAVersionForm = new FormGroup({
        songsDropdown: new FormControl('', Validators.required),
        showsDropdown: new FormControl('', Validators.required),
        description:   new FormControl('', Validators.required)
    });
  }

  private searchIsVisible: boolean = false;
  private submitIsVisible: boolean = false;

  ngOnInit() {
    if (localStorage.getItem('user') !== null) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
    this.loadSongs();
    this.loadShows();
  }

  navigateToUser(username) {
    location.pathname = '/users/' + username;
  }

  submitAVersion(form, valid) {
    this.formSubmitted = true;
    if (valid) {
      let song_id     = form.songsDropdown;
      let show_id     = form.showsDropdown;
      let description = form.description;
      let user        = JSON.parse(localStorage.getItem('user'));
      let user_id     = user.id;

      // reset the form
      this.submitAVersionForm.reset();
      this.formSubmitted = false;

      this.submissionService.saveSubmission(
        song_id,
        show_id,
        description,
        user_id,
        0 // score will always be 0 when it is first submitted
      ).subscribe(
        submissions => this.redirectToSubmissionPage(submissions),
        err         => {
          console.log(err);
        }
      );
    }
  }

  redirectToSubmissionPage(submissions: Submission[]) {
    location.pathname = '/users/' + submissions[0].username;
  }

  toggleSubmitAVersion() {
    this.submitIsVisible = !this.submitIsVisible;
  }

  toggleSearch() {
    this.searchIsVisible = !this.searchIsVisible;
  }

  loadSongs() {
    this.songService.getAllSongs().subscribe(
      songs => this.songs = songs,
      err   => {
          console.log(err);
      }
    );
  }

  loadShows() {
    this.showService.getAllShows().subscribe(
      shows => this.shows = shows,
      err   => {
          console.log(err);
      }
    );
  }
}
