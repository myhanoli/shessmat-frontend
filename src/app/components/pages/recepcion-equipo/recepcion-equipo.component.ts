
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
      marcas = ['HP', 'Dell', 'Lenovo', 'Acer'];  // Ejemplo de opciones para Marca

      private overlayContainer: OverlayContainer
      constructor(private fb: FormBuilder, private folioService: FolioService,private dialogService: DialogService) {
        const fecha = new Date();
      this.formFolio = this.fb.group({
      folio: [`F${fecha.getFullYear()}-${Math.floor(Math.random() * 10000)}`],  // Este será el consecutivo, lo podemos dejar vacío al inicio
      fecha: [new Date(), Validators.required],
      numCliente: ['', Validators.required],
      nombre: ['', Validators.required],
      tipoEquipo: ['', Validators.required],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      numSerie: ['', Validators.required],
      comentarios: ['', Validators.maxLength(500)]
    });
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

    public creaFolio():void{
       // console.log("Llegue a creaFolio: " + this.cliente.id);
      
    //this.folio.folio = this.folio.folio;  
    this.folio.folio = this.folioRamdon;  
    console.log("folio ingresado: " + this.folio.folio);
    this.folio.fecha = this.date;
    console.log("fecha ingresado: " + this.folio.fecha);
    this.folio.tipoEquipo = this.verSeleccion;
    console.log("tipoEquipo ingresado: " + this.folio.tipoEquipo);
    this.cliente.id = 1;
  
    this.folio.cliente = this.cliente;
 
      this.folio.marca =  this.verSeleccionMarca;
      console.log("marca ingresado: " + this.folio.marca);
      console.log("modelo ingresado: " + this.folio.modelo);
      console.log("numSerie ingresado: " + this.folio.numSerie);
      console.log("Comentario ingresado: " + this.folio.comentarios);

      this.folioService.creaFolio(this.folio).subscribe(
       // response => this.router.navigate(['/folios'])
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
           // this.cargaImagen=true;
            this.formFolio.reset();
          }else{
            this.formFolio.reset();
            this.ngOnInit();
          }
        })
       }
        
      )
    }

  ngOnInit() {
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
      width: '60%',
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
      }
    });
}

}