import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, HostListener } from '@angular/core';
import { SongRank } from '../../Models/songRank.model';
import { SongService } from '../../Services/song.service';
import { Submission } from '../../Models/submission.model';
import { SubmissionService } from '../../Services/submission.service';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {

  @HostListener('window:scroll', ['$event']) onScroll(ev) {
    var pageHeight = document.documentElement.scrollHeight;
    var scrollPos  = document.documentElement.clientHeight + window.pageYOffset;

    if (scrollPos === pageHeight) {
      this.offset += this.offsetAmount;
      this.loadSubmissions(this.slug);
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
   * The score corresponding to a specific song.
   * @type {number}
   */
  private score: number;

  /**
   * Represents a URI friendly version of a song name. For example,
   *  `You Enjoy Myself` becomes `you-enjoy-myself`.
   * @type {string}
   */
  private slug: string;

  /**
   * An array of SongRank models which contains the data necessary to
   *  display song rankings.
   * @type {SongRank[]}
   */
  private songs: SongRank[];

  /**
   * Contains all song submissions corresponding to a given show date.
   * @type {Submission[]}
   */
  private submissions: Submission[];

  constructor(

    /**
     * Allows access to data passed through the URI.
     * @type {ActivatedRoute}
     */
    private route: ActivatedRoute,

    /**
     * Handles interactions with the API, specifically requests regarding
     *  the `songs` table in the database.
     * @type {SongService}
     */
    private songService: SongService,

    /**
     * Handles interactions with the API, specifically requests regarding
     *  the `submissions` table in the database.
     * @type {SubmissionService}
     */
    private submissionService: SubmissionService
  ) {
    this.offset = 0;
    this.offsetAmount = 20;
  }

  ngOnInit() {
    this.loadSongRank(this.slug);
    this.loadSubmissions(this.slug);
    this.slug = this.route.snapshot.params['slug'];
  }

  /**
   * Sets the submissions array if it is undefined. Otherwise, it concatenates
   *  the new submissions onto the end of the existing submissions array.
   * @param  {Submission[]} submissions an array of Submission models which hold
   *                                     metadata for a given submission.
   */
  addSubmissions(submissions: Submission[]) {
    if (this.submissions === undefined) {
      this.submissions = submissions;
      return;
    }
    this.submissions.push.apply(this.submissions, submissions);
  }

  /**
   * Sets the song score for a given song submission.
   * @param  {SongRank[]} songs an array of SongRank models which contains the
   *                             metadata concerning a song's rank.
   */
  handleSongRank(songs: SongRank[]) {
    this.songs = songs;
    for (var i = 0; i < songs.length; i++) {
      this.score = Number(songs[i].score);
    }
  }

  /**
   * Updates the song score depending on a vote change on a given song
   *  submission.
   * @param  {Event}  voteChange -1|1 representing the change in a given
   *                              submission's vote.
   */
  handleSongScoreChange(voteChange: Event) {
    this.score += Number(voteChange);
  }

  /**
   * Requests a given song's ranking based off of the song's slug.
   * @param  {string} slug the URI friendly version of a song name. For example,
   *                        `You Enjoy Myself` would be `you-enjoy-myself`.
   */
  loadSongRank(slug: string) {
    this.songService.getSongRanking(slug).subscribe(
      songs => this.handleSongRank(songs),
      err   => {
          console.log(err);
      }
    );
  }

  /**
   * Requests submissions corresponding to a given song based off of the song's
   *  slug.
   * @param  {string} slug the URI friendly version of a song name. For example,
   *                        `You Enjoy Myself` would be `you-enjoy-myself`.
   */
  loadSubmissions(slug: string) {
    this.submissionService.getSubmissionsBySongSlug(
        slug,
        this.offsetAmount,
        this.offset
      ).subscribe(
        submissions => this.addSubmissions(submissions),
        err         => {
          console.log(err);
      }
    );
  }
}
