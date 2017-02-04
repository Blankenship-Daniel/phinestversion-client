import { Component, OnInit, Input } from '@angular/core';
import { SongRank } from '../../../Models/songRank.model';
import { ShaderService } from '../../../Services/shader.service';

@Component({
  selector: 'app-song-box',
  templateUrl: './song-box.component.html',
  styleUrls: ['./song-box.component.css']
})
export class SongBoxComponent implements OnInit {

  @Input() song: SongRank;
  @Input() index: number;

  constructor(
    private shader: ShaderService
  ) { }

  ngOnInit() {
  }

  getShade(): number {
    return this.shader.getShade(this.index);
  }
}
