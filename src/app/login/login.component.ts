import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { AuthenticationService, I18nService, Logger, TokenService, untilDestroyed } from '@app/core';
import { LoggedUserService } from '@app/core/logged-user.service';
import { ToastrService } from 'ngx-toastr';

const log = new Logger('Login');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  version: string = '1.0';
  error: string | undefined;
  loginForm!: FormGroup;
  isLoading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private i18nService: I18nService,
    private authenticationService: AuthenticationService,
    private tokenService: TokenService,
    private navigatorService: LoggedUserService,
    private toastrService: ToastrService
  ) {
    this.createForm();
  }

  ngOnInit() {
    if (this.tokenService.isAuthenticated()) {
      this.router.navigate([this.navigatorService.getRouteForUser()], { replaceUrl: true });
    } else {
      this.authenticationService.logout();
    }
  }

  ngOnDestroy() {}

  login() {
    this.isLoading = true;
    this.authenticationService
      .login(this.loginForm.value)
      .pipe(
        finalize(() => {
          this.loginForm.markAsPristine();
          this.isLoading = false;
        }),
        untilDestroyed(this)
      )
      .subscribe(
        response => {
          this.router.navigate([this.route.snapshot.queryParams.redirect || this.navigatorService.getRouteForUser()], {
            replaceUrl: true
          });
        },
        error => {
          log.debug(`Login error:`, error);
          if (error.error && error.error.errorCode === 'AUT_0004') {
            this.toastrService.error('User has been blocked, for more info please contact administrator.');
          }
          this.error = error;
        }
      );
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
      remember: true
    });
  }
}
