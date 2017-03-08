import { Component, OnInit, Input } from '@angular/core';
import { ShaderService } from '../../Services/shader.service';
import { SongRank } from '../../Models/songRank.model';

@Component({
  selector: 'app-song-box',
  templateUrl: './song-box.component.html',
  styleUrls: ['./song-box.component.css']
})
export class SongBoxComponent implements OnInit {

  /**
   * Passed to the shader service. Changes the text color depending on the
   *  index number.
   * @type {number}
   */
  @Input() index: number;

  /**
   * Holds the metadata for a given song concerning the song's score.
   * @type {SongRank}
   */
  @Input() song: SongRank;

  constructor(

    /**
     * Gets the shade number that corresponds to a color class such as grey700-bg.
     * @type {number}
     */
    private shader: ShaderService
  ) { }

  ngOnInit() {
  }

  /**
   * Gets the shade number that corresponds to a color class such as grey700-bg.
   * @return {number} the shade number.
   */
  getShade(): number {
    return this.shader.getShade(this.index);
  }
}
