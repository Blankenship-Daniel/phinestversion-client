import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Show } from '../../Models/show.model';
import { ShowService } from '../../Services/show.service';
import { Song } from '../../Models/song.model';
import { SongService } from '../../Services/song.service';
import { Submission } from '../../Models/submission.model';
import { SubmissionService } from '../../Services/submission.service';
import { User } from '../../Models/user.model';
import { UserLocalStorageService } from '../../Services/userLocalStorage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  /**
   * Indicates whether the form has been submitted or not.
   * @type {boolean}
   */
  private formSubmitted: boolean;

  /**
   * Used to populate the shows dropdown.
   * @type {Show[]}
   */
  private shows: Show[];

  /**
   * Used to populate the songs dropdown.
   * @type {Song[]}
   */
  private songs: Song[];

  /**
   * Indicates whether the search bar is visible or not.
   * @type {boolean} true if the search bar is visible, false otherwise.
   */
  private searchIsVisible: boolean;

  /**
   * Holds the form data and any patterns required to validate the data.
   * @type {FormGroup}
   */
  private submitAVersionForm: FormGroup;

  /**
   * Indicates whether the submit a version subnav is visible or not.
   * @type {boolean} true if the submit a version subnav is visible, false
   *                  otherwise.
   */
  private submitIsVisible: boolean;

  /**
   * Indicates whether whether the dropdown menu is visible or not.
   * @type {boolean}
   */
  private dropdownMenuIsVisible: boolean;

  /**
   * Contains the user data returned from localStorage.
   * @type {any}
   */
  private user: any;

  constructor(

    /**
     * Handles interactions with the API, specifically requests regarding
     *  the `shows` table in the database.
     * @type {ShowService}
     */
    private showService: ShowService,

    /**
     * Handles interactions with the API, specifically requests regarding
     *  the `songs` table in the database.
     * @type {SongService}
     */
    private songService: SongService,

    /**
     * Handles interactions with the API, specifically requests regarding
     *  the `submissions` table in the database.
     * @type {SubmissionService}
     */
    private submissionService: SubmissionService,

    /**
     * Handles interactions with the user object stored in localStorage.
     * @type {UserLocalStorageService}
     */
    private userLocalStorageService: UserLocalStorageService
  ) {
    this.formSubmitted = false;
    this.searchIsVisible = false;
    this.submitAVersionForm = new FormGroup({
        songsDropdown: new FormControl('', Validators.required),
        showsDropdown: new FormControl('', Validators.required),
        description:   new FormControl('', Validators.required)
    });
    this.dropdownMenuIsVisible = false;
    this.submitIsVisible = false;
    this.user = this.userLocalStorageService.getUser();
  }

  ngOnInit() {
    this.loadSongs();
    this.loadShows();
  }

  /**
   * The showService returns an array of Show models and assigns them to
   *  the shows variable.
   */
  loadShows() {
    this.showService.getAllShows().subscribe(
      shows => this.shows = shows,
      err   => {
          console.log(err);
      }
    );
  }

  /**
   * The songService returns an array of Song models and assigns them to
   *  the songs variable.
   */
  loadSongs() {
    this.songService.getAllSongs().subscribe(
      songs => this.songs = songs,
      err   => {
          console.log(err);
      }
    );
  }

  /**
   * Navigates the browser to a given user's page which displays
   *  all of their submissions ranked.
   * @param  {string} username the logged in users username.
   */
  navigateToUser(username: string) {
    location.pathname = '/users/' + username;
  }

  /**
   * Passes the username attached to a given submission to the
   *  navigateToUser function.
   * @param  {Submission[]} submissions
   */
  redirectToSubmissionPage(submissions: Submission[]) {
    this.navigateToUser(submissions[0].username);
  }

  /**
   * Submits the form data to the API, creates a submission entry in
   *  the `submissions` table, and returns the data. The user is then
   *  redirected to their submissions page.
   * @param  {any}     form  the angular form which holds the form data and
   *                          validation rules.
   * @param  {boolean} valid
   */
  submitAVersion(form: any, valid: boolean) {
    this.formSubmitted = true;

    if (valid) {
      if (!this.userLocalStorageService.authUser()) {
        this.userLocalStorageService.redirectToLogin();
        return false;
      }

      let userId      : number  = this.userLocalStorageService.getUserId();
      let songId      : number  = form.songsDropdown;
      let showId      : number  = form.showsDropdown;
      let description : string  = form.description;

      // reset the form
      this.submitAVersionForm.reset();
      this.formSubmitted = false;

      this.submissionService.saveSubmission(
        songId,
        showId,
        description,
        userId,
        0 // score will always be 0 when it is first submitted
      ).subscribe(
        submissions => this.redirectToSubmissionPage(submissions),
        err         => {
          console.log(err);
        }
      );
    }
  }

  toggleDropdownMenu() {
    this.dropdownMenuIsVisible = !this.dropdownMenuIsVisible;
  }

  toggleSearch() {
    this.searchIsVisible = !this.searchIsVisible;
  }

  toggleSubmitAVersion() {
    this.submitIsVisible = !this.submitIsVisible;
  }
}
