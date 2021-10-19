import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'user-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signin-signup.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  submited: boolean = false;
  errorSignup: string = '';

  constructor(private user: UserService, private fb: FormBuilder) {
  }

  onSignup() {

    this.submited = true;
    if (this.signupForm.invalid)
      return;

    this.user.signUp(
      this.signupForm.get('email')?.value, 
      this.signupForm.get('username')?.value, 
      this.signupForm.get('password')?.value
    ).subscribe(
      data => {},
      ({error}) => {
        this.errorSignup = error.error;
      }
    );
  }
  checkSamePassword(fg: FormGroup) {
    
    const mispassword = fg.get('password')?.value !== fg.get('repeatPassword')?.value;
    return mispassword ? { mispassword } : {};

  }
  getError(s: string) {
    const { errors }:any = s == 'parent' ? this.signupForm : this.signupForm.get(s);

    if (errors) {
      return Object.keys(errors).filter(e => errors[e])[0];
    } else {
      return null;
    }
  }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', [this.checkSamePassword]]
    }, {
      validators: this.checkSamePassword
    });
  }



}