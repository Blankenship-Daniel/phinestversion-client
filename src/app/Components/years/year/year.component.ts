import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { YearService } from '../../../Services/year.service';
import { ShowService } from '../../../Services/show.service';
import { YearRank } from '../../../Models/yearRank.model';
import { ShowRank } from '../../../Models/showRank.model';

@Component({
  selector: 'app-year',
  templateUrl: './year.component.html',
  styleUrls: ['./year.component.css']
})
export class YearComponent implements OnInit {
  private years: YearRank[];
  private shows: ShowRank[];

  constructor(
    private route: ActivatedRoute,
    private yearService: YearService,
    private showService: ShowService
  ) {
  }

  ngOnInit() {
    let year: string = this.route.snapshot.params['date'];
    this.loadYearRank(year);
    this.loadShows(year);
  }

  loadYearRank(year: string) {
    this.yearService.getYearRanking(year).subscribe(
      years => this.years = years,
      err   => {
          console.log(err);
      }
    );
  }

  loadShows(year: string) {
    this.showService.getShowRankingsByYear(year).subscribe(
      shows => this.shows = shows,
      err   => {
          console.log(err);
      }
    );
  }
}
