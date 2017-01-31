import { Component, OnInit } from '@angular/core';
import { YearService } from '../../Services/year.service';
import { YearRank } from '../../Models/yearRank.model';

@Component({
  selector: 'app-years',
  templateUrl: './years.component.html',
  styleUrls: ['./years.component.css']
})
export class YearsComponent implements OnInit {

  private years: YearRank[];

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
