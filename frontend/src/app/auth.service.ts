import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'token'; // Clave para almacenar el token en localStorage
  private apiUrl = `${environment.apiUrl}/login`; // Cambia esto a la URL de tu backend

  constructor(private http: HttpClient) {}

  // Método para iniciar sesión
  login(email: string, password: string): Observable<any> {
    const credentials = { email, password };
    return this.http.post<any>(this.apiUrl, credentials);
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem(this.tokenKey); // Eliminar el token
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    return !!token; // Devuelve true si hay un token
  }
}
