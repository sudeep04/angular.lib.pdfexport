import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/*
 * Platform and Environment providers/directives/pipes
 */
import { environment } from '../environments/environment';
// App is our top level component
import { AppComponent } from './components/app/app.component';

import '../styles/styles.scss';

// Routing
import { AppRoutingModule } from './app.routing';
import { CommonModule } from '@angular/common';
import { PdfExportModule } from '../pdf-export';

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent
  ],
  /**
   * Import Angular's modules.
   */
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    PdfExportModule
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    environment.ENV_PROVIDERS
  ]
})
export class AppModule {}
