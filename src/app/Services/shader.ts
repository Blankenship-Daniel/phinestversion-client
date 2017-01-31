export class Shader {

  private shades: Object = {
    0: 700,
    1: 600,
    2: 500,
    3: 300,
    4: 200
  };

  constructor() { }

  getShade(index: number): number {
    return this.shades.hasOwnProperty(index) ?
           this.shades[index] : 100;
  }
}
