import { Component, AfterViewInit, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-pago',
  standalone: true,
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css'],
})
export class PagoComponent implements AfterViewInit {
  transactionResponse: any = null;
  loading: boolean = false; // Para controlar la visibilidad del loading
  showPayboxContent: boolean = true; // Para controlar si se muestra el contenido de Paybox

  constructor(private http: HttpClient, private zone: NgZone) {}

  ngAfterViewInit(): void {
    this.initializePaybox();
  }

  initializePaybox(): void {
    (window as any).data = {
      PayboxRemail: "dmorales@pagoplux.com",
      PayboxSendmail: "correocliente@gmail.com",
      PayboxRename: "Prueba - Jhordy",
      PayboxSendname: "Dmorales",
      PayboxBase0: "2.0",
      PayboxBase12: "10.0",
      PayboxDescription: "Prueba",
      PayboxLanguage: "es",
      PayboxDirection: "Quito",
      PayBoxClientPhone: "0999999999",
      PayboxProduction: false,
      PayBoxClientIdentification: '9999999999',
      PayboxEnvironment: "sandbox",
      PayboxPagoPlux: false,
      PayboxIdElement: "idElementoTest"
    };

    (window as any).onAuthorize = (response: any) => {
      if (response.status === "succeeded") {
        console.log("Transacción exitosa:", response);
        const transactionId = response.detail.id_transaccion;

        this.zone.run(() => {
          this.showPayboxContent = false;
          this.loading = true;
        });

        this.consultarTransaccion(transactionId);
      } else {
        alert("Proceso fallido");
        console.log("Error en la transacción:", response);
      }
    };

    if ((window as any).Paybox) {
      (window as any).Paybox((window as any).data, (window as any).onAuthorize);
    }
  }

  consultarTransaccion(transactionId: string): void {
    const apiUrl = `${environment.apiUrl}/consultarTransaccion/${transactionId}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.get(apiUrl, { headers }).subscribe({
      next: (response: any) => {
        this.zone.run(() => {
          this.loading = false;
          this.transactionResponse = response.detail.respuest;
        });
        console.log("Respuesta de la API:", response);
      },
      error: (error) => {
        this.zone.run(() => {
          this.loading = false;
        });
        console.error("Error en la consulta de la transacción:", error);
      }
    });
  }
}
