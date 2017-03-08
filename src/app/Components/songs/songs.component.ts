import { Component, OnInit, Input, HostListener } from '@angular/core';
import { SongRank } from '../../Models/songRank.model';
import { SongService } from '../../Services/song.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {

  @HostListener('window:scroll', ['$event']) onScroll(ev) {
    var pageHeight = document.documentElement.scrollHeight;
    var scrollPos  = document.documentElement.clientHeight + window.pageYOffset;

    if (scrollPos === pageHeight) {
      this.offset += this.offsetAmount;
      this.loadSongs();
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
   * Holds an array of models that hold metadata concerning a songs rank.
   * @type {SongRank[]}
   */
  private songs: SongRank[];

  constructor(

    /**
     * Handles interactions with the API, specifically requests regarding
     *  the `songs` table in the database.
     * @type {SongService}
     */
    private songService: SongService
  ) {
    this.offset = 0;
    this.offsetAmount = 20;
  }

  ngOnInit() {
    this.loadSongs();
  }

  /**
   * Sets the songs variable if it is undefined. Otherwise, it concatenates
   *  the requested songs onto the end of the existing songs array.
   * @param  {SongRank[]} songs
   */
  addSongs(songs: SongRank[]) {
    if (this.songs === undefined) {
      this.songs = songs;
      return;
    }
    this.songs.push.apply(this.songs, songs);
  }

  /**
   * Requests the top rated songs in the database.
   */
  loadSongs() {
    this.songService.getSongRankings(this.offsetAmount, this.offset).subscribe(
      songs => this.addSongs(songs),
      err   => {
          console.log(err);
      }
    );
  }
}
