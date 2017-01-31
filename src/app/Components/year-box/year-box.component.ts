import { Component, OnInit, Input } from '@angular/core';
import { YearRank } from '../../Models/yearRank.model';

@Component({
  selector: 'app-year-box',
  templateUrl: './year-box.component.html',
  styleUrls: ['./year-box.component.css']
})
export class YearBoxComponent implements OnInit {

  @Input() year: YearRank;
  @Input() index: number;

  private shades: Object = {
    0: 700,
    1: 600,
    2: 500,
    3: 300,
    4: 200
  };

  constructor() {  }

  ngOnInit() {
  }

  clicked() {
    console.log('clicked');
  }

  getShade(): number {
    return this.shades.hasOwnProperty(this.index) ?
           this.shades[this.index] : 100;
  }
}
