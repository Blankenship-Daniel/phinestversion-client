import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Submission } from '../../../../Models/submission.model';
import { ShaderService } from '../../../../Services/shader.service';
import { CommentService } from '../../../../Services/comment.service';
import { Comment } from '../../../../Models/comment.model';

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
  private showComments: boolean = false;
  private offset: number = 0;

  constructor(
    private shader: ShaderService,
    private commentService: CommentService
  ) { }

  ngOnInit() {
    this.loadComments();
  }

  toggleComments() {
    this.showComments = !this.showComments;
  }

  getShade(): number {
    return this.shader.getShade(this.index);
  }

  addComments(comments: Comment[]) {
    if (this.comments === undefined) {
      this.comments = comments;
      return;
    }
    this.comments.push.apply(this.comments, comments);
  }

  loadComments() {
    this.commentService.getCommentsBySubmissionId(this.submission.submission_id, 20, this.offset).subscribe(
      comments => this.addComments(comments),
      err      => {
          console.log(err);
      }
    );
  }
}
