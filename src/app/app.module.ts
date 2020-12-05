import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { ChatComponent } from './components/chat/chat.component';
import { ChatService } from './providers/chat.service';
import { LoginComponent } from './components/login/login.component';
import { NoimagePipe } from './pipes/noimage.pipe';

import '@angular/common/locales/global/es';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [AppComponent, ChatComponent, LoginComponent, NoimagePipe],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
  ],
  providers: [ChatService, { provide: LOCALE_ID, useValue: 'es-ES' }, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
