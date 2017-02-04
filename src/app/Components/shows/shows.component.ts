import { Component, OnInit, Input, HostListener } from '@angular/core';
import { ShowService } from '../../Services/show.service';
import { ShowRank } from '../../Models/showRank.model';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css']
})
export class ShowsComponent implements OnInit {
  
  @HostListener('window:scroll', ['$event']) onScroll(ev) {
    var pageHeight = document.documentElement.scrollHeight;
    var scrollPos  = document.documentElement.clientHeight + window.pageYOffset;

    if (scrollPos === pageHeight) {
      this.offset += 20;
      this.loadShows();
    }
  }

  private shows: ShowRank[];
  private offset: number = 0;

  constructor(
    private showService: ShowService
  ) { }

  ngOnInit() {
    this.loadShows();
  }

  addShows(shows: ShowRank[]) {
    if (this.shows === undefined) {
      this.shows = shows;
      return;
    }
    this.shows.push.apply(this.shows, shows);
  }

  loadShows() {
    this.showService.getShowRankings(20, this.offset).subscribe(
      shows => this.addShows(shows),
      err   => {
          console.log(err);
      }
    );
  }
}
