import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { environment } from '@env/environment';
import { App } from 'app/app';
import { appConfig } from 'app/app.config';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(App, appConfig).catch(err => console.error(err));
