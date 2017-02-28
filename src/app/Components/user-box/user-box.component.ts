import { Component, OnInit, Input } from '@angular/core';

import { ShaderService } from '../../Services/shader.service';
import { UserRank } from '../../Models/userRank.model';

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
  styleUrls: ['./user-box.component.css']
})
export class UserBoxComponent implements OnInit {

  @Input() user: UserRank;
  @Input() index: number;

  constructor(
    private shader: ShaderService,
  ) { }

  ngOnInit() {
  }

  getShade(): number {
    return this.shader.getShade(this.index);
  }
}
