import { Component, OnInit, Input, HostListener } from '@angular/core';
import { UserRank } from '../../Models/userRank.model';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @HostListener('window:scroll', ['$event']) onScroll(ev) {
    if (!this.preventScroll) {
      var pageHeight = document.documentElement.scrollHeight;
      var scrollPos  = document.documentElement.clientHeight + window.pageYOffset;

      if (scrollPos === pageHeight) {
        this.offset += this.offsetAmount;
        this.loadUsers();
      }
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
   * An array of UserRank models which contains the data necessary to
   *  display leaderboard rankings.
   * @type {UserRank[]}
   */
  private users: UserRank[];

  private preventScroll: boolean;

  constructor(

    /**
     * Handles interactions with the API, specifically requests regarding
     *  the `users` table in the database.
     * @type {UserService}
     */
    private userService: UserService
  ) {
    this.offset = 0;
    this.offsetAmount = 20;
    this.preventScroll = false;
  }

  ngOnInit() {
    this.loadUsers();
  }

  /**
   * Sets the users array if it is undefined. Otherwise, it concatenates
   *  the new users onto the end of the existing users array.
   * @param  {UserRank[]} users an array of UserRank models which hold
   *                                     metadata for a given user.
   */
  addUsers(users: UserRank[]) {
    if (this.users === undefined) {
      this.users = users;
      return;
    }
    this.users.push.apply(this.users, users);
  }

  /**
   * Requests a batch of users from the database. The size of the batch returned
   *  is defined by the offsetAmount.
   */
  loadUsers() {
    this.userService.getUserRankings(this.offsetAmount, this.offset).subscribe(
      users => this.addUsers(users),
      err   => {
          console.log(err);
      }
    );
  }
}
