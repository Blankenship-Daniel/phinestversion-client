import { Component, OnInit, Input } from '@angular/core';
import { ShaderService } from '../../Services/shader.service';
import { UserRank } from '../../Models/userRank.model';

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
  styleUrls: ['./user-box.component.css']
})
export class UserBoxComponent implements OnInit {

  /**
   * Passed to the shader service. Changes the text color depending on the
   *  index number.
   * @type {number}
   */
  @Input() index: number;

  /**
   * Model containing the metadata for a given user along with a given user's
   *  score.
   * @type {UserRank}
   */
  @Input() user: UserRank;

  constructor(

    /**
     * Gets the shade number that corresponds to a color class such as
     *  grey700-bg.
     * @type {ShaderService}
     */
    private shader: ShaderService,
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
