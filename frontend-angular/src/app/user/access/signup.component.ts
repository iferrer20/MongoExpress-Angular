import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
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
    console.log(this.signupForm.get('password')?.errors)
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
  checkSamePassword(form: FormGroup): ValidationErrors {
    return {
      mispassword: form.get('password')?.value !== form.get('repeatPassword')?.value
    };
  }
  getError(s: string) {
    console.log(this.signupForm)
    const { errors }:any = this.signupForm.get(s);
    if (errors) {
      return Object.keys(errors)[0];
    } else {
      return null;
    }
  }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['']
    }, <AbstractControlOptions> {
      validators: this.checkSamePassword
    });
  }



}