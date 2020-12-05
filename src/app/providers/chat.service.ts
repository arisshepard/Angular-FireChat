import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { Mensaje } from '../interfaces/mensaje.interface';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats: Mensaje[] = [];
  // public usuario: any = {};
  public usuario: Usuario = {};

  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((user) => {
      console.log('Estado del usuario: ', user);

      if (!user) {
        return;
      }

      this.usuario = {
        nombre: user.displayName,
        uid: user.uid,
        imagen: user.photoURL,
      };

      // this.usuario.nombre = user.displayName;
      // this.usuario.uid = user.uid;
      // this.usuario.imagen = user.photoURL;
      // console.log(user);
    });
  }

  agregarMensaje(texto: string): Promise<DocumentReference> {
    const mensaje: Mensaje = {
      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this.usuario.uid,
      imagen: this.usuario.imagen,
    };

    return this.itemsCollection.add(mensaje);
  }

  cargarMensajes(): Observable<void> {
    this.itemsCollection = this.afs.collection<Mensaje>('chats', (ref) =>
      ref.orderBy('fecha', 'desc').limit(5)
    );

    return this.itemsCollection.valueChanges().pipe(
      map((mensajes: Mensaje[]) => {
        // console.log(mensajes);
        // this.chats = mensajes;
        this.chats = [];

        for (const mensaje of mensajes) {
          this.chats.unshift(mensaje);
        }
      })
    );
  }

  login(proveedor: string): void {
    if (proveedor === 'google') {
      this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
    } else {
      this.afAuth.signInWithPopup(new auth.TwitterAuthProvider());
    }
  }

  logout(): void {
    // this.usuario = {};
    this.usuario = {};
    this.afAuth.signOut();
  }
}
