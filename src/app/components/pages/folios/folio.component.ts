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
import { SeguimientoFolioDTO } from 'src/app/model/SeguimientoFolioDTO';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


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



   estatusOptions: DropdownOption[] = [];
   nuevoEstatus: any = null;
  observacion: string = '';
  resultadoDiagnostico: string | null = null;

  resultadosOptions = [
    { label: 'Reparable', value: 'REPARABLE' },
    { label: 'No reparable', value: 'NO_REPARABLE' },
    { label: 'Requiere refacción', value: 'REQUIERE_REFACCION' },
    { label: 'No se encontró falla', value: 'SIN_FALLA' }
  ];

  historial: HistorialEstatus[] = [];

  usoPiezas: boolean = false;
piezas: { descripcion: string; costo: number }[] = [];
manoObra: number = 0;

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
       this.cargarFolios(); 
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
      // Agregar 'DIAGNOSTICO COMPLETADO' si no está presente
      if (!this.estatusOptions.some(e => e.label === 'DIAGNOSTICO COMPLETADO')) {
        this.estatusOptions.push({ label: 'DIAGNOSTICO COMPLETADO', value: '5' }); // Reemplaza '5' con el ID real del backend
      }
    });
  }



guardarSeguimiento() {
  if (!this.nuevoEstatus || !this.observacion) return;

  const esDiagnostico = this.nuevoEstatus?.label === 'DIAGNOSTICO COMPLETADO';

  // Preparamos el DTO con datos de cierre solo si es CERRADO
  const dto: any = {
    folioId: this.folioSeleccionado.id,
    estatusId: Number(this.nuevoEstatus.value),
    comentario: this.observacion,
    resultadoDiagnostico: esDiagnostico ? this.resultadoDiagnostico : null,
    cierre: this.nuevoEstatus?.label === 'CERRADO' ? {
      usoPiezas: this.usoPiezas,
      piezas: this.piezas,
      manoObra: this.manoObra,
      total: this.calcularTotal()
    } : null
  };

  this.folioService.guardarSeguimiento(dto).subscribe({
    next: (res) => {
      // Actualizar estatus localmente
      this.folioSeleccionado.estatusActual = this.estatusOptions.find(e => e.value === this.nuevoEstatus.value);

      // Si el estatus es DIAGNOSTICO COMPLETADO, guardar el resultado independiente
      if (esDiagnostico) {
        this.folioSeleccionado.resultadoDiagnostico = this.resultadoDiagnostico;
        this.resultadoDiagnostico = null;
      }

      // Si el estatus es CERRADO, generar ticket automáticamente
      if (this.nuevoEstatus?.label === 'CERRADO' && dto.cierre) {
        this.generarTicketPDF(dto.cierre);  // <-- enviamos los datos de cierre
      }
 this.cargarFolios(); 
      // Cerramos el modal
      this.cerrarModal();
    },
    error: (err) => {
      console.error('Error al guardar seguimiento:', err);
    }
  });
}



cerrarModal() {
    this.mostrarSeguimiento = false;
    this.nuevoEstatus = null;
    this.observacion = '';
    this.resultadoDiagnostico = null;
    this.usoPiezas = false;
    this.piezas = [];
    this.manoObra = 0;
  }

    cargarHistorial(folioId: number) {
    this.folioService.getHistorial(folioId).subscribe(data => {
      
      this.historial = data;
      console.log("Historial: "  + this.historial)
    });
  }

  descargarTicket(folio: Folio) {
    console.log('folio ID in Component:', folio.id);
    this.folioService.getTicket(folio.id).subscribe({
      next: (blob) => {
        const fileName = `ticket_${folio.folio?.toString().replace(/\s+/g, '_')}.pdf`;
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Error descargando ticket:', err);
      }
    });
  }

esCambioEstatus(item: any) {
  return item.estatusAnterior !== item.estatusNuevo;
}

agregarPieza() {
  this.piezas.push({ descripcion: '', costo: 0 });
}

eliminarPieza(index: number) {
  this.piezas.splice(index, 1);
}

calcularTotal(): number {
  const totalPiezas = this.piezas.reduce(
    (sum, p) => sum + (p.costo || 0), 0
  );
  return totalPiezas + (this.manoObra || 0);
}



generarTicketPDF(cierre: any) {
  if (!this.folioSeleccionado) return;

  const doc = new jsPDF({
    unit: 'pt',
    format: [226, 400]
  });

  let y = 20;
  const lineHeight = 14;

  // ----- TÍTULO -----
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('TALLER DE SERVICIO', 113, y, { align: 'center' });
  y += lineHeight;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Cierre de Folio', 113, y, { align: 'center' });
  y += lineHeight + 5;

  // ----- DATOS DEL FOLIO -----
  const folioData = [
    `Folio: ${this.folioSeleccionado.folio}`,
    `Cliente: ${this.folioSeleccionado.clienteNombre}`,
    `Equipo: ${this.folioSeleccionado.tipoEquipo}`,
    `Marca: ${this.folioSeleccionado.marca}`,
    `Modelo: ${this.folioSeleccionado.modelo}`,
    `N° Serie: ${this.folioSeleccionado.numSerie}`,
    `Estatus final: ${this.folioSeleccionado.estatusActual?.label}`
  ];

  folioData.forEach(line => {
    doc.text(line, 10, y);
    y += lineHeight;
  });

  y += 5;
  doc.setLineWidth(0.5);
  doc.line(10, y, 216, y);
  y += 10;

  // ----- PIEZAS UTILIZADAS -----
  if (cierre.usoPiezas && cierre.piezas.length > 0) {
    doc.setFont('helvetica', 'bold');
    doc.text('Piezas utilizadas:', 10, y);
    y += lineHeight;

    doc.setFont('helvetica', 'normal');
    cierre.piezas.forEach((p: any, i: number) => {
      const descripcion = p.descripcion.length > 20 ? p.descripcion.slice(0, 20) + '...' : p.descripcion;
      doc.text(`${i + 1}. ${descripcion}`, 10, y);
      doc.text(`$${p.costo.toFixed(2)}`, 180, y, { align: 'right' });
      y += lineHeight;
    });

    y += 5;
    doc.setLineWidth(0.3);
    doc.line(10, y, 216, y);
    y += 10;
  }

  // ----- MANO DE OBRA Y TOTAL -----
  doc.setFont('helvetica', 'bold');
  doc.text('Mano de obra:', 10, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`$${cierre.manoObra.toFixed(2)}`, 180, y, { align: 'right' });
  y += lineHeight;

  doc.setFont('helvetica', 'bold');
  doc.text('TOTAL REPARACIÓN:', 10, y);
  doc.text(`$${cierre.total.toFixed(2)}`, 180, y, { align: 'right' });
  y += lineHeight + 10;

  // ----- FOOTER -----
  doc.setFontSize(10);
  doc.setFont('helvetica', 'italic');
  doc.text('¡Gracias por su preferencia!', 113, y, { align: 'center' });

  // ----- DESCARGAR PDF -----
  doc.save(`Ticket_Folio_${this.folioSeleccionado.folio}.pdf`);
}


}

