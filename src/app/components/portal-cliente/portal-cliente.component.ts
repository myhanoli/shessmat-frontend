import { CommonModule, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { FolioCliente } from 'src/app/interface/FolioCliente';
import { HistorialEstatus } from 'src/app/model/historialEstatus';
import { FolioService } from 'src/app/service/folio.service';
import { LoginService } from 'src/app/service/login.service';

registerLocaleData(localeEs, 'es-MX');

interface PortalUser {
  name?: string;
  nombre?: string;
  username?: string;
}

@Component({
  selector: 'app-portal-cliente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portal-cliente.component.html',
  styleUrl: './portal-cliente.component.scss'
})
export class PortalClienteComponent implements OnInit {
  folios: FolioCliente[] = [];
  cargando = true;
  error = '';
  expandedFolioId: number | null = null;
  historialPorFolio: Record<number, HistorialEstatus[]> = {};
  cargandoHistorial = new Set<number>();
  errorHistorial = new Set<number>();
  historialSolicitado = new Set<number>();
  readonly nombreCliente = this.obtenerNombreCliente();

  constructor(
    private folioService: FolioService,
    private loginService: LoginService,
    private router: Router
  ) {  }

  ngOnInit(): void {
    this.cargarFolios();
  }

  cargarFolios(): void {
    this.cargando = true;
    this.error = '';
    this.folioService.getMisFolios()
      .pipe(finalize(() => this.cargando = false))
      .subscribe({
        next: folios => {
          this.folios = folios;
          this.historialPorFolio = {};
          this.historialSolicitado.clear();
          this.errorHistorial.clear();
          this.cargandoHistorial.clear();
        },
        error: err => {
          console.error('Error al cargar los folios del cliente:', err);
          this.error = 'No fue posible cargar tus folios. Intenta de nuevo más tarde.';
        }
      });
  }

  cerrarSesion(): void {
    this.loginService.logout();
    this.router.navigateByUrl('/auth/login');
  }

  toggleDetalle(folio: FolioCliente): void {
    if (this.expandedFolioId === folio.folioId) {
      this.expandedFolioId = null;
      return;
    }

    this.expandedFolioId = folio.folioId;
    this.cargarHistorial(folio.folioId);
  }

  cargarHistorial(folioId: number): void {
    if (this.historialSolicitado.has(folioId) || this.cargandoHistorial.has(folioId)) {
      return;
    }

    this.cargandoHistorial.add(folioId);
    this.errorHistorial.delete(folioId);
    this.folioService.getHistorial(folioId)
      .pipe(finalize(() => this.cargandoHistorial.delete(folioId)))
      .subscribe({
        next: historial => {
          this.historialPorFolio[folioId] = [...historial].sort(
            (a, b) => new Date(a.fechaCambio).getTime() - new Date(b.fechaCambio).getTime()
          );
          this.historialSolicitado.add(folioId);
        },
        error: err => {
          console.error(`Error al cargar el seguimiento del folio ${folioId}:`, err);
          this.errorHistorial.add(folioId);
        }
      });
  }

  nombreEstatus(folio: FolioCliente): string {
    return folio.estatus || 'Sin estatus';
  }

  iconoEquipo(folio: FolioCliente): string {
    const tipoEquipo = this.normalizar(folio.tipoEquipo || '');
    return tipoEquipo.includes('celular') ? 'pi-mobile' : 'laptop';
  }

  claseEstatus(folio: FolioCliente): string {
    const estatus = this.normalizar(this.nombreEstatus(folio));
    if (estatus.includes('listo') || estatus.includes('entregado') || estatus.includes('finalizado')) {
      return 'status--ready';
    }
    if (estatus.includes('repar')) {
      return 'status--repair';
    }
    if (estatus.includes('diagn')) {
      return 'status--diagnosis';
    }
    return 'status--received';
  }

  etapaActual(folio: FolioCliente): number {
    const estatus = this.normalizar(this.nombreEstatus(folio));
    const estatusPorId: Record<number, number> = {
      1: 0,
      2: 1,
      3: 1,
      4: 2,
      5: 3,
      6: 3,
      7: 3,
      8: 3
    };
    const id = Number(folio.estatusId);
    if (Number.isInteger(id) && estatusPorId[id] !== undefined) {
      return estatusPorId[id];
    }

    if (
      estatus.includes('listo') ||
      estatus.includes('entregado') ||
      estatus.includes('finalizado') ||
      estatus.includes('cerrado') ||
      estatus.includes('cancelado')
    ) {
      return 3;
    }
    if (estatus.includes('repar')) {
      return 2;
    }
    if (estatus.includes('diagn') || estatus.includes('autorizacion')) {
      return 1;
    }
    return 0;
  }

  progreso(folio: FolioCliente): number {
    if (!folio.estatus) {
      return 0;
    }

    return (this.etapaActual(folio) + 1) * 25;
  }

  estaListo(folio: FolioCliente): boolean {
    const estatus = this.normalizar(this.nombreEstatus(folio));
    return estatus.includes('listo') ||
      estatus.includes('entregado') ||
      estatus.includes('finalizado');
  }

  etiquetaEtapaFinal(folio: FolioCliente): string {
    const estatus = this.normalizar(this.nombreEstatus(folio));
    if (estatus.includes('cerrado')) {
      return 'Cerrado';
    }
    if (estatus.includes('cancelado')) {
      return 'Cancelado';
    }
    return 'Listo';
  }

  cotizacion(folio: FolioCliente): number | null {
    return folio.cotizacion === null || folio.cotizacion === undefined
      ? null
      : Number(folio.cotizacion);
  }

  private normalizar(valor: string): string {
    return valor.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  private obtenerNombreCliente(): string {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}') as PortalUser;
      return user.name || user.nombre || user.username || 'Cliente';
    } catch (error) {
      console.error('No fue posible leer el nombre del usuario:', error);
      return 'Cliente';
    }
  }
}
