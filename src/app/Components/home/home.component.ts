import { Component, OnInit } from '@angular/core';
import { ShowRank } from '../../Models/showRank.model';
import { ShowService } from '../../Services/show.service';
import { SongRank } from '../../Models/songRank.model';
import { SongService } from '../../Services/song.service';
import { UserRank } from '../../Models/userRank.model';
import { UserService } from '../../Services/user.service';
import { CommentRecent } from '../../Models/commentRecent.model';
import { CommentService } from '../../Services/comment.service';
import { SubmissionRecent } from '../../Models/submissionRecent.model';
import { SubmissionService } from '../../Services/submission.service';
import { ShaderService } from '../../Services/shader.service';

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
   * Gets the most recent comments from the database.
   * @type {CommentRecent[]}
   */
  private comments: CommentRecent[];

  /**
   * Gets the most recent submission from the database.
   * @type {SubmissionRecent[]}
   */
  private submissions: SubmissionRecent[];

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
    private userService: UserService,

    /**
     * Handles requests to the API and returns data from the `comments`
     *  table.
     * @type {CommentService}
     */
    private commentService: CommentService,

    /**
     * Handles interactions with the API, specifically requests regarding
     *  the `submissions` table in the database.
     * @type {SubmissionService}
     */
    private submissionService: SubmissionService,

    /**
     * Gets the shade number that corresponds to a color class such as
     *  grey700-bg.
     * @type {ShaderService}
     */
    private shader: ShaderService
  ) {
    this.rankingsLimit = 5;
  }

  ngOnInit() {
    this.loadComments();
    this.loadShows();
    this.loadSongs();
    this.loadSubmissions();
    this.loadUsers();
  }

  getShade(index: number) : number {
    console.log(index);
    return this.shader.getShade(index);
  }

  loadComments() {
    this.commentService.getRecentComments().subscribe(
      comments => this.comments = comments,
      err      => {
        console.log(err);
      }
    );
  }

  loadShows() {
    this.showService.getShowRankings(this.rankingsLimit, 0).subscribe(
      shows => this.shows = shows,
      err   => {
        console.log(err);
      }
    );
  }

  loadSongs() {
    this.songService.getSongRankings(this.rankingsLimit, 0).subscribe(
      songs => this.songs = songs,
      err   => {
        console.log(err);
      }
    );
  }

  loadSubmissions() {
    this.submissionService.getRecentSubmissions().subscribe(
      submissions => this.submissions = submissions,
      err         => {
        console.log(err);
      }
    )
  }

  loadUsers() {
    this.userService.getUserRankings(this.rankingsLimit, 0).subscribe(
      users => this.users = users,
      err   => {
        console.log(err);
      }
    );
  }
}
