import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './views/auth/auth.module';
import { LocalStorageService, NgxWebstorageModule } from 'ngx-webstorage';
import { MessageService } from 'primeng/api';
import { ViewPeopleComponent } from './views/people/components/view-people/view-people.component';
import { PERSISTENCE } from './core/providers/utils.provider';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AuthModule,
    NgxWebstorageModule.forRoot({ prefix: 'dvp', separator: '.', caseSensitive: true })

  ],
  providers: [
    MessageService,
    PERSISTENCE,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
