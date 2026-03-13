import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
//import { authConfig } from './app/auth.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)//, authConfig)
  .catch((err) => console.error(err));
