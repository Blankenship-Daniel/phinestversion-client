import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../../../../../../Models/comment.model';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.css']
})
export class CommentBoxComponent implements OnInit {

  @Input() comment: Comment;
  
  constructor() { }

  ngOnInit() {
  }

}
