import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import swal from 'sweetalert2';
import { ClientesService } from 'src/app/service/clientes.service';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/model/product';
import { DatePipe } from '@angular/common';
import { Cliente } from 'src/app/model/cliente';
import { Cliente2 } from 'src/app/interface/cliente2';
import {DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Optional } from '@angular/core';
import { FolioService } from 'src/app/service/folio.service';
import { Folio } from 'src/app/interface/Folio';
import { RecepcionEquipoComponent } from '../recepcion-equipo/recepcion-equipo.component';


@Component({
  templateUrl: './folio.component.html',
  styleUrl: './folio.component.scss',
  providers: [MessageService,DatePipe,DialogService]
})
export class FolioComponent implements OnInit {

    
  folios: Folio[] = [];
  cols: any[] = [];

  foliosFiltrados: any[] = [];



filtros = {
  folio: '',
  fechaInicio: null,
  fechaFin: null,
  equipo: '',
  marca: '',
  cliente: ''
};

mostrarFiltros: boolean = false;
  ref: DynamicDialogRef | undefined;

  constructor(private folioService: FolioService,private dialogService: DialogService) {}

  ngOnInit(): void {
    this.cargarFolios();
this.foliosFiltrados = this.folios; // <-- aquí todavía está vacío
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'folio', header: 'Folio' },
      { field: 'fecha', header: 'Fecha' },
      { field: 'tipoEquipo', header: 'Equipo' },
      { field: 'marca', header: 'Marca' },
      { field: 'modelo', header: 'Modelo' },
      { field: 'numSerie', header: 'N° Serie' },
      { field: 'cliente.nombre', header: 'Cliente' }
    ];
  }

  /*cargarFolios() {
    this.folioService.getFolios().subscribe(
      data => {this.folios = data,
      err => console.error('Error cargando folios', err)
  });
  }*/
 cargarFolios() {
  this.folioService.getFolios().subscribe({
    next: (data) => {
      this.folios = data;
      this.foliosFiltrados = [...this.folios];  // ← AQUÍ SÍ CARGA LO QUE YA TIENES
    },
    error: (err) => {
      console.error('Error cargando folios', err);
    }
  });
}


  aplicarFiltros() {
  this.foliosFiltrados = this.folios.filter(f => {

    const clienteCompleto = (f.cliente?.nombre + ' ' + f.cliente?.apellidoPat)
                              ?.toLowerCase() ?? '';

    return (

      // FILTRO POR FOLIO
      (!this.filtros.folio || 
        f.folio?.toString().includes(this.filtros.folio)
      )

      // FECHA INICIO
      && (!this.filtros.fechaInicio || 
            new Date(f.fecha) >= new Date(this.filtros.fechaInicio)
      )

      // FECHA FIN
      && (!this.filtros.fechaFin || 
            new Date(f.fecha) <= new Date(this.filtros.fechaFin)
      )

      // EQUIPO
      && (!this.filtros.equipo || 
            f.tipoEquipo?.toLowerCase().includes(this.filtros.equipo.toLowerCase())
      )

      // MARCA
      && (!this.filtros.marca || 
            f.marca?.toLowerCase().includes(this.filtros.marca.toLowerCase())
      )

      // CLIENTE (nombre + paterno)
      && (!this.filtros.cliente ||
            clienteCompleto.includes(this.filtros.cliente.toLowerCase())
      )
    );
  });
}

limpiarFiltros() {
  this.filtros = {
    folio: '',
    fechaInicio: null,
    fechaFin: null,
    equipo: '',
    marca: '',
    cliente: ''
  };

  this.foliosFiltrados = [...this.folios];
}

toggleFiltros() {
  this.mostrarFiltros = !this.mostrarFiltros;
}


nuevoFolio(): void {
  
     this.ref = this.dialogService.open(RecepcionEquipoComponent, {
          header: 'Nuevo folio',
          width: '50%',
          contentStyle: { overflow: 'auto' },
          closable: true,
          dismissableMask: true,
          data: {accion: 'nuevo'} 
        });
      }

      editarFolio(folio: any): void {
  // 1. Abrir el modal usando el DialogService
  this.ref = this.dialogService.open(RecepcionEquipoComponent, {
    header: `Edicion de Folio: ${folio.folio}`, 
    width: '68%',
    contentStyle: { overflow: 'auto' },
    closable: true,
    dismissableMask: true,
    
    // ⭐ Clave para la edición: Pasar el objeto del folio al componente del modal
    data: {
      accion: 'editar',
      folio: folio // Pasa el objeto completo del folio
    } 
  });

  // 2. Manejar la acción de cierre del modal (ej. recargar la tabla)
  this.ref.onClose.subscribe((resultado: any) => {
    // Aquí puedes verificar si el modal se cerró exitosamente (ej. si guardó)
    if (resultado && resultado.actualizado) {
      console.log('Folio actualizado. Recargando datos...');
      // Lógica para recargar la tabla o actualizar la fila específica
      // Ejemplo: this.cargarFolios(); 
    }
    this.ref = undefined;
  });
}
      

}

