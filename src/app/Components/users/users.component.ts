import { Component, OnInit, Input, HostListener } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { UserRank } from '../../Models/userRank.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @HostListener('window:scroll', ['$event']) onScroll(ev) {
    var pageHeight = document.documentElement.scrollHeight;
    var scrollPos  = document.documentElement.clientHeight + window.pageYOffset;

    if (scrollPos === pageHeight) {
      this.offset += 20;
      this.loadUsers();
    }
  }

  private users: UserRank[];
  private offset: number = 0;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  addUsers(users: UserRank[]) {
    if (this.users === undefined) {
      this.users = users;
      return;
    }
    this.users.push.apply(this.users, users);
  }

  loadUsers() {
    this.userService.getUserRankings(20, this.offset).subscribe(
      users => this.addUsers(users),
      err   => {
          console.log(err);
      }
    );
  }
}
