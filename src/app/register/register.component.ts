import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { USER_STATUS_CODES } from '../shared/services/user/user-status-codes';
import { UserService } from '../shared/services/user/user.service';

/**
 * Uncomment the below import when the debouncing asynchronous validators issue
 * get resolved.
 * See https://github.com/angular/angular/issues/6895#issuecomment-221765955
 */

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  title = 'Register';
  loginLink = '/login';

  form: FormGroup;

  /**
   * Boolean used in telling the UI
   * that the form has been submitted
   * and is awaiting a response
   */
  submitted: boolean = false;

  /**
   * Diagnostic message from received
   * form request error
   */
  errorDiagnostic: string;

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    /**
     * Initialize form Controls
     */

    /**
     * Initialize form
     */
    this.form = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(64)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(32)])]
    });

  }

  login() {
    this.router.navigateByUrl(this.loginLink);
  }

  onSubmit() {
    /**
     * Innocent until proven guilty
     * (show nothing until the request completes)
     */
    this.submitted = true;
    this.errorDiagnostic = null;

    this.userService.register(this.form.value).subscribe(
        data => {
          this.router.navigateByUrl('/login');
        },
        error => {
          this.submitted = false;
          this.errorDiagnostic = USER_STATUS_CODES[error.status] || USER_STATUS_CODES[500];
        });
  }

}
