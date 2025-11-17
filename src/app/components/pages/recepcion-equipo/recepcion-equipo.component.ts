
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
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ClienteComponent } from '../clientes/cliente.component';
import Swal from 'sweetalert2';

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
      cliente:Cliente2 = new Cliente2()
      
      verSeleccion: String;
      verSeleccionMarca: String;
      folioRamdon:string; 
      date = new Date();

      selectedTipoEquipo:TipoEquipo = {id:0,tipoEquipo:''};
      selectedMarca:Marca = {id:0,marca:''};

      formFolio: FormGroup;
      tiposEquipos = ['Laptop', 'Desktop', 'Impresora', 'Monitor'];  // Ejemplo de opciones para Tipo de equipo
      marcas = ['HP', 'Dell', 'Lenovo', 'Acer', 'Asus'];  // Ejemplo de opciones para Marca

      hoy: string = '';

  cargaImagen = false;

      private overlayContainer: OverlayContainer
      constructor(private fb: FormBuilder, private folioService: FolioService,private dialogService: DialogService) {
      
    
  }

  // Esta función puede ser utilizada para obtener un folio consecutivo
  generarFolio() {
    const fecha = new Date();
    this.folioRamdon = `F${fecha.getFullYear()}-${Math.floor(Math.random() * 10000)}`;
    this.folio.folio = this.folioRamdon
   // this.formFolio.patchValue({ folioRamdon });
  }

  /*onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }*/

  /*  public creaFolio():void{

if (!this.folio.cliente) {
    console.warn('Cliente no definido en folio');
    return;
  }

  const clienteId = this.formFolio.get('numCliente')?.value;
  if (!clienteId) {
        swal.fire('','Debe seleccionar un cliente antes de crear el folio','warning')
    return;
  }

  console.log("cliente.id: " + this.folio.cliente.id);
   
     
    this.folio.folio = this.folioRamdon;  
    this.folio.fecha = this.date;
    this.folio.tipoEquipo = this.verSeleccion;
    this.folio.marca =  this.verSeleccionMarca;
  
      this.folioService.creaFolio(this.folio).subscribe(
       response => {
        swal.fire({
          title: 'Confirmacion',
          text: "¿Desea cargar imagenes para el folio " + this.folio.id+ " ?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si',
          cancelButtonText: 'No'
        }).then((result) => {
          if (result.isConfirmed) {
            this.cargaImagen=true;
            this.formFolio.reset();

  Swal.fire({
    title: 'Subir Imágenes',
    html: `
      <input type="file" id="inputImagenes" class="swal2-input" accept="image/*" multiple>
      <div id="previewContainer" style="display:flex; flex-wrap:wrap; gap:10px; justify-content:center; margin-top:15px;"></div>
    `,
    showCancelButton: true,
    confirmButtonText: 'Subir',
    cancelButtonText: 'Cancelar',
    width: 600,
    didOpen: () => {
      const input = document.getElementById('inputImagenes') as HTMLInputElement;
      const previewContainer = document.getElementById('previewContainer') as HTMLElement;

      input.addEventListener('change', () => {
        previewContainer.innerHTML = ''; // Limpiar previsualización
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
    if (result.isConfirmed) {
  this.cargaImagen = true;
  this.formFolio.reset();

  Swal.fire({
    title: 'Subir Imágenes',
    html: `
      <input type="file" id="inputImagenes" class="swal2-input" accept="image/*" multiple>
      <div id="previewContainer" style="display:flex; flex-wrap:wrap; gap:10px; justify-content:center; margin-top:15px;"></div>
    `,
    showCancelButton: true,
    confirmButtonText: 'Subir',
    cancelButtonText: 'Cancelar',
    width: 600,
    didOpen: () => {
      const input = document.getElementById('inputImagenes') as HTMLInputElement;
      const previewContainer = document.getElementById('previewContainer') as HTMLElement;

      input.addEventListener('change', () => {
        previewContainer.innerHTML = ''; // Limpiar previsualización
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

      Swal.fire({
        title: 'Subiendo imágenes...',
        didOpen: () => Swal.showLoading(),
        allowOutsideClick: false
      });

      // Convertir archivos a base64 y enviarlos
      const promesas = files.map(file => this.convertirABase64(file));

      Promise.all(promesas).then(base64Imgs => {
        const payload = base64Imgs.map(base64 => ({
         folio: this.folio.folio, 
          base64: base64.split(',')[1] // eliminamos el prefijo "data:image/png;base64,"
        }));

        this.folioService.subirMultiplesImagenes(payload).subscribe({
          next: (res) => {
            Swal.fire('Éxito', 'Las imágenes se subieron correctamente', 'success');
          },
          error: (err) => {
            console.error(err);
            Swal.fire('Error', 'Ocurrió un error al subir las imágenes', 'error');
          }
        });
      });
    }
  });

}
  });

          }else{
            this.formFolio.reset();
            this.ngOnInit();
          }
        })
       }
        
      )
    }*/

      public creaFolio(): void {

  if (!this.folio.cliente) {
    console.warn('Cliente no definido en folio');
    return;
  }

  const clienteId = this.formFolio.get('numCliente')?.value;
  if (!clienteId) {
    Swal.fire('', 'Debe seleccionar un cliente antes de crear el folio', 'warning');
    return;
  }

  this.folio.folio = this.folioRamdon;
  this.folio.fecha = this.date;
  this.folio.tipoEquipo = this.verSeleccion;
  this.folio.marca = this.verSeleccionMarca;

  this.folioService.creaFolio(this.folio).subscribe(
    response => {
      Swal.fire({
        title: 'Confirmación',
        text: `¿Desea cargar imágenes para el folio ${response.folio}?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, cargar imágenes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          this.formFolio.reset();

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

              Swal.fire({
                title: 'Subiendo imágenes...',
                didOpen: () => Swal.showLoading(),
                allowOutsideClick: false
              });



              const formData = new FormData();
              formData.append('folio',this.folio.folio); // o this.folio.folio
              files.forEach(file => formData.append('files', file));

// Depuración
/*console.log('Folio:', formData.get('folio'));
console.log('Archivos:');
files.forEach((file, i) => console.log(i, file.name));*/
              this.folioService.subirMultiplesImagenes(formData).subscribe({
                next: () => {
                  Swal.fire('Éxito', 'Las imágenes se subieron correctamente', 'success');
                },
                error: (err) => {
                  console.error(err);
                  Swal.fire('Error', 'Ocurrió un error al subir las imágenes', 'error');
                }
              });
            }
          });
        } else {
          this.formFolio.reset();
          this.ngOnInit();
        }
      });
    },
    error => {
      console.error(error);
      Swal.fire('Error', 'No se pudo crear el folio', 'error');
    }
  );
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

  ngOnInit() {
        const fecha = new Date();
       //  const hoy = new Date();
    this.hoy = fecha.toISOString().split('T')[0]; // Formato YYYY-MM-DD

  
      this.formFolio = this.fb.group({
      folio: [`F${fecha.getFullYear()}-${Math.floor(Math.random() * 10000)}`],  // Este será el consecutivo, lo podemos dejar vacío al inicio
      //fecha: [new Date(), Validators.required],
      fecha: [this.hoy],
      numCliente: ['', Validators.required],
      nombre: ['', Validators.required],
      tipoEquipo: ['', Validators.required],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      numSerie: ['', Validators.required],
      comentarios: ['', Validators.maxLength(500)]
    });
    this.generarFolio();  // Genera el folio al iniciar el formulario
    
  }

  

  nuevoCliente() {
    this.btnGuardar = false;
  //  this.cliente = {};
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
      width: '68%',
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
        this.folio.cliente = clienteSeleccionado;
      }
    });
}

}