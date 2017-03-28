import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ShowRank } from '../../Models/showRank.model';
import { ShowService } from '../../Services/show.service';
import { YearRank } from '../../Models/yearRank.model';
import { YearService } from '../../Services/year.service';

@Component({
  selector: 'app-year',
  templateUrl: './year.component.html',
  styleUrls: ['./year.component.css']
})
export class YearComponent implements OnInit {

  /**
   * The score for a given year.
   * @type {number}
   */
  private score: number;

  /**
   * An array of ShowRank models which contains the data necessary to
   *  display show rankings.
   * @type {ShowRank[]}
   */
  private shows: ShowRank[];

  /**
   * An array of YearRank models which contains the data necessary to
   *  display year rankings.
   * @type {YearRank[]}
   */
  private years: YearRank[];

  constructor(

    /**
     * Allows the component to access data passed through the URL
     * @type {ActivatedRoute}
     */
    private route: ActivatedRoute,

    /**
     * Handles interactions with the API, specifically requests regarding
     *  the `years` table in the database.
     * @type {YearService}
     */
    private yearService: YearService,

    /**
     * Handles interactions with the API, specifically requests regarding
     *  the `shows` table in the database.
     * @type {ShowService}
     */
    private showService: ShowService
  ) {
  }

  ngOnInit() {
    let year: string = this.route.snapshot.params['date'];
    this.loadYearRank(year);
    this.loadShows(year);
  }

  /**
   * Parses the year score from the YearRank model.
   * @param  {YearRank[]} shows the model containing metadata concerning a years
   *                             rank.
   */
  handleYearRank(years: YearRank[]) {
    this.years = years;
    for (var i = 0; i < years.length; i++) {
      this.score = Number(years[i].year_score);
    }
  }

  /**
   * Returns the metadata for a given year including the score for a given year.
   * @param  {string} year a string representing a given year. For example, 1997.
   */
  loadYearRank(year: string) {
    this.yearService.getYearRanking(year).subscribe(
      years => this.handleYearRank(years),
      err   => {
          console.log(err);
      }
    );
  }

  /**
   * Returns an array of all of the available shows ranked corresponding to a
   *  given year.
   * @param  {string} year a string representing a given year. For example, 1997.
   */
  loadShows(year: string) {
    this.showService.getShowRankingsByYear(year).subscribe(
      shows => this.shows = shows,
      err   => {
          console.log(err);
      }
    );
  }
}
