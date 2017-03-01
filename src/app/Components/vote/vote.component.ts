import { Component, OnInit, Input } from '@angular/core';

import { Vote } from '../../Models/vote.model';

import { SubmissionService } from '../../Services/submission.service';
import { Submission } from '../../Models/submission.model';

import { ShaderService } from '../../Services/shader.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

  @Input() index        : number;
  @Input() score        : number;
  @Input() submissionId : number;

  /**
   * Tracks the type of vote submitted. up|down|<empty_string>
   * @type {string}
   */
  private voteType : string;

  private submissions : Submission[];

  constructor(
    private shader            : ShaderService,
    private submissionService : SubmissionService
  ) {
    this.voteType = '';
  }

  ngOnInit() {
  }

  getShade(): number {
    return this.shader.getShade(this.index);
  }

  upVote() {
    switch (this.voteType) {
      case '':
        this.score++;
        this.voteType = 'up';
        break;
      case 'up':
        this.score--;
        this.voteType = '';
        break;
      case 'down':
        this.score++;
        this.voteType = '';
        break;
    }
    this.submitVote(this.score);
  }

  downVote() {
    switch (this.voteType) {
      case '':
        this.score--;
        this.voteType = 'down';
        break;
      case 'up':
        this.score--;
        this.voteType = '';
        break;
      case 'down':
        this.score++;
        this.voteType = '';
        break;
    }
    this.submitVote(this.score);
  }

  handleSubmission(submissions: Submission[]) {
    console.log(submissions);
  }

  submitVote(score: number) {
    this.submissionService
        .saveSubmissionScore(
          this.submissionId,
          this.score
        )
        .subscribe(
      submissions => this.handleSubmission(submissions),
      err             => {
        console.log(err);
      }
    );
  }
}
