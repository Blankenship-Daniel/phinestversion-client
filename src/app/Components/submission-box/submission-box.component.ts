import { Component, OnInit, Input, HostListener } from '@angular/core';

import { Submission } from '../../Models/submission.model';

import { ShaderService } from '../../Services/shader.service';

import { Comment } from '../../Models/comment.model';
import { CommentService } from '../../Services/comment.service';
import { CommentListSize } from '../../Models/commentListSize.model';

@Component({
  selector: 'app-submission-box',
  templateUrl: './submission-box.component.html',
  styleUrls: ['./submission-box.component.css']
})
export class SubmissionBoxComponent implements OnInit {

  @Input() index      : number;
  @Input() songTitle  : boolean = false;
  @Input() showTitle  : boolean = false;
  @Input() submission : Submission;

  /**
   * Contains the comment data.
   * @type {Comment[]}
   */
  private comments: Comment[];

  /**
   * Contains a size attribute which contains the total number of comments
   *  stored in the database.
   * @type {CommentListSize[]}
   */
  private commentListSize: CommentListSize[];

  /**
   * The total number of comments. This allows the comment total to be updated
   *  without modifying the CommentListSize model, less complex.
   * @type {number}
   */
  private numComments: number;

  /**
   * The offset is updated with the offsetAmount. This allows the comments to
   *  be paginated.
   * @type {number}
   */
  private offset: number;

  /**
   * The number of comments to be returned in a single request.
   * @type {number}
   */
  private offsetAmount: number;

  /**
   * Shows the list of comments corresponding to a submission when set to true.
   *  Hides the list of comments when set to false.
   * @type {boolean}
   */
  private showComments: boolean = false;

  constructor(
    private shader          : ShaderService,
    private commentService  : CommentService
  ) {
    this.offset       = 0;
    this.offsetAmount = 5;
  }

  ngOnInit() {
    this.loadComments();
    this.loadCommentsLength();
  }

  toggleComments() {
    this.showComments = !this.showComments;
  }

  updateNumComments() {
    this.numComments++;
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

  /**
   * Sets the numComments with the size attribute from the commentListSize
   *  model. The numComments variable allows the total number of comments to be
   *  updated easily.
   * @param  {CommentListSize[]} commentListSize the model containing the
   *                                             total number of comments.
   */
  setNumComments(commentListSize: CommentListSize[]) {
    for (var i = 0; i < commentListSize.length; i++) {
      this.numComments = commentListSize[i].size;
    }
  }

  /**
   * Loads a list of comments corresponding to a submission id.
   */
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

  /**
   * Loads the total number of comments corresponding to a submission.
   */
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
}
