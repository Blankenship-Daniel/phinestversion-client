import { Component, OnInit, Input, HostListener } from '@angular/core';

import { Submission } from '../../Models/submission.model';

import { ShaderService } from '../../Services/shader.service';

import { CommentService } from '../../Services/comment.service';
import { Comment } from '../../Models/comment.model';
import { CommentListSize } from '../../Models/commentListSize.model';

@Component({
  selector: 'app-submission-box',
  templateUrl: './submission-box.component.html',
  styleUrls: ['./submission-box.component.css']
})
export class SubmissionBoxComponent implements OnInit {

  @Input() submission: Submission;
  @Input() index: number;
  @Input() songTitle: boolean = false;
  @Input() showTitle: boolean = false;

  private comments: Comment[];
  private commentListSize: CommentListSize[];
  private numComments: number;
  private showComments: boolean = false;
  private offset: number;
  private offsetAmount: number

  constructor(
    private shader: ShaderService,
    private commentService: CommentService
  ) {
    this.offset       = 0;
    this.offsetAmount = 5;
  }

  ngOnInit() {
    this.loadCommentsLength();
    this.loadComments();
  }

  toggleComments() {
    this.showComments = !this.showComments;
  }

  getShade(): number {
    return this.shader.getShade(this.index);
  }

  addComments(comments: Comment[]) {
    this.offset += this.offsetAmount;

    if (this.comments === undefined) {
      this.comments = comments;
      return;
    }
    this.comments = comments.concat(this.comments);
  }

  setNumComments(commentListSize: CommentListSize[]) {
    for (var i = 0; i < commentListSize.length; i++) {
      this.numComments = commentListSize[i].size;
    }
  }

  updateNumComments() {
    this.numComments++;
  }

  loadCommentsLength() {
    this.commentService
        .getCommentsBySubmissionIdCount(
          this.submission.submission_id
        )
        .subscribe(
      commentListSize => this.setNumComments(commentListSize),
      err             => {
        console.log(err);
      }
    );
  }

  loadComments() {
    this.commentService
        .getCommentsBySubmissionId(
          this.submission.submission_id,
          this.offsetAmount,
          this.offset
        )
        .subscribe(
      comments => this.addComments(comments),
      err      => {
        console.log(err);
      }
    );
  }
}
