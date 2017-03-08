import { Component, OnInit, Input } from '@angular/core';
import { ShaderService } from '../../Services/shader.service';
import { YearRank } from '../../Models/yearRank.model';

@Component({
  selector: 'app-year-box',
  templateUrl: './year-box.component.html',
  styleUrls: ['./year-box.component.css']
})
export class YearBoxComponent implements OnInit {

  /**
   * Passed to the shader service. Changes the text color depending on the
   *  index number.
   * @type {number}
   */
  @Input() index: number;

  /**
   * The model containing metadata for a given year including the show ranking.
   * @type {YearRank}
   */
  @Input() year: YearRank;

  constructor(

    /**
     * Gets the shade number that corresponds to a color class such as grey700-bg.
     * @type {ShaderService}
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
