import { Component, OnInit, Input } from '@angular/core';
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

    loadComments() {
      this.commentService.getCommentsBySubmissionId(this.submission.submission_id, 0, 0).subscribe(
        comments => this.comments = comments,
        err      => {
            console.log(err);
        }
      );
    }
}
