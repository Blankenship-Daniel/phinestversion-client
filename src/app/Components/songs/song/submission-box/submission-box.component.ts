import { Component, OnInit, Input } from '@angular/core';
import { Submission } from '../../../../Models/submission.model';
import { Shader } from '../../../../Services/shader';

@Component({
  selector: 'app-submission-box',
  templateUrl: './submission-box.component.html',
  styleUrls: ['./submission-box.component.css']
})
export class SubmissionBoxComponent implements OnInit {

    @Input() submission: Submission;
    @Input() index: number;

    constructor(
      private shader: Shader
    ) { }

    ngOnInit() {
    }

    getShade(): number {
      return this.shader.getShade(this.index);
    }
}
