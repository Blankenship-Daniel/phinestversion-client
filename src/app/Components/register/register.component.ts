import { Component, OnInit } from '@angular/core';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
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

  /**
   * Indicates whether or not the image is ready to be submitted.
   * @type {boolean} true if the image is ready for upload, false otherwise.
   */
  private imageReady: boolean;

  /**
   * Contains metadata for the uploaded image.
   * @type {any}
   */
  private profilePic: any;

  private serverError: string;

  /**
   * Indicates whether or not the loading spinner should be shown if an
   *  image is being uploaded.
   * @return {boolean} true if the loading spinner should be shown, false
   *                         otherwise.
   */
  private showImageSpinner: boolean;

  private user: User[];

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
      username: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('(.+)@(.+){2,}\.(.+){2,}')
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ])
    });
    this.imageReady = false;
    this.showImageSpinner = false;
  }

  ngOnInit() {
  }

  /**
   * Fires the image removed event.
   * @param  {any}    event
   */
  imageRemoved(event: any) {
    this.imageReady = false;
  }

  /**
   * Fires the image uploaded event.
   * @param  {any}    event
   */
  imageUploaded(event: any) {
    this.imageReady = true;
    this.profilePic = event;
  }

  /**
   * Fires the show spinner event.
   * @param  {any}    event
   */
  showSpinner(event: any) {
    this.imageReady = false;
    this.showImageSpinner = true;
  }

  /**
   * Sends the form data to the API and adds a new user to the `users` table in
   *  the database.
   * @param  {any}     form  a JSON representation of the form data.
   * @param  {boolean} valid true if the form validates agains the FormControl
   *                          Validators, false otherwise.
   */
  registerUser(form: any, formValid: boolean) {
    this.formSubmitted = true;
    if (formValid && this.imageReady) {
      this.userService.registerUser(
        this.profilePic.src,
        form.username,
        form.email,
        form.password
      ).subscribe(
        user => this.userResponse(user),
        err  => {
          console.log(err);
        }
      );
    }
  }

  userResponse(user: any) {
    if (user.error) {
      this.serverError = user.error;
    }
  }
}
