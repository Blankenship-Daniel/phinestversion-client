import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShowService } from '../../../Services/show.service';
import { SubmissionService } from '../../../Services/submission.service';
import { ShowRank } from '../../../Models/showRank.model';
import { Submission } from '../../../Models/submission.model';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  private shows: ShowRank[];
  private submissions: Submission[];
  private date: string;

  constructor(
    private route: ActivatedRoute,
    private showService: ShowService,
    private submissionService: SubmissionService
  ) {
  }

  ngOnInit() {
    this.date = this.route.snapshot.params['date'];
    this.loadShowRank(this.date);
    this.loadSubmissions(this.date);
  }

  loadShowRank(date: string) {
    this.showService.getShowRankingByDate(date).subscribe(
      shows => this.shows = shows,
      err   => {
          console.log(err);
      }
    );
  }

  loadSubmissions(date: string) {
    this.submissionService.getSubmissionsByShowDate(date).subscribe(
      submissions => this.submissions = submissions,
      err   => {
          console.log(err);
      }
    );
  }
}
