import { Title } from '@angular/platform-browser';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';

import { AuthenticationService, I18nService, TokenService } from '@app/core';
import { CommonStorageService } from '@app/core/common.storage.service';
import { Constants } from '@app/shared/constants';
import { UserFront } from '@app/shared/dto';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() sidenav!: MatSidenav;

  constructor(
    private router: Router,
    private titleService: Title,
    private authenticationService: AuthenticationService,
    private commonStorageService: CommonStorageService,
    private i18nService: I18nService
  ) {}

  ngOnInit() {}

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  logout() {
    this.authenticationService.logout().subscribe(() => this.router.navigate([Constants.LOGIN_ROUTE], { replaceUrl: true }));
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  get userFront(): UserFront {
    return this.commonStorageService.userFront;
  }

  get title(): string {
    return this.titleService.getTitle();
  }
}
