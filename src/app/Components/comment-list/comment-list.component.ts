import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { CommentService } from '../../Services/comment.service';
import { Comment } from '../../Models/comment.model';



@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  @Input() submissionId: number;
  @Input() showComments: boolean;
  @Input() comments: Comment[];
  @Output() commentSubmitted: EventEmitter<boolean>;

  private offset: number = 0;
  private slug: string;
  private formSubmitted: boolean;
  private commentForm: FormGroup;

  constructor(
    private commentService: CommentService
  ) {
    this.formSubmitted = false;
    this.commentForm = new FormGroup({
        comment: new FormControl('', Validators.required)
    });
    this.commentSubmitted = new EventEmitter<boolean>();
  }

  ngOnInit() {
  }

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

  submitComment(form, valid) {
    this.formSubmitted = true;
    if (valid) {
      let user            = JSON.parse(localStorage.getItem('user'));
      let userId: number  = user.id;

      // TODO: user error handling

      let comment: string = form.comment;

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
