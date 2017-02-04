import { Component, OnInit, Input } from '@angular/core';
import { Submission } from '../../../../Models/submission.model';
import { ShaderService } from '../../../../Services/shader.service';

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

    constructor(
      private shader: ShaderService
    ) { }

    ngOnInit() {
    }

    getShade(): number {
      return this.shader.getShade(this.index);
    }
}
