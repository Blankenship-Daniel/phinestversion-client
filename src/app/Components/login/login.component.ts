import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../Models/user.model';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /**
   * Holds the form data, and the patterns required to validate the
   *  data.
   * @type {FormGroup}
   */
  private form: FormGroup;

  /**
   * Indicates whether the form has been submitted or not.
   * @type {boolean} true if the form has been submitted, false otherwise.
   */
  private formSubmitted: boolean;

  /**
   * The user data that has been validated against the user data stored in
   *  the database.
   * @type {User[]}
   */
  private users: User[];

  constructor(

    /**
     * Handles interactions with the API, specifically requests regarding
     *  the `users` table in the database.
     * @type {UserService}
     */
    private userService: UserService
  ) {
    this.formSubmitted = false;
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('(.+)@(.+){2,}\.(.+){2,}')
      ]),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

  /**
   * Sends the form data to the API to be validated. It then returns the
   *  user data passes it on to be saved to localStorage.
   * @param  {any}     form  a JSON representation of the form data.
   * @param  {boolean} valid true if the form validates agains the FormControl
   *                          Validators, false otherwise.
   */
  authUser(form: any, valid: boolean) {
    this.formSubmitted = true;

    if (valid) {
      this.userService.authUser(form.email, form.password).subscribe(
        users => this.handleAuth(users),
        err   => {
          console.log(err);
        }
      );
    }
  }

  /**
   * Saves the validated user data to localStorage.
   * @param  {User[]} users the validated user data returned from
   *                         the database.
   */
  handleAuth(users: User[]) {
    localStorage.setItem('pv-user', JSON.stringify(users));
    location.pathname = '/';
  }
}
