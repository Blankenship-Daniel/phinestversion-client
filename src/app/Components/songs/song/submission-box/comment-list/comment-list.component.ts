import { Component, OnInit, Input } from '@angular/core';

import { CommentService } from '../../../../../Services/comment.service';
import { Comment } from '../../../../../Models/comment.model';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  @Input() submissionId: number;
  @Input() showComments: boolean;
  @Input() comments: Comment[];

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
  }

  ngOnInit() {
  }

  addComments(comments: Comment[]) {
    if (this.comments === undefined) {
      this.comments = comments;
      return;
    }
    this.comments.push.apply(this.comments, comments);
  }

  submitComment(form, valid) {
    this.formSubmitted = true;
    if (valid) {
      let user            = JSON.parse(localStorage.getItem('user'));
      let userId: number  = user.id;
      let comment: string = form.comment;

      // reset the form
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
