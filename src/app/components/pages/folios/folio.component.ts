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
import { CatalogosService, DropdownOption } from 'src/app/service/catalogos.service';
import { Opcion } from 'src/app/model/Opcion';
import { HistorialEstatus } from 'src/app/model/historialEstatus';


@Component({
  templateUrl: './folio.component.html',
  styleUrl: './folio.component.scss',
  providers: [MessageService,DatePipe,DialogService]
})
export class FolioComponent implements OnInit {

    
  folios: Folio[] = [];
  cols: any[] = [];

  foliosFiltrados: any[] = [];

  marcas: { label: string; value: string }[] = [];
  equipos: { label: string; value: string }[] = [];
  


filtros: { 
  folio: string;
  fechaInicio: Date | null;
  fechaFin: Date | null;
  equipo: Opcion | string | null;
  marca: Opcion | string | null;
  cliente: string;
} = {
  folio: '',
  fechaInicio: null,
  fechaFin: null,
  equipo: null,
  marca: null,
  cliente: ''
};


mostrarFiltros: boolean = false;
  ref: DynamicDialogRef | undefined;

  folioSeleccionado: any = null;
  mostrarSeguimiento = false;

//  estatusList: Estatus[] = [];

   estatusOptions: DropdownOption[] = [];
   nuevoEstatus: string | null = null;
  observacion: string = '';

  
  historial: HistorialEstatus[] = [];

  constructor(private folioService: FolioService,private dialogService: DialogService,private catalogosService: CatalogosService) {}

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

 this.cargarEstatus();
    
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


 /* aplicarFiltros() {
  this.foliosFiltrados = this.folios.filter(f => {

    const clienteCompleto = (f.cliente?.nombre + ' ' + f.cliente?.apellidoPat)
                              ?.toLowerCase() ?? '';

                                const equipoFiltro = typeof this.filtros.equipo === 'string' 
    ? this.filtros.equipo 
    : this.filtros.equipo?.label;
                              
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
}*/

aplicarFiltros() {
  

  const equipoFiltro = typeof this.filtros.equipo === 'string'
    ? this.filtros.equipo
    : this.filtros.equipo?.label;

  const marcaFiltro = typeof this.filtros.marca === 'string'
    ? this.filtros.marca
    : this.filtros.marca?.label;

  this.foliosFiltrados = this.folios.filter(f => {
    
      const clienteCompleto = (f.clienteNombre + ' ' )
                              ?.toLowerCase() ?? '';

    return (
      (!this.filtros.folio || f.folio?.toLowerCase().includes(this.filtros.folio.toLowerCase())) &&
      (!equipoFiltro || f.tipoEquipo?.toLowerCase().includes(equipoFiltro.toLowerCase())) &&
      (!marcaFiltro || f.marca?.toLowerCase().includes(marcaFiltro.toLowerCase()))  && (!this.filtros.cliente ||
            clienteCompleto.includes(this.filtros.cliente.toLowerCase())
      ) &&
      (!this.filtros.fechaInicio || new Date(f.fecha) >= new Date(this.filtros.fechaInicio)) &&
      (!this.filtros.fechaFin || new Date(f.fecha) <= new Date(this.filtros.fechaFin))
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
    
    //Clave para la edición: Pasar el objeto del folio al componente del modal
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

cargarMarcas(event: any) {
  const query = event.query || '';
  this.catalogosService.buscarMarcas(query).subscribe(data => {
    this.marcas = data.map(op => ({
      label: op.label,
      value: op.value.toString()
    }));
  });
}

cargarEquipos(event: any) {
  const query = event.query || '';
  this.catalogosService.buscarEquipos(query).subscribe(data => {
    this.equipos = data.map(op => ({
      label: op.label,
      value: op.value.toString()
    }));
  });
}
      
abrirSeguimiento(folio: any) {
  this.folioSeleccionado = folio;
  this.mostrarSeguimiento = true;

   this.cargarHistorial(this.folioSeleccionado.id);
}

 cargarEstatus(): void {
    this.catalogosService.getEstatusDropdown().subscribe(data => {
      this.estatusOptions = data;
    });
  }


guardarSeguimiento() {
  if (!this.nuevoEstatus || !this.observacion) return;

  // Creamos un objeto literal directamente
  const dto = {
    folioId: this.folioSeleccionado.id,
    estatusId: Number(this.nuevoEstatus),
    comentario: this.observacion
  };

  this.folioService.guardarSeguimiento(dto).subscribe(res => {
    console.log('Estatus actualizado', res);

    // Actualizamos localmente el estatusActual del folio
    this.folioSeleccionado.estatusActual = this.estatusOptions.find(e => e.value === this.nuevoEstatus);

    // Cerramos el modal y limpiamos campos
    this.cerrarModal();
  });
}


cerrarModal() {
    this.mostrarSeguimiento = false;
    this.nuevoEstatus = null;
    this.observacion = '';
  }

    cargarHistorial(folioId: number) {
    this.folioService.getHistorial(folioId).subscribe(data => {
      
      this.historial = data;
      console.log("Historial: "  + this.historial)
    });
  }


esCambioEstatus(item: any) {
  return item.estatusAnterior !== item.estatusNuevo;
}

}

