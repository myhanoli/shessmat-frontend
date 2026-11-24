import { CommonModule, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { FolioCliente } from 'src/app/interface/FolioCliente';
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
        next: folios => this.folios = folios,
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
    this.expandedFolioId = this.expandedFolioId === folio.folioId ? null : folio.folioId;
  }

  nombreEstatus(folio: FolioCliente): string {
    return folio.estatus || 'Sin estatus';
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
    if (estatus.includes('listo') || estatus.includes('entregado') || estatus.includes('finalizado')) {
      return 3;
    }
    if (estatus.includes('repar')) {
      return 2;
    }
    if (estatus.includes('diagn')) {
      return 1;
    }
    return 0;
  }

  progreso(folio: FolioCliente): number {
    return Math.max(0, Math.min(100, Number(folio.progreso) || 0));
  }

  estaListo(folio: FolioCliente): boolean {
    return this.etapaActual(folio) === 3;
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
