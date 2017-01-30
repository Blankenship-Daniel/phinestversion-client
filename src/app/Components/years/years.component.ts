import { Component, OnInit } from '@angular/core';

// Services
import { YearService } from '../../Services/year.service';

// Models
import { YearRank } from '../../Models/yearRank.model';

@Component({
  selector: 'app-years',
  templateUrl: './years.component.html',
  styleUrls: ['./years.component.css']
})
export class YearsComponent implements OnInit {

  years: YearRank[];

  constructor(
    private yearService: YearService
  ) { }

  ngOnInit() {
    this.loadYearRankings();
  }

  loadYearRankings() {
    this.yearService.getYearRankings().subscribe(
      years => this.years = years,
      err   => {
          console.log(err);
      }
    );
  }
}
