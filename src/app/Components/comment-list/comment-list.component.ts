import { Comment } from '../../Models/comment.model';
import { CommentService } from '../../Services/comment.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserLocalStorageService } from '../../Services/userLocalStorage.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  /**
   * A list of Comment's to be displayed corresponding to a given
   *  submission.
   * @type {Comment[]}
   */
  @Input() comments: Comment[];

  /**
   * Notifies the SubmissionBoxComponent that a comment has been
   *  submitted.
   * @type {EventEmitter<boolean>}
   */
  @Output() commentSubmitted: EventEmitter<boolean>;

  /**
   * Shows the comments if set to true. Hides the comments if set
   *  to false.
   * @type {boolean}
   */
  @Input() showComments: boolean;

  /**
   * The number that corresponds to a submission in the database.
   * @type {number}
   */
  @Input() submissionId: number;

  /**
   * The form to submit a new comment on a given submission.
   * @type {FormGroup}
   */
  private commentForm: FormGroup;

  /**
   * Keeps track of whether the commentForm has been submitted or not.
   * @type {boolean} true if the commentForm has been submitted, false
   *                  false otherwise.
   */
  private formSubmitted: boolean;

  constructor(

    /**
     * Handles requests to the API and returns data from the `comments`
     *  table.
     * @type {CommentService}
     */
    private commentService: CommentService,

    /**
     * Handles interactions with the user object stored in localStorage.
     * @type {UserLocalStorageService}
     */
    private userLocalStorageService: UserLocalStorageService
  ) {
    this.formSubmitted = false;
    this.commentForm = new FormGroup({
        comment: new FormControl('', Validators.required)
    });
    this.commentSubmitted = new EventEmitter<boolean>();
  }

  ngOnInit() {
  }

  /**
   * Adds comments returned from the commentService and adds
   *  them to the end of the comments array. If the comments
   *  array is undefined, it assigns the return value from the
   *  commentService to the comments array.
   * @param  {Comment[]} comments an array of comments returned
   *                               from the submitComment function.
   */
  addComments(comments: Comment[]) {
    if (this.comments === undefined) {
      this.comments = comments;
      return;
    }
    this.comments.push.apply(this.comments, comments);

    // Notify the parent element when a comment has been submitted.
    //  This is for updating the comment number on the submission box.
    this.commentSubmitted.emit(true);
  }

  /**
   * Passes the contents of the commentForm to the commentService to be
   *  submitted to the API. Upon success, the data is returned and added
   *  to the comments array.
   * @param  {Object}  form  contains the contens of the commentForm.
   * @param  {boolean} valid true if the contents of the commentForm are valid,
   *                          false otherwise.
   */
  submitComment(form: any, valid: boolean) {
    this.formSubmitted = true;

    if (valid) {
      if (!this.userLocalStorageService.authUser()) {
        this.userLocalStorageService.redirectToLogin();
      }
      
      let userId  : number  = this.userLocalStorageService.getUserId();
      let comment : string  = form.comment;

      // Reset the form
      this.commentForm.reset();
      this.formSubmitted = false;

      this.commentService.submitComment(this.submissionId, userId, comment).subscribe(
        comments => this.addComments(comments),
        err      => {
          console.log(err);
        }
      );
    }
  }
}
