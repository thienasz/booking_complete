import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MdIcon, MdIconRegistry } from '@angular2-material/icon';
import { MdSpinner } from '@angular2-material/progress-circle';
import { UnauthenticatedGuard } from './unauthenticated.guard';

import { UserService } from './shared/services/user/user.service';

import { AppRoutingModule, routedComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import {BookingAddComponent} from "./booking/add/booking.add.component";
import {BookingListComponent} from "./booking/list/booking.list.component";
import {AuthenticatedGuard} from "./authenticated.guard";
import {BookingService} from "./shared/services/booking/booking.service";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    routedComponents,
    BookingAddComponent,
    BookingListComponent,
    MdIcon,
    MdSpinner
  ],
  providers: [UnauthenticatedGuard,
              AuthenticatedGuard,
              UserService,
      BookingService,
              {provide: 'apiBase', useValue: 'http://localhost:5000'}
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
