import { Component, OnInit } from '@angular/core';
import * as api from '../../../environments/api.config';
import { UserLocalStorageService } from '../../Services/userLocalStorage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  /**
   * Indicates whether whether the dropdown menu is visible or not.
   * @type {boolean}
   */
  private dropdownMenuIsVisible: boolean;

  /**
   * The endpoint for the api.
   * @type {string}
   */
  private imageApi: string;

  /**
   * Contains the user data returned from localStorage.
   * @type {any}
   */
  private user: any;

  constructor(

    /**
     * Handles interactions with the user object stored in localStorage.
     * @type {UserLocalStorageService}
     */
    private userLocalStorageService: UserLocalStorageService
  ) {
    this.dropdownMenuIsVisible = false;
    this.imageApi = api.BASE_URL;
    this.user = this.userLocalStorageService.getUser();
  }

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem('pv-user');
    location.pathname = '/';
  }

  /**
   * Navigates the browser to a given user's page which displays
   *  all of their submissions ranked.
   * @param  {string} username the logged in users username.
   */
  navigateToUser(username: string) {
    location.pathname = '/users/' + username;
  }

  toggleHamburgerMenu() {
    this.dropdownMenuIsVisible = !this.dropdownMenuIsVisible;
  }
}
