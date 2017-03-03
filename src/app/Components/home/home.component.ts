import { Component, OnInit } from '@angular/core';
import { ShowRank } from '../../Models/showRank.model';
import { ShowService } from '../../Services/show.service';
import { SongRank } from '../../Models/songRank.model';
import { SongService } from '../../Services/song.service';
import { UserRank } from '../../Models/userRank.model';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  /**
   * An array of ShowRank models which contains the data necessary to
   *  display show rankings.
   * @type {ShowRank[]}
   */
  private shows: ShowRank[];

  /**
   * An array of SongRank models which contains the data necessary to
   *  display song rankings.
   * @type {SongRank[]}
   */
  private songs: SongRank[];

  /**
   * An array of UserRank models which contains the data necessary to
   *  display leaderboard rankings.
   * @type {UserRank[]}
   */
  private users: UserRank[];

  /**
   * The number of rankings to load on the home page for each category.
   * @type {number}
   */
  private rankingsLimit: number;

  constructor(

    /**
     * Handles interactions with the API, specifically requests regarding
     *  the `shows` table in the database.
     * @type {ShowService}
     */
    private showService: ShowService,

    /**
     * Handles interactions with the API, specifically requests regarding
     *  the `songs` table in the database.
     * @type {SongService}
     */
    private songService: SongService,

    /**
     * Handles interactions with the API, specifically requests regarding
     *  the `users` table in the database.
     * @type {UserService}
     */
    private userService: UserService
  ) {
    this.rankingsLimit = 10;
  }

  ngOnInit() {
    this.loadShows();
    this.loadSongs();
    this.loadUsers();
  }

  /**
   * The showService returns an array of ShowRank models and assigns them to
   *  the shows variable.
   */
  loadShows() {
    this.showService.getShowRankings(this.rankingsLimit, 0).subscribe(
      shows => this.shows = shows,
      err   => {
          console.log(err);
      }
    );
  }

  /**
   * The songService returns an array of SongRank models and assigns them to
   *  the songs variable.
   */
  loadSongs() {
    this.songService.getSongRankings(this.rankingsLimit, 0).subscribe(
      songs => this.songs = songs,
      err   => {
          console.log(err);
      }
    );
  }

  /**
   * The userService returns an array of UserRank models and assigns them to
   *  the users variable.
   */
  loadUsers() {
    this.userService.getUserRankings(this.rankingsLimit, 0).subscribe(
      users => this.users = users,
      err   => {
          console.log(err);
      }
    );
  }
}
