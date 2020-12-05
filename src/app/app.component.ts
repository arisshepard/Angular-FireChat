import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ChatService } from './providers/chat.service';
import { Observable } from 'rxjs';
// import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'FireChat';
  chats: Observable<any[]>;

  // constructor(firestore: AngularFirestore, chatService: ChatService) {
  //   this.chats = firestore.collection('chats').valueChanges();
  // }

  constructor(public chatService: ChatService) {}
}
