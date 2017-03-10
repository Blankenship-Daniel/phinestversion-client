import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../Models/user.model';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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
   * Sends the form data to the API and adds a new user to the `users` table in
   *  the database.
   * @param  {any}     form  a JSON representation of the form data.
   * @param  {boolean} valid true if the form validates agains the FormControl
   *                          Validators, false otherwise.
   */
  registerUser(form: any, valid: boolean) {
    this.formSubmitted = true;

    if (valid) {
      console.log(form);
    }
  }

}
