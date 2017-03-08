import { Component, OnInit, Input, HostListener } from '@angular/core';
import { ShowRank } from '../../Models/showRank.model';
import { ShowService } from '../../Services/show.service';

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
      this.offset += this.offsetAmount;
      this.loadShows();
    }
  }

  /**
   * Corresponds to the starting point at which to request songs from the
   *  database.
   * @type {number}
   */
  private offset: number;

  /**
   * Represents how many songs request at a given time.
   * @type {number}
   */
  private offsetAmount: number;

  /**
   * An array of ShowRank models which contains the data necessary to
   *  display show rankings.
   * @type {ShowRank[]}
   */
  private shows: ShowRank[];

  constructor(

    /**
     * Handles interactions with the API, specifically requests regarding
     *  the `shows` table in the database.
     * @type {ShowService}
     */
    private showService: ShowService
  ) {
    this.offset = 0;
    this.offsetAmount = 20;
  }

  ngOnInit() {
    this.loadShows();
  }

  /**
   * Sets the shows variable if it is undefined. Otherwise, it concatenates
   *  the requested shows onto the end of the existing shows array.
   * @param  {ShowRank[]} songs
   */
  addShows(shows: ShowRank[]) {
    if (this.shows === undefined) {
      this.shows = shows;
      return;
    }
    this.shows.push.apply(this.shows, shows);
  }

  /**
   * Requests a batch of ranked shows. The size of the batch is defined by the
   *  offsetAmount. The offset defines where to begin the beginning of the batch.
   */
  loadShows() {
    this.showService.getShowRankings(this.offsetAmount, this.offset).subscribe(
      shows => this.addShows(shows),
      err   => {
          console.log(err);
      }
    );
  }
}
