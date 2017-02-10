import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../Services/user.service';
import { SubmissionService } from '../../../Services/submission.service';
import { UserRank } from '../../../Models/userRank.model';
import { Submission } from '../../../Models/submission.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @HostListener('window:scroll', ['$event']) onScroll(ev) {
    var pageHeight = document.documentElement.scrollHeight;
    var scrollPos  = document.documentElement.clientHeight + window.pageYOffset;

    if (scrollPos === pageHeight) {
      this.offset += 20;
      this.loadSubmissions(this.username);
    }
  }

  private users: UserRank[];
  private submissions: Submission[];
  private offset: number = 0;
  private username: string;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private submissionService: SubmissionService
  ) {
  }

  ngOnInit() {
    this.username = this.route.snapshot.params['username'];
    this.loadUser(this.username);
    this.loadSubmissions(this.username);
  }

  loadUser(username: string) {
    this.userService.getUserByUserName(username).subscribe(
      users => this.users = users,
      err   => {
          console.log(err);
      }
    );
  }

  addSubmissions(submissions: Submission[]) {
    if (this.submissions === undefined) {
      this.submissions = submissions;
      return;
    }
    this.submissions.push.apply(this.submissions, submissions);
  }

  loadSubmissions(username: string) {
    this.submissionService.getSubmissionsByUserName(username, 20, this.offset).subscribe(
      submissions => this.addSubmissions(submissions),
      err   => {
          console.log(err);
      }
    );
  }
}
