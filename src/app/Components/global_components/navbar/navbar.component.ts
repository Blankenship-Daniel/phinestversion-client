import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  private isVisible: boolean = false;

  ngOnInit() {
  }

  showSearch() {
    this.isVisible = !this.isVisible;
  }
}
