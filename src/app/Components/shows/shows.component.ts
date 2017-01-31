import { Component, OnInit, Input } from '@angular/core';
import { ShowService } from '../../Services/show.service';
import { ShowRank } from '../../Models/showRank.model';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css']
})
export class ShowsComponent implements OnInit {

  private shows: ShowRank[];

  constructor(
    private showService: ShowService
  ) { }

  ngOnInit() {
    this.loadShows();
  }

  loadShows() {
    this.showService.getShowRankings().subscribe(
      shows => this.shows = shows,
      err   => {
          console.log(err);
      }
    );
  }
}
