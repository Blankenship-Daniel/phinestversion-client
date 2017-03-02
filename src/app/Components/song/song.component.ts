import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SongService } from '../../Services/song.service';
import { SubmissionService } from '../../Services/submission.service';
import { SongRank } from '../../Models/songRank.model';
import { Submission } from '../../Models/submission.model';

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

  private score       : number;
  private slug        : string;
  private offset      : number;
  private songs       : SongRank[];
  private submissions : Submission[];

  constructor(
    private route: ActivatedRoute,
    private songService: SongService,
    private submissionService: SubmissionService
  ) {
    this.offset = 0;
  }

  ngOnInit() {
    this.slug = this.route.snapshot.params['slug'];
    this.loadSongRank(this.slug);
    this.loadSubmissions(this.slug);
  }

  handleSongScoreChange(voteChange: Event) {
    this.score += Number(voteChange);
  }

  handleSongRank(songs: SongRank[]) {
    this.songs = songs;
    for (var i = 0; i < songs.length; i++) {
      this.score = Number(songs[i].score);
    }
  }

  loadSongRank(slug: string) {
    this.songService.getSongRanking(slug).subscribe(
      songs => this.handleSongRank(songs),
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
