import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../providers/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
})
export class ChatComponent implements OnInit {
  mensaje: '';
  elemento: any;

  // esUsuarioLogado: boolean;

  constructor(public chatService: ChatService, private datePipe: DatePipe) {
    this.chatService.cargarMensajes().subscribe((chat: any) => {
      setTimeout(() => {
        console.log('height', this.elemento.scrollHeight);

        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 20);
    });
  }

  ngOnInit(): void {
    // this.elemento = document.getElementById('app-mensajes');
    this.elemento = document.getElementById('chat-content');
  }

  enviarMensaje(): void {
    // console.log(this.mensaje);

    if (this.mensaje.length === 0) {
      return;
    }

    this.chatService
      .agregarMensaje(this.mensaje)
      .then(() => {
        this.mensaje = '';
      })
      .catch((err) => console.error('Mensaje no enviado', err));
  }
}
