import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../Services/user.service';
import { User } from '../../Models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private users     : User[];
  private form      : FormGroup;
  private email     : string;
  private password  : string;

  constructor(
    private router: Router,
    private userService: UserService
  ) {
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

  handleAuth(users: User[]) {
    alert('users: ' + JSON.stringify(users));
    // this.router.navigateByUrl('/');
  }

  authUser(form, valid) {
    if (valid) {
      this.userService.authUser(form.email, form.password).subscribe(
        users => this.handleAuth(users),
        err   => {
          console.log(err);
        }
      );
    } else {
      console.log('form: ' + JSON.stringify(form));
      console.log('valid: ' + valid);
    }
  }
}
