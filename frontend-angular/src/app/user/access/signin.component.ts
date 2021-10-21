import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'user-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin-signup.scss']
})
export class SigninComponent implements OnInit {
  signinForm!: FormGroup;
  submited: boolean = false;
  errorSignin: string = '';

  constructor(
    public userService: UserService, 
    private fb: FormBuilder,
    private route: Router
  ) {
  }

  onSignin() {
    this.submited = true;
    
    if (this.signinForm.invalid)
      return;

    this.errorSignin = '';
    this.userService.signIn(
      this.signinForm.get('username')?.value, 
      this.signinForm.get('password')?.value
    ).subscribe(
      () => this.route.navigate(['/'])
    );
  }

  getError(s: string) {
    const { errors }:any = this.signinForm.get(s);
    if (errors) {
      return Object.keys(errors)[0];
    } else {
      return null;
    }
  }

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

}