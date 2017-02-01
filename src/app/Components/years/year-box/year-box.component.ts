import { Component, OnInit, Input } from '@angular/core';
import { YearRank } from '../../../Models/yearRank.model';
import { Shader } from '../../../Services/shader';

@Component({
  selector: 'app-year-box',
  templateUrl: './year-box.component.html',
  styleUrls: ['./year-box.component.css']
})
export class YearBoxComponent implements OnInit {

  @Input() year: YearRank;
  @Input() index: number;

  constructor(
    private shader: Shader
  ) { }

  ngOnInit() {
  }

  clicked() {
    console.log('clicked');
  }

  getShade(): number {
    return this.shader.getShade(this.index);
  }
}
