import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { BelowNavComponent } from './below-nav/below-nav.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CorousalComponent } from './corousal/corousal.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ConnectionService } from './connection.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { MatFormFieldModule, MatSelectModule } from '@angular/material';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MaterialAngularSelectModule } from 'material-angular-select';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    BelowNavComponent,
    CorousalComponent,
    AdminLoginComponent,
    AdminDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    MaterialAngularSelectModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [ConnectionService],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
