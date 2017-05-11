import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SearchService } from '../../Services/search.service';
import { SongRank } from '../../Models/songRank.model';
import { ShowRank } from '../../Models/showRank.model';
import { YearRank } from '../../Models/yearRank.model';
import { UserRank } from '../../Models/userRank.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Input() searchType: string;

  @Output() searchResults: EventEmitter<any>;

  @Output() preventLoadingOnScroll: EventEmitter<boolean>;

  constructor(
    private searchService: SearchService
  ) {
    this.searchResults = new EventEmitter();
    this.preventLoadingOnScroll = new EventEmitter();
  }

  ngOnInit() {
    this.preventLoadingOnScroll.emit(false);
  }

  search(event: any) {
    let val: string = event.target.value;
    if (val === '') {
      this.preventLoadingOnScroll.emit(false);
    } else {
      this.preventLoadingOnScroll.emit(true);
    }

    switch (this.searchType.toLowerCase()) {
      case 'songs':
        this.searchService.searchSongs(val).subscribe(
          songs => this.searchResults.emit(songs),
          err   => {
            console.log(err);
          }
        );
        break;
      case 'shows':
        this.searchService.searchShows(val).subscribe(
          shows => this.searchResults.emit(shows),
          err   => {
            console.log(err);
          }
        );
        break;
      case 'years':
        this.searchService.searchYears(val).subscribe(
          years => this.searchResults.emit(years),
          err   => {
            console.log(err);
          }
        );
        break;
      case 'users':
        this.searchService.searchUsers(val).subscribe(
          users => this.searchResults.emit(users),
          err   => {
            console.log(err);
          }
        );
        break;
    }
  }
}
