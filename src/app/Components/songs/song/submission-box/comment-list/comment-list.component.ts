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
  @Input() commentsLength: number;
  @Input() comments: Comment[];

  private offset: number = 0;
  private slug: string;

  constructor() { }

  ngOnInit() {
  }
}
