import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-heading-panel',
  templateUrl: './heading-panel.component.html',
  styleUrls: ['./heading-panel.component.css']
})
export class HeadingPanelComponent implements OnInit {

  @Input() image: string;

  constructor() {

  }

  ngOnInit() {

  }

}
