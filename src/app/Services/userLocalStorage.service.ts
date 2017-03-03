import { Injectable } from '@angular/core';

@Injectable()
export class UserLocalStorageService {

  /**
   * An array of properties that the user object should have.
   * @type {string[]}
   */
  private props: string[];

  /**
   * An instance of the user object stored in localStorage.
   * @type {any}
   */
  private user: any;

  /**
   * Checks the user object from localStorage against a set
   *  of properties that should exist on the object.
   * @return {boolean} true if the user object from localStorage exists,
   *                         and all required properties exist on it, false
   *                         otherwise.
   */
  private hasProps() {
    if (this.user === null) {
      return false;
    }

    for (let i: number = 0; i < this.props.length; i++) {
      if (!this.user.hasOwnProperty(this.props[i])) {
        return false;
      }
    }

    return true;
  }

  constructor() {
    this.user   = JSON.parse(localStorage.getItem('user'));
    this.props  = [
      'id',
      'image',
      'username',
      'email',
      'created_at',
      'updated_at'
    ];
  }

  authUser() {
    return this.hasProps();
  }

  getUser() {
    return (this.authUser() ? this.user : null);
  }

  getUserId() {
    return this.user.id;
  }

  getUserName() {
    return this.user.username;
  }

  getUserImage() {
    return this.user.image;
  }

  redirectToLogin() {
    location.pathname = '/login';
  }
}
