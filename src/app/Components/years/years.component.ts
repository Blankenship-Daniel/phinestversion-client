import { Component, OnInit } from '@angular/core';
import { YearRank } from '../../Models/yearRank.model';
import { YearService } from '../../Services/year.service';

@Component({
  selector: 'app-years',
  templateUrl: './years.component.html',
  styleUrls: ['./years.component.css']
})
export class YearsComponent implements OnInit {

  /**
   * An array of models containing metadata for a given year including the year
   *  ranking.
   * @type {YearRank[]}
   */
  private years: YearRank[];

  constructor(

    /**
     * Handles interactions with the API, specifically requests regarding
     *  the `years` table in the database.
     * @type {YearService}
     */
    private yearService: YearService
  ) { }

  ngOnInit() {
    this.loadYearRankings();
  }

  /**
   * The yearService returns an array of YearRank models and assigns them to
   *  the years variable.
   */
  loadYearRankings() {
    this.yearService.getYearRankings().subscribe(
      years => this.years = years,
      err   => {
          console.log(err);
      }
    );
  }
}
