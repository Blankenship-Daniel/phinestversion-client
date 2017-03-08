import { Component, OnInit, Input } from '@angular/core';
import { ShaderService } from '../../Services/shader.service';
import { ShowRank } from '../../Models/showRank.model';

@Component({
  selector: 'app-show-box',
  templateUrl: './show-box.component.html',
  styleUrls: ['./show-box.component.css']
})
export class ShowBoxComponent implements OnInit {

  /**
   * Passed to the shader service. Changes the text color depending on the
   *  index number.
   * @type {number}
   */
  @Input() index: number;

  /**
   * Contains the metadata for a given show date concerning the shows score.
   * @type {ShowRank}
   */
  @Input() show: ShowRank;

  constructor(

    /**
     * Gets the shade number that corresponds to a color class such as
     *  grey700-bg.
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
