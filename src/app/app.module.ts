import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { DataTablesModule } from "angular-datatables";

/* libs */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

/* Firebase */
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireStorageModule } from '@angular/fire/compat/storage'

/* components */
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(
      {
        timeOut: 2500,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
      }
    ), // ToastrModule added
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule, // storage
    DataTablesModule,
    NgSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
