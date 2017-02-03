import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SongService } from '../../../Services/song.service';
import { SubmissionService } from '../../../Services/submission.service';
import { SongRank } from '../../../Models/songRank.model';
import { Submission } from '../../../Models/submission.model';

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
      this.offset += 20;
      this.loadSubmissions(this.slug);
    }
  }

  private songs: SongRank[];
  private submissions: Submission[];
  private offset: number = 0;
  private slug: string;

  constructor(
    private route: ActivatedRoute,
    private songService: SongService,
    private submissionService: SubmissionService
  ) {
  }

  ngOnInit() {
    this.slug = this.route.snapshot.params['slug'];
    this.loadSongRank(this.slug);
    this.loadSubmissions(this.slug);
  }

  loadSongRank(slug: string) {
    this.songService.getSongRanking(slug).subscribe(
      songs => this.songs = songs,
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

  loadSubmissions(slug: string) {
    this.submissionService.getSubmissionsBySongSlug(slug, 20, this.offset).subscribe(
      submissions => this.addSubmissions(submissions),
      err   => {
          console.log(err);
      }
    );
  }
}
