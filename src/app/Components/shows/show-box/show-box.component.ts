import { Component, OnInit, Input } from '@angular/core';
import { ShowRank } from '../../../Models/showRank.model';
import { ShaderService } from '../../../Services/shader.service';

@Component({
  selector: 'app-show-box',
  templateUrl: './show-box.component.html',
  styleUrls: ['./show-box.component.css']
})
export class ShowBoxComponent implements OnInit {

  @Input() show: ShowRank;
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
