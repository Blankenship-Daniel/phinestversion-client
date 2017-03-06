import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ShaderService } from '../../Services/shader.service';
import { Submission } from '../../Models/submission.model';
import { SubmissionService } from '../../Services/submission.service';
import { UserLocalStorageService } from '../../Services/userLocalStorage.service';
import { Vote } from '../../Models/vote.model';
import { VoteService } from '../../Services/vote.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

  /**
   * Passed to the shader service. Changes the text color depending on the
   *  index number.
   * @type {number}
   */
  @Input() index : number;

  /**
   * Display's the submission score.
   * @type {number}
   */
  @Input() score : number;

  /**
   * The id which corresponds to the submission_id in the database.
   * @type {number}
   */
  @Input() submissionId : number;

  /**
   * Notifies the submission component when the score has changed. This allows
   *  the total score to be updated.
   * @type {number} -1|1
   */
  @Output() voteChange : EventEmitter<number>;

  /**
   * Tracks the type of vote submitted. up|down|<empty_string>
   * @type {string}
   */
  private voteType : string;

  /**
   * Tracks whether the total score amount on the page should be
   *  added to or subtracted from.
   * @type {number}
   */
  private submissions : Submission[];

  constructor(
    private shader                  : ShaderService,
    private voteService             : VoteService,
    private submissionService       : SubmissionService,
    private userLocalStorageService : UserLocalStorageService
  ) {
    this.voteChange = new EventEmitter<number>();
  }

  ngOnInit() {
    this.getVoteType();
  }

  /**
   * Handles the down vote functionality. Redirects the user to the login page
   *  if they attempt to vote without being authenticated.
   */
  downVote() {
    if (!this.userLocalStorageService.authUser()) {
      this.userLocalStorageService.redirectToLogin();
      return false;
    }

    switch (this.voteType) {
      case '':
        this.score--;
        this.voteType = 'down';
        this.voteChange.emit(-1);
        this.submitVoteType('down');
        break;
      case 'up':
        this.score--;
        this.voteType = '';
        this.voteChange.emit(-1);
        this.submitVoteType('down');
        break;
      case 'down':
        this.score++;
        this.voteType = '';
        this.voteChange.emit(1);
        this.submitVoteType('up');
        break;
    }
    this.submitVote(this.score);
  }

  /**
   * Gets the shade number that corresponds to a color class such as grey700-bg.
   * @return {number} the shade number.
   */
  getShade(): number {
    return this.shader.getShade(this.index);
  }

  /**
   * Requests the vote type for a given submission. This allows the user to see
   *  how they have voted on a given submission when authenticated.
   */
  getVoteType() {
    if (!this.userLocalStorageService.authUser()) {
      this.voteType = '';
      return false;
    }

    let userId: number = this.userLocalStorageService.getUserId();

    this.voteService
        .getVoteTypeBySubmissionId(
          this.submissionId,
          userId
        )
        .subscribe(
      voteType => this.processVoteType(voteType),
      err             => {
        console.log(err);
      }
    );
  }

  handleVoteResponse(response: boolean) {}
  handleVoteTypeResponse(response: boolean) {}

  /**
   * The database returns a number representing the type of vote the user has
   *  placed on a given submission. This function converts the number into a
   *  string which the template can process.
   * @param  {number} voteType the number corresponding to the vote type. For
   *                            example, -1 corresponds to 'down', 0 corresponds
   *                            to '', 1 corresponds to 'up'.
   */
  processVoteType(voteType: number) {
    switch (voteType) {
      case -1:
        this.voteType = 'down';
        break;
      case 0:
        this.voteType = '';
        break;
      case 1:
        this.voteType = 'up';
        break;
    }
  }

  /**
   * Updates the score on a given submission in the `submissions` table in the
   *  database.
   * @param  {number} score the updated score after the user votes.
   */
  submitVote(score: number) {
    if (!this.userLocalStorageService.authUser()) {
      this.userLocalStorageService.redirectToLogin();
      return false;
    }

    this.submissionService
        .saveSubmissionScore(
          this.submissionId,
          this.score
        )
        .subscribe(
      response => this.handleVoteResponse(response),
      err             => {
        console.log(err);
      }
    );
  }

  /**
   * Submits the user vote to the `votes` table in the database.
   * @param  {string} voteType ''|up|down
   */
  submitVoteType(voteType: string) {
    if (!this.userLocalStorageService.authUser()) {
      this.userLocalStorageService.redirectToLogin();
      return false;
    }

    let userId: number = this.userLocalStorageService.getUserId();

    this.voteService
        .submitVote(
          this.submissionId,
          userId,
          voteType
        )
        .subscribe(
      response => this.handleVoteTypeResponse(response),
      err             => {
        console.log(err);
      }
    );
  }

  /**
   * Handles the up vote functionality. Redirects the user to the login page if
   *  they attempt to vote without being authenticated.
   */
  upVote() {
    if (!this.userLocalStorageService.authUser()) {
      this.userLocalStorageService.redirectToLogin();
      return false;
    }

    switch (this.voteType) {
      case '':
        this.score++;
        this.voteType = 'up';
        this.voteChange.emit(1);
        this.submitVoteType('up');
        break;
      case 'up':
        this.score--;
        this.voteType = '';
        this.voteChange.emit(-1);
        this.submitVoteType('down');
        break;
      case 'down':
        this.score++;
        this.voteType = '';
        this.voteChange.emit(1);
        this.submitVoteType('up');
        break;
    }

    this.submitVote(this.score);
  }
}
