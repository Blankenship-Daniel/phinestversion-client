import { Component, OnInit, Input } from '@angular/core';
import { ShowService } from '../../Services/show.service';
import { Show } from '../../Models/show.model';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css']
})
export class ShowsComponent implements OnInit {

  private shows: Show[];

  constructor(
    private showService: ShowService
  ) { }

  ngOnInit() {
    this.loadShows();
  }

  loadShows() {
    this.showService.getShows().subscribe(
      shows => this.shows = shows,
      err   => {
          console.log(err);
      }
    );
  }
}
