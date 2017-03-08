import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, HostListener } from '@angular/core';
import { Submission } from '../../Models/submission.model';
import { SubmissionService } from '../../Services/submission.service';
import { UserRank } from '../../Models/userRank.model';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @HostListener('window:scroll', ['$event']) onScroll(ev) {
    var pageHeight = document.documentElement.scrollHeight;
    var scrollPos  = document.documentElement.clientHeight + window.pageYOffset;

    if (scrollPos === pageHeight) {
      this.offset += this.offsetAmount;
      this.loadSubmissions(this.username);
    }
  }

  /**
   * Corresponds to the starting point at which to request songs from the
   *  database.
   * @type {number}
   */
  private offset: number;

  /**
   * Represents how many songs request at a given time.
   * @type {number}
   */
  private offsetAmount: number;

  /**
   * The user's score totalled from all submissions on a given user account.
   * @type {number}
   */
  private score: number;

  /**
   * An array of Submission models containing metadata for each submission a
   *  user has submitted.
   * @type {Submission[]}
   */
  private submissions: Submission[];

  /**
   * The username corresponding on a given user account.
   * @type {string}
   */
  private username: string;

  /**
   * Contains the necessary metadata to display a given user's score.
   * @type {UserRank[]}
   */
  private users: UserRank[];

  constructor(

    /**
     * Allows access to data passed through the URI.
     * @type {ActivatedRoute}
     */
    private route: ActivatedRoute,

    /**
     * Handles interactions with the API, specifically requests regarding
     *  the `users` table in the database.
     * @type {UserService}
     */
    private userService: UserService,

    /**
     * Handles interactions with the API, specifically requests regarding
     *  the `submissions` table in the database.
     * @type {SubmissionService}
     */
    private submissionService: SubmissionService
  ) {
    this.offset = 0;
    this.offsetAmount = 20;
  }

  ngOnInit() {
    this.loadUser(this.username);
    this.loadSubmissions(this.username);
    this.username = this.route.snapshot.params['username'];
  }

  /**
   * Sets the submissions array if it is undefined. Otherwise, it concatenates
   *  the new submissions onto the end of the existing submissions array.
   * @param  {Submission[]} submissions an array of Submission models which hold
   *                                     metadata for a given submission.
   */
  addSubmissions(submissions: Submission[]) {
    if (this.submissions === undefined) {
      this.submissions = submissions;
      return;
    }
    this.submissions.push.apply(this.submissions, submissions);
  }

  /**
   * Updates the user score depending on a vote change on a given song
   *  submission.
   * @param  {Event}  voteChange -1|1 representing the change in a given
   *                              submission's vote.
   */
  handleUserScoreChange(voteChange: Event) {
    this.score += Number(voteChange);
  }

  /**
   * Updates the user score depending on the data returned in the UserRank
   *  array.
   * @param  {UserRank[]} users the model returned containing the user score.
   */
  handleUserRank(users: UserRank[]) {
    this.users = users;
    for (var i = 0; i < users.length; i++) {
      this.score = Number(users[i].score);
    }
  }

  /**
   * Requests the submissions corresponding to a given username.
   * @param  {string} username the user's username stored in the database.
   */
  loadSubmissions(username: string) {
    this.submissionService.getSubmissionsByUserName(
      username,
      this.offsetAmount,
      this.offset
    ).subscribe(
      submissions => this.addSubmissions(submissions),
      err         => {
          console.log(err);
      }
    );
  }

  /**
   * Requests the user ranking for a given user in the database.
   * @param  {string} username the user's username stored in the database.
   */
  loadUser(username: string) {
    this.userService.getUserByUserName(username).subscribe(
      users => this.handleUserRank(users),
      err   => {
          console.log(err);
      }
    );
  }
}
