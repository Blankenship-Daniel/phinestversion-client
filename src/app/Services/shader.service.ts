import { Injectable } from '@angular/core';

@Injectable()
export class ShaderService {

  /**
   * Allows a shade value to be accessed at a given index.
   * @type {Object}
   */
  private shades: Object = {
    0: 700,
    1: 600,
    2: 500,
    3: 300,
    4: 200
  };

  constructor() { }

  /**
   * Gets the shade number that corresponds to a color class such as grey700-bg.
   * @param  {number} index the index number of a given submission. For example, index
   *                          index of 0 returns the number 700.
   * @return {number} the shade number.
   */
  getShade(index: number): number {
    return this.shades.hasOwnProperty(index) ?
           this.shades[index] : 100;
  }
}
