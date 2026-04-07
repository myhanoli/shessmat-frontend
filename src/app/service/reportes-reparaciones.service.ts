import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReportesReparacionesResponse } from 'src/app/model/reportes-reparaciones.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportesReparacionesService {
  private readonly baseUrl = 'api/reportes/reparaciones';

  constructor(private http: HttpClient) { }

  getReportes(fechaInicio: string, fechaFin: string, tecnico?: string): Observable<ReportesReparacionesResponse> {
    let params = new HttpParams()
      .set('fechaInicio', fechaInicio)
      .set('fechaFin', fechaFin);

    if (tecnico) {
      params = params.set('tecnico', tecnico);
    }

    return this.http.get<ReportesReparacionesResponse>(environment.urlHost+this.baseUrl, { params });
  }

  downloadExcel(): Observable<Blob> {
    return this.http.get(environment.urlHost+`${this.baseUrl}/excel`, { responseType: 'blob' });
  }
}
