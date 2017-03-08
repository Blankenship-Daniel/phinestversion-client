import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, HostListener } from '@angular/core';
import { ShowRank } from '../../Models/showRank.model';
import { ShowService } from '../../Services/show.service';
import { Submission } from '../../Models/submission.model';
import { SubmissionService } from '../../Services/submission.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  /**
   * The date of a given show e.g. 12/31/1995
   * @type {string}
   */
  private date: string;

  /**
   * The score for a given show.
   * @type {number}
   */
  private score: number;

  /**
   * Contains metadata for a given show date such as the show score.
   * @type {ShowRank[]}
   */
  private shows: ShowRank[];

  /**
   * Contains all song submissions corresponding to a given show date.
   * @type {Submission[]}
   */
  private submissions: Submission[];

  constructor(

    /**
     * Allows access to data passed through the URI.
     * @type {ActivatedRoute}
     */
    private route: ActivatedRoute,

    /**
     * Handles interactions with the API, specifically requests regarding
     *  the `shows` table in the database.
     * @type {ShowService}
     */
    private showService: ShowService,

    /**
     * Handles interactions with the API, specifically requests regarding
     *  the `submissions` table in the database.
     * @type {SubmissionService}
     */
    private submissionService: SubmissionService
  ) {
  }

  ngOnInit() {
    this.date = this.route.snapshot.params['date'];
    this.loadShowRank(this.date);
    this.loadSubmissions(this.date);
  }

  /**
   * Parses the show score from the ShowRank model.
   * @param  {ShowRank[]} shows the model containing metadata concerning a shows
   *                             rank.
   */
  handleShowRank(shows: ShowRank[]) {
    this.shows = shows;
    for (var i = 0; i < shows.length; i++) {
      this.score = Number(shows[i].score);
    }
  }

  /**
   * Handles the event when the vote changes for a given submission.
   * @param  {Event}  voteChange -1|1 number reflecting the change in a
   *                              submission's vote.
   */
  handleShowScoreChange(voteChange: Event) {
    this.score += Number(voteChange);
  }

  /**
   * Retrieves the rankings for a given show on a specific date.
   * @param  {string} date represents a given show date in the following format:
   *                        12/31/1995.
   */
  loadShowRank(date: string) {
    this.showService.getShowRankingByDate(date).subscribe(
      shows => this.handleShowRank(shows),
      err   => {
          console.log(err);
      }
    );
  }

  /**
   * Retrieves the submissions corresponding to a show on a given date.
   * @param  {string} date represents a given show date in the following format:
   *                        12/31/1995.
   */
  loadSubmissions(date: string) {
    this.submissionService.getSubmissionsByShowDate(date).subscribe(
      submissions => this.submissions = submissions,
      err   => {
          console.log(err);
      }
    );
  }
}
