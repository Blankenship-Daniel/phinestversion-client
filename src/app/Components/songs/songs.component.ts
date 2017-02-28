import { Component, OnInit, Input, HostListener } from '@angular/core';

import { SongService } from '../../Services/song.service';
import { SongRank } from '../../Models/songRank.model';

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
      this.offset += 20;
      this.loadSongs();
    }
  }

  private songs: SongRank[];
  private offset: number = 0;

  constructor(
    private songService: SongService
  ) { }

  ngOnInit() {
    this.loadSongs();
  }

  addSongs(songs: SongRank[]) {
    if (this.songs === undefined) {
      this.songs = songs;
      return;
    }
    this.songs.push.apply(this.songs, songs);
  }

  loadSongs() {
    this.songService.getSongRankings(20, this.offset).subscribe(
      songs => this.addSongs(songs),
      err   => {
          console.log(err);
      }
    );
  }
}
