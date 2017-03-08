import { Comment } from '../../Models/comment.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.css']
})
export class CommentBoxComponent implements OnInit {

  /**
   * Holds the user comment.
   * @type {Comment}
   */
  @Input() comment: Comment;

  constructor() { }

  ngOnInit() {
  }
}
