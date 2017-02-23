import { Component, OnInit } from '@angular/core';
import { User } from '../../../Models/user.model';
import { Router } from '@angular/router';
import { SongService } from '../../../Services/song.service';
import { Song } from '../../../Models/song.model';
import { ShowService } from '../../../Services/show.service';
import { Show } from '../../../Models/show.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private user: User;
  private songs: Song[];
  private shows: Show[];

  constructor(
    private router: Router,
    private songService: SongService,
    private showService: ShowService
  ) {
    this.user = null;
  }

  private searchIsVisible: boolean = false;
  private submitIsVisible: boolean = false;

  ngOnInit() {
    if (localStorage.getItem('user') !== null) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
    this.loadSongs();
    this.loadShows();
  }

  navigateToUser(username) {
    location.pathname = '/users/' + username;
  }

  showSubmitAVersion() {
    this.submitIsVisible = !this.submitIsVisible;
  }

  showSearch() {
    this.searchIsVisible = !this.searchIsVisible;
  }

  loadSongs() {
    this.songService.getAllSongs().subscribe(
      songs => this.songs = songs,
      err   => {
          console.log(err);
      }
    );
  }

  loadShows() {
    this.showService.getAllShows().subscribe(
      shows => this.shows = shows,
      err   => {
          console.log(err);
      }
    );
  }
}
