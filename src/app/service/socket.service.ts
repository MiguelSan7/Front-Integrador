// src/app/services/socket.service.ts

import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment'; // Ajusta la ruta según tu estructura

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    // Conectar al servidor WebSocket
    this.socket = io(environment.apiUrl); // Asegúrate de que apiUrl sea tu URL de servidor
  }

  // Método para escuchar eventos
  on(event: string, callback: (data: any) => void): void {
    this.socket.on(event, callback);
  }

  // Método para emitir eventos
  emit(event: string, data: any): void {
    this.socket.emit(event, data);
  }

  // Método para desconectar
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
