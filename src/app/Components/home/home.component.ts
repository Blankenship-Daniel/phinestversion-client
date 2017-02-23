import { Component, OnInit } from '@angular/core';
import { ShowService } from '../../Services/show.service';
import { SongService } from '../../Services/song.service';
import { UserService } from '../../Services/user.service';
import { ShowRank } from '../../Models/showRank.model';
import { SongRank } from '../../Models/songRank.model';
import { UserRank } from '../../Models/userRank.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private shows: ShowRank[];
  private songs: SongRank[];
  private users: UserRank[];

  constructor(
    private showService: ShowService,
    private songService: SongService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.loadShows();
    this.loadSongs();
    this.loadUsers();
  }

  loadShows() {
    this.showService.getShowRankings(10, 0).subscribe(
      shows => this.shows = shows,
      err   => {
          console.log(err);
      }
    );
  }

  loadSongs() {
    this.songService.getSongRankings(10, 0).subscribe(
      songs => this.songs = songs,
      err   => {
          console.log(err);
      }
    );
  }

  loadUsers() {
    this.userService.getUserRankings(10, 0).subscribe(
      users => this.users = users,
      err   => {
          console.log(err);
      }
    );
  }
}
