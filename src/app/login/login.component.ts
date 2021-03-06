import { Inject } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { USER_STATUS_CODES } from '../shared/services/user/user-status-codes';
import { UserService } from '../shared/services/user/user.service';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {
  title = 'Login';

  authenticatedObs: Observable<boolean>;
  userServiceSub: Subscription;
  authSub: Subscription;

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

  constructor(private _userService: UserService, private _router: Router, private formBuilder: FormBuilder, @Inject('apiBase') private _apiBase: string) {

  }

  ngOnInit() {

    this.form = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])]
    });

  }

  authenticated(): Observable<boolean> {
    if (this.authenticatedObs) return this.authenticatedObs;
    this.authenticatedObs = this._userService.authenticated()
      .map(data => {return data.authenticated});
    return this.authenticatedObs;
  }

  register() {
    this._router.navigate(['/register']);
  }

  onSubmit() {
    /**
     * Innocent until proven guilty
     */
    this.submitted = true;
    this.errorDiagnostic = null;

    this._userService.login(this.form.value).subscribe(data => {
      this._router.navigate(['/']);
    },
    error => {
      this.submitted = false;
      this.errorDiagnostic = USER_STATUS_CODES[error.status] || USER_STATUS_CODES[500];
    });
  }

  ngOnDestroy() {
    if (this.userServiceSub) this.userServiceSub.unsubscribe();
    if (this.authSub) this.authSub.unsubscribe();
  }

}
