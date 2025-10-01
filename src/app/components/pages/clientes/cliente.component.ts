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
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Optional } from '@angular/core';


@Component({
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.scss',
  providers: [MessageService,DatePipe]
})
export class ClienteComponent implements OnInit {

    btnGuardar:boolean;

    clientDialog: boolean = false;

    //updateClient: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: Product[] = [];

    

    //product: Product = {};

    selectedProducts: Product[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    //clientes: Cliente[] = [];
   // clientes: Cliente[];
    //cliente:Cliente = new Cliente() 
    

    clientes: Cliente2[];
    cliente:Cliente2 = new Cliente2()

    rowsPerPageOptions = [5, 10, 20];

    constructor(@Optional() public ref: DynamicDialogRef,private productService: ProductService, private messageService: MessageService,private _clientesService:ClientesService) { }

    ngOnInit() {
        this.btnGuardar = false;
        //this.productService.getProducts().then(data => this.products = data);
        this._clientesService.getClientes().subscribe(
            clientes => this.clientes = clientes
            
            );
            
        /*this.cols = [
            { field: 'product', header: 'Product' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
            { field: 'rating', header: 'Reviews' },
            { field: 'inventoryStatus', header: 'Status' }
        ];

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];*/

    }

    nuevoCliente() {
        this.btnGuardar = false;
       // this.cliente = {};
        this.submitted = false;
        this.clientDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editClient(cliente: Cliente2) {
        this.btnGuardar = true;
        this.cliente = { ...cliente };

        if (this.cliente.fechaAlta) {
          // Dividir el string "yyyy-MM-dd" en partes
        //  const partesFecha = this.cliente.fechaAlta.split('-');
          
          // Crear un objeto Date en base a las partes
          /*this.cliente.fechaAlta = new Date(
            parseInt(partesFecha[0]),   // Año
            parseInt(partesFecha[1]) - 1,  // Mes (0 basado, por eso se resta 1)
            parseInt(partesFecha[2])    // Día
          );*/
        }

        console.log("this.cliente.correo: " + this.cliente.correo)
        console.log("this.cliente.fechaAlta: " + this.cliente.fechaAlta)
        this.clientDialog = true;
       // this.updateClient = true;
    }

    /*deleteProduct(product: Product) {
        this.deleteProductDialog = true;
        this.cliente = { ...this.cliente };
    }*/

    eliminar(cliente:Cliente2):void{

        console.log("item de cliente: " + cliente.id)
        
            swal.fire({
              title: 'Confirmacion',
              text: "¿Seguro que deseas eliminar?",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Si, eliminar!'
            }).then((result) => {
              if (result.isConfirmed) {
        
                this._clientesService.borraCliente(cliente.id).subscribe(
                  response => {
                    this.clientes = this.clientes.filter(cli => cli !== cliente)
                    swal.fire(
                      'Eliminado!',
                      'Registro borrado con exito',
                      'success'
                    )
                  }
                )
        
                
              }
            })
        
          }
      
          actualizaCliente():void{
            console.log('actualizaCliente con Id: ' + this.cliente.id)
            this._clientesService.updateCliente(this.cliente).subscribe(
              
              response => 
              {
            
            this.clientDialog = false;
            
                swal.fire('Exito','Registro actualizado con exito','success')
                this._clientesService.getClientes().subscribe(
                    clientes => this.clientes = clientes
                    );
               
            
              }
           
            )
            
           // this.formCliente.reset(); 
          
           }


           public creaCliente():void{

            this._clientesService.creaCliente(this.cliente).subscribe(
              response => 
                {
              
              this.clientDialog = false;
              
                  swal.fire('Exito','Se guardo cliente con exito','success')
                  this._clientesService.getClientes().subscribe(
                      clientes => this.clientes = clientes
                      );
                 
              
                }
            )
        
          }
        

    /*confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.clientes = this.clientes.filter(val => !this.selectedProducts.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Clientes Borrados', life: 3000 });
        this.selectedProducts = [];
    }*/

    /*confirmDelete() {
        this.deleteProductDialog = false;
        this.products = this.products.filter(val => val.id !== this.cliente.id);
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Cliente Borrado', life: 3000 });
        this.cliente = {};
    }*/

    hideDialog() {
        this.clientDialog = false;
        this.submitted = false;
    }
 
  


    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }


    seleccionarCliente(cliente: any) {
    this.ref.close(cliente); // Retorna el cliente al componente que abrió el diálogo
  }

}
