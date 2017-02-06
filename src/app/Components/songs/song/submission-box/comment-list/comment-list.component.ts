import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '../../../../../Services/comment.service';
import { Comment } from '../../../../../Models/comment.model';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  @Input() submissionId: number;
  @Input() showComments: boolean;

  private comments: Comment[];
  private offset: number = 0;
  private slug: string;

  constructor(
    private commentService: CommentService
  ) { }

  ngOnInit() {
    this.loadComments();
  }

  loadComments() {
    this.commentService.getCommentsBySubmissionId(this.submissionId, 0, 0).subscribe(
      comments => this.comments = comments,
      err   => {
          console.log(err);
      }
    );
  }
}
