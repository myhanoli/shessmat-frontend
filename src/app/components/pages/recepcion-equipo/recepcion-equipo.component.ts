
import { MessageService } from 'primeng/api';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Folio} from '../../../interface/Folio';
import {Router} from "@angular/router"; 
import { DatePipe } from '@angular/common';
import { TipoEquipo } from 'src/app/interface/TipoEquipo';
import { Marca } from 'src/app/interface/Marca';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import swal from 'sweetalert2';
import * as internal from 'events';
import { DomSanitizer } from '@angular/platform-browser';
import { FileModel } from 'src/app/interface/FileModel';
import {FormBuilder,FormGroup,FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { IngresaEquipoService } from 'src/app/service/ingresa-equipo.service';
import { FolioService } from 'src/app/service/folio.service';
import { ClientesService } from 'src/app/service/clientes.service';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/model/product';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Cliente2 } from 'src/app/interface/cliente2';

import { CrudComponent } from '../crud/crud.component';
import { IngresaclienteComponent } from '../../ingresaCliente/ingresacliente.component';
import { DialogService, DynamicDialogRef,DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ClienteComponent } from '../clientes/cliente.component';
import Swal from 'sweetalert2';
import { ChangeDetectorRef } from '@angular/core';
import { FolioRequest } from 'src/app/interface/FolioRequest';

@Component({
  
  templateUrl: './recepcion-equipo.component.html',
  styleUrls: ['./recepcion-equipo.component.scss'],
  providers: [MessageService,DatePipe,DialogService]
})
export class RecepcionEquipoComponent implements OnInit {

   ref: DynamicDialogRef | undefined;
   clientes: Cliente2[] = [];
      
      cols: any[] = [];
      selectedProducts: Product[] = [];
      clientDialog: boolean = false;
      btnGuardar:boolean;
      submitted: boolean = false;

      folio:Folio = new Folio()
      folioRequest:FolioRequest = new FolioRequest()
      cliente:Cliente2 = new Cliente2()
      
      verSeleccion: String;
      verSeleccionMarca: String;
      folioRamdon:string; 
      date = new Date();

      selectedTipoEquipo:TipoEquipo = {id:0,tipoEquipo:''};
      selectedMarca:Marca = {id:0,marca:''};

      formFolio: FormGroup;
      tiposEquipos = ['Laptop', 'PC Escritorio', 'Tablet', 'Celular'];  
      marcasLaptop = ['HP', 'Dell', 'Lenovo', 'Acer', 'Asus', 'Toshiba','Apple','Huawei'];
      marcasDesktop = ['Ensamble','HP', 'Dell', 'Compaq','IBM']; 
      marcasCelulares = ['Samsung', 'Xiaomi', 'Motorola', 'Huawei', 'Apple','Honor','OPPO'];

      hoy: string = '';

  cargaImagen = false;
      private overlayContainer: OverlayContainer

      // Variable que usará el select dinámico
marcasActuales: string[] = [];

isLaptop = false; // para mostrar los radiobuttons
isDesktop = false;
isCelular = false;
isTablet = false;

encendido: boolean | null = null;
traeCargador: boolean | null = null;
mostrarModeloSerie = false;

folioId!: number;
accion: 'crear' | 'editar' = 'crear';

      constructor(private fb: FormBuilder, private folioService: FolioService,
        private dialogService: DialogService, private cdr: ChangeDetectorRef,
        private dialogRef: DynamicDialogRef,public config: DynamicDialogConfig) {
      
    
  }


  ngOnInit() {
      
    
    const fecha = new Date();
    this.hoy = fecha.toISOString().split('T')[0]; // Formato YYYY-MM-DD

  
      this.formFolio = this.fb.group({
      folio: [''],
      fecha: [{ value: this.hoy, disabled: true }],
      numCliente: ['', Validators.required],
      nombre: ['', Validators.required],
      tipoEquipo: ['', Validators.required],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      numSerie: ['', Validators.required],
       encendido: [null],      // nuevo
  traeCargador: [null],   // nuevo
  marcaCargador: [''],    // nuevo
  numSerieCargador: [''] , // nuevo
      comentarios: ['', Validators.maxLength(500)]
    });
    //this.generarFolio();  // Genera el folio al iniciar el formulario
    
   
    if (this.config.data && this.config.data.accion === 'editar') {
            const folioAEditar = this.config.data.folio;
          this.accion = 'editar';
        this.folioId = folioAEditar.id; // 🔑 CLAVE ABSOLUTA

             this.formFolio.get('fecha')?.enable();

            this.formFolio.patchValue({  fecha: folioAEditar.fecha });
            // 1. Inicializar el formulario con los datos del folio
            this.formFolio.patchValue({
                folio: folioAEditar.folio,
               // fecha: folioAEditar.fecha,
              //  numCliente: folioAEditar.cliente.id, // Asumiendo que el cliente tiene un ID
               // nombre: `${folioAEditar.cliente.nombre} ${folioAEditar.cliente.apellidoPat}`,
                 numCliente: folioAEditar.clienteId, // Asumiendo que el cliente tiene un ID
                nombre: `${folioAEditar.clienteNombre}`,
                tipoEquipo: folioAEditar.tipoEquipo,
               /* marca: folioAEditar.marca,
                modelo: folioAEditar.modelo,
                numSerie: folioAEditar.numSerie,*/
                encendido: folioAEditar.encendido,
                traeCargador: folioAEditar.traeCargador,
                marcaCargador: folioAEditar.marcaCargador,
                numSerieCargador: folioAEditar.numSerieCargador,
                comentarios: folioAEditar.comentarios
            });

           
            
            // 2. Ejecutar la lógica de cambio de tipo de equipo para cargar las marcas correctas
            this.onTipoEquipoChange(folioAEditar.tipoEquipo);

            this.formFolio.patchValue({
        marca: folioAEditar.marca,
        modelo: folioAEditar.modelo,
                numSerie: folioAEditar.numSerie,
    });

            
            // 3. Establecer el ID del folio en la instancia local (necesario para la API de actualización)
            this.folio = folioAEditar; 

            this.formFolio.get('fecha')?.valueChanges.subscribe(v => {
  console.log("FECHA CAMBIÓ A:", v);
});

        } else {
           this.accion = 'crear';
            // Si es 'nuevo', ejecutar la lógica normal de inicialización (generarFolio)
            this.generarFolio();
        }
    }

  
  
   generarFolio() {
  const añoActual = new Date().getFullYear();
console.log("generarFolio:");
  this.folioService.getEndFolio().subscribe({
  next: (ultimoFolio: string) => {
     console.log("Folio recibido de API:", ultimoFolio); // "F2025-7931"

    // Separar el folio en partes ["F2025", "7931"]
    const partes = ultimoFolio.split('-');

    let nuevoConsecutivo = 1;
    const añoActual = new Date().getFullYear();

    if (partes.length === 2) {
      const ultimoConsecutivo = Number(partes[1]); // tomar solo la parte numérica
      if (!isNaN(ultimoConsecutivo)) {
        nuevoConsecutivo = ultimoConsecutivo + 1; // sumar 1
      }
    }

    // Construir folio nuevo
    const folioNuevo = `F${añoActual}-${nuevoConsecutivo}`;
    this.formFolio.patchValue({ folio: folioNuevo });
    console.log("Nuevo folio generado:", folioNuevo);


  

  },
  error: (err) => console.error("Error al obtener folio:", err)
});
}


 public creaFolio(): void {


  /*if (!this.folioRequest.clienteId) {
    console.warn('Cliente no definido en folio');
    return;
  }*/

  const clienteId = this.formFolio.get('numCliente')?.value;
  if (!clienteId) {
    Swal.fire('', 'Debe seleccionar un cliente antes de crear el folio', 'warning');
    return;
  }

   // Validar campos requeridos
  const camposRequeridos = [
    { nombre: 'Tipo de Equipo', valor: this.formFolio.get('tipoEquipo')?.value },
    { nombre: 'Marca', valor: this.formFolio.get('marca')?.value },
   
  ];

  const campoVacio = camposRequeridos.find(c => !c.valor || c.valor.toString().trim() === '');
  if (campoVacio) {
    Swal.fire('Campos incompletos', `Debe completar el campo: ${campoVacio.nombre}`, 'warning');
   
    return;
  }
  
  this.folioRequest.folio = this.formFolio.get('folio')?.value;
  this.folioRequest.fecha = this.formFolio.get('fecha')?.value;
  this.folioRequest.tipoEquipo = this.formFolio.get('tipoEquipo')?.value;
  this.folioRequest.marca = this.formFolio.get('marca')?.value;
  
  this.folioRequest.numSerie = this.formFolio.get('numSerie')?.value;
  this.folioRequest.modelo = this.formFolio.get('modelo')?.value;

  this.folioRequest.encendido = this.formFolio.get('encendido')?.value;
this.folioRequest.traeCargador = this.formFolio.get('traeCargador')?.value;
this.folioRequest.marcaCargador = this.formFolio.get('marcaCargador')?.value;
this.folioRequest.numSerieCargador = this.formFolio.get('numSerieCargador')?.value;
this.folioRequest.comentarios = this.formFolio.get('comentarios')?.value;
this.folioRequest.clienteId = this.formFolio.get('numCliente')?.value;

  this.folioService.creaFolio(this.folioRequest).subscribe({
  next: (response) => {
    this.dialogRef.close(true);
    // Primer Swal de confirmación antes de preguntar por imágenes
    Swal.fire({
      title: 'Folio creado',
      text: `El folio ${response.folio} se creó correctamente. ¿Desea continuar?`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
        
      if (result.isConfirmed) {
        // Preguntar si desea cargar imágenes
        this.preguntarCargarImagenes(response.folio);
      } else {
        this.formFolio.reset();
        this.ngOnInit();
      }
    });
  },
  error: (err) => {
    console.error(err);
    Swal.fire('Error', 'No se pudo crear el folio', 'error');
  }
});


}

// Función auxiliar para manejar la carga de imágenes
private preguntarCargarImagenes(folio: string): void {
  Swal.fire({
    title: 'Confirmación',
    text: `¿Desea cargar imágenes para el folio ${folio}?`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí, cargar imágenes',
    cancelButtonText: 'No'
  }).then((result) => {
    if (result.isConfirmed) {
      this.mostrarSelectorImagenes(folio);
    } else {
      this.formFolio.reset();
      this.ngOnInit();
    }
  });
}

// Función auxiliar para mostrar selector de imágenes con previsualización
private mostrarSelectorImagenes(folio: string): void {
  Swal.fire({
    title: 'Subir Imágenes',
    html: `
      <input type="file" id="inputImagenes" class="swal2-input" accept="image/*" multiple>
      <div id="previewContainer" 
           style="display:flex; flex-wrap:wrap; gap:10px; justify-content:center; margin-top:15px;">
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: 'Subir',
    cancelButtonText: 'Cancelar',
    width: 600,
    didOpen: () => {
      const input = document.getElementById('inputImagenes') as HTMLInputElement;
      const previewContainer = document.getElementById('previewContainer') as HTMLElement;

      input.addEventListener('change', () => {
        previewContainer.innerHTML = '';
        const files = input.files;
        if (files) {
          Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = e => {
              const img = document.createElement('img');
              img.src = e.target?.result as string;
              img.style.width = '100px';
              img.style.height = '100px';
              img.style.objectFit = 'cover';
              img.style.borderRadius = '6px';
              img.style.border = '1px solid #ccc';
              previewContainer.appendChild(img);
            };
            reader.readAsDataURL(file);
          });
        }
      });
    },
    preConfirm: () => {
      const input = document.getElementById('inputImagenes') as HTMLInputElement;
      const files = input.files;
      if (!files || files.length === 0) {
        Swal.showValidationMessage('Selecciona al menos una imagen antes de continuar');
        return false;
      }
      return Array.from(files);
    }
  }).then(res => {
    if (res.isConfirmed && res.value) {
      const files: File[] = res.value;
      const formData = new FormData();
      formData.append('folio', folio);
      files.forEach(file => formData.append('files', file));

      Swal.fire({
        title: 'Subiendo imágenes...',
        didOpen: () => Swal.showLoading(),
        allowOutsideClick: false
      });

      this.folioService.subirMultiplesImagenes(formData).subscribe({
        next: () => {
          Swal.fire('Éxito', 'Las imágenes se subieron correctamente', 'success');
          this.formFolio.reset();
          this.ngOnInit();
        },
        error: (err) => {
          console.error(err);
          Swal.fire('Error', 'Ocurrió un error al subir las imágenes', 'error');
        }
      });
    }
  });
}
    // Convierte File → Base64
private convertirABase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = err => reject(err);
    reader.readAsDataURL(file);
  });
}

 

  nuevoCliente() {
    this.btnGuardar = false;
    this.submitted = false;
    this.clientDialog = true;
}

hideDialog() {
  this.clientDialog = false;
  this.submitted = false;
}

capturar(value) {
  this.verSeleccion = value;
  console.log("Se selecciono: " + this.verSeleccion)
}

capturarMarca(value) {
  this.verSeleccionMarca = value;
  console.log("Se selecciono Marca: " + this.verSeleccionMarca)
}

addClient(){
  this.ref = this.dialogService.open(ClienteComponent, {
      header: 'Seleccionar Cliente',
      width: '95vw',
      style: { maxWidth: '800px' },
      contentStyle: { overflow: 'auto' },
      closable: true,
      dismissableMask: true,
      data: {} // si necesitas pasar algo al componente
    });

    this.ref.onClose.subscribe((clienteSeleccionado: any) => {
      if (clienteSeleccionado) {
        this.formFolio.patchValue({
          numCliente: clienteSeleccionado.id,
          nombre: clienteSeleccionado.nombre
        });
        this.folio.clienteId = clienteSeleccionado;
      }
    });
}



onTipoEquipoChange(tipo: string) {
  // Limpiar valores previos
  this.formFolio.patchValue({ marca: '', modelo: '', numSerie: '' });

  // Ajustar marcas dinámicas
  if (tipo === 'Laptop') {
    this.marcasActuales = this.marcasLaptop;
    this.isLaptop = true;
    this.isDesktop = false;
    this.isCelular = false;
    
    // Para Laptop siempre mostrar modelo y numSerie
    this.mostrarModeloSerie = true;
  } else if (tipo === 'PC Escritorio') {
    this.marcasActuales = this.marcasDesktop;
    this.isLaptop = false;
    this.isDesktop = true;
    this.isCelular = false;

    // Para PC Escritorio, solo mostrar si marca ≠ Ensamble (evaluar luego en onMarcaChange)
    this.mostrarModeloSerie = false;
  } else if (tipo === 'Celular') {
    this.marcasActuales = this.marcasCelulares;
    this.isLaptop = false;
    this.isDesktop = false;
    this.isCelular = true;
    this.mostrarModeloSerie = true;
  } else {
    this.marcasActuales = [];
    this.isLaptop = false;
    this.isDesktop = false;
    this.isCelular = false;
    this.mostrarModeloSerie = false;
  }
}

onMarcaChange(marca: string) {
  const tipo = this.formFolio.get('tipoEquipo')?.value;

  // Para Laptop ya está siempre visible
  // Para PC Escritorio, mostrar solo si Marca ≠ Ensamble
  if (tipo === 'PC Escritorio') {
    this.mostrarModeloSerie = marca !== 'Ensamble';
  }

  // Limpiar campos si no se debe mostrar
  if (!this.mostrarModeloSerie) {
    this.formFolio.patchValue({ modelo: '', numSerie: '' });
  }
}

guardarFolio(): void {
  if (this.accion === 'editar') {
    this.actualizarFolio();
  } else {
    this.creaFolio();
  }
}

actualizarFolio(): void {

  const folioActualizar = {
    id: this.folioId, 
    folio: this.formFolio.get('folio')?.value,
    fecha: this.formFolio.get('fecha')?.value,
    tipoEquipo: this.formFolio.get('tipoEquipo')?.value,
    marca: this.formFolio.get('marca')?.value,
    modelo: this.formFolio.get('modelo')?.value,
    numSerie: this.formFolio.get('numSerie')?.value,
    encendido: this.formFolio.get('encendido')?.value,
    traeCargador: this.formFolio.get('traeCargador')?.value,
    marcaCargador: this.formFolio.get('marcaCargador')?.value,
    numSerieCargador: this.formFolio.get('numSerieCargador')?.value,
    comentarios: this.formFolio.get('comentarios')?.value,
    clienteId: this.formFolio.get('numCliente')?.value
  };

  this.folioService.actualizarFolio(folioActualizar).subscribe({
    next: () => {
      Swal.fire('Actualizado', 'Folio actualizado correctamente', 'success');
      this.dialogRef.close({ actualizado: true });
    },
    error: () => {
      Swal.fire('Error', 'No se pudo actualizar el folio', 'error');
    }
  });
}


}