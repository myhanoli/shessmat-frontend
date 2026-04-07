import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportesReparacionesService } from 'src/app/service/reportes-reparaciones.service';
import { ReporteReparacion } from 'src/app/model/reportes-reparaciones.model';

@Component({
  selector: 'app-reportes-reparaciones',
  templateUrl: './reportes-reparaciones.component.html',
  styleUrls: ['./reportes-reparaciones.component.scss']
})
export class ReportesReparacionesComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  exporting = false;
  reportes: ReporteReparacion[] = [];
  totalReparaciones = 0;
  totalIngresos = 0;
  totalManoObra = 0;
  errorMessage = '';

  constructor(private fb: FormBuilder, private reportesService: ReportesReparacionesService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      tecnico: ['']
    });
  }

  get fechaInicio() {
    return this.form.get('fechaInicio');
  }

  get fechaFin() {
    return this.form.get('fechaFin');
  }

  search(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { fechaInicio, fechaFin, tecnico } = this.form.value;
    this.errorMessage = '';
    this.loading = true;
    this.reportesService.getReportes(fechaInicio, fechaFin, tecnico).subscribe({
      next: response => {
        this.reportes = response.data || [];
        this.totalReparaciones = response.totalReparaciones || 0;
        this.totalIngresos = response.totalIngresos || 0;
        this.totalManoObra = response.totalManoObra || 0;
        this.loading = false;
      },
      error: error => {
        this.errorMessage = 'No se pudieron cargar los datos. Por favor intente de nuevo.';
        this.loading = false;
        console.error(error);
      }
    });
  }

  exportExcel(): void {
    this.exporting = true;
    this.reportesService.downloadExcel().subscribe({
      next: blob => {
        const filename = 'reportes-reparaciones.xlsx';
        this.saveBlobAsFile(blob, filename);
        this.exporting = false;
      },
      error: error => {
        this.errorMessage = 'No se pudo descargar el archivo. Por favor intente de nuevo.';
        this.exporting = false;
        console.error(error);
      }
    });
  }

  private saveBlobAsFile(blob: Blob, filename: string): void {
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    window.URL.revokeObjectURL(url);
  }
}
