import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'user-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm!: FormGroup;
  submited: boolean = false;

  constructor(private user: UserService, private fb: FormBuilder) {
  }

  onSignin() {
    this.submited = true;
    if (this.signinForm.invalid)
      return;
    
    
  }

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    
  }

}