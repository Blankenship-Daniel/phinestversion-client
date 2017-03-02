import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';

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

  @Input()  index      : number;
  @Input()  songTitle  : boolean = false;
  @Input()  showTitle  : boolean = false;
  @Input()  submission : Submission;
  @Output() voteChange : EventEmitter<number>;

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
    this.voteChange   = new EventEmitter<number>();
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

  /**
   * Prepends the comments returned from the latest request to the
   *  beginning of the current comments array. If the current comments
   *  array is undefined it sets it to the new request.
   * @param  {Comment[]} comments a list of Comment models which contains all
   *                                data necessary for the comments section of
   *                                each submission.
   */
  addComments(comments: Comment[]) {
    this.offset += this.offsetAmount;

    if (this.comments === undefined) {
      this.comments = comments;
      return;
    }
    this.comments = comments.concat(this.comments);
  }

  /**
   * Passes the event received from the vote component up to the parent
   *  component. This allows the total score in the heading panel to be
   *  affected.
   * @param  {Event} event either 1|-1 depending on how the vote component has
   *                                    changed.
   */
  emitVoteChange(event) {
    this.voteChange.emit(event); // pass the event up to its parent component.
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
