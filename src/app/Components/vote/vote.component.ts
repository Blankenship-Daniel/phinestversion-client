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

  @Input()  index         : number;
  @Input()  score         : number;
  @Input()  submissionId  : number;
  @Output() voteChange    : EventEmitter<number>;

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

  getShade(): number {
    return this.shader.getShade(this.index);
  }

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

  handleVoteResponse(response: boolean) {
    // TODO: error handling
  }

  handleVoteTypeResponse(response: boolean) {
    // TODO: error handling
  }

  submitVote(score: number) {
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
}
