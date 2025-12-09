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
import { catchError, map, of, switchMap } from 'rxjs';


@Component({
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.scss',
  providers: [MessageService,DatePipe]
})
export class ClienteComponent implements OnInit {

    btnGuardar:boolean;
    clientDialog: boolean = false;
    deleteProductDialog: boolean = false;
    deleteProductsDialog: boolean = false;
    products: Product[] = [];
    first: number = 0;
    selectedProducts: Product[] = [];
    submitted: boolean = false;
    cols: any[] = [];
    statuses: any[] = [];
    clientes: Cliente2[];
    cliente:Cliente2 = new Cliente2()
    rowsPerPageOptions = [5,10,20];
    clientesFiltrados: any[] = [];
    
    filtros = {
      nombre: '',
      apellidoPat: '',
      telefono: '',
      fechaInicio: null,
      fechaFin: null
    };

    mostrarFiltros: boolean = false;

    constructor(@Optional() public ref: DynamicDialogRef,private productService: ProductService, private messageService: MessageService,private _clientesService:ClientesService) { }

    ngOnInit() {
        this.btnGuardar = false;
        this._clientesService.getClientes().subscribe(
            clientes => {this.clientes = clientes
             this.clientesFiltrados = [...clientes];
     } );
       
    }

    nuevoCliente() {
     
       this.cliente = {
        id: null,           // Forzar que Spring Boot haga INSERT
        numCliente: '',     // Se generará en creaCliente()
        nombre: '',
        apellidoPat: '',
        apellidoMat: '',
        telefono: '',
        correo: '',
        direccion: '',
        fechaAlta: null,
        folios: [] 
    };

        this.btnGuardar = false;
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
     
        }

        console.log("this.cliente.correo: " + this.cliente.correo)
        console.log("this.cliente.fechaAlta: " + this.cliente.fechaAlta)
        this.clientDialog = true;
     
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
                /*this._clientesService.getClientes().subscribe(
                    clientes => this.clientes = clientes
                    );*/
                     this.reloadClientes();
               
            
              }
           
            )
           
           }


   /* public creaCliente():void{
        this._clientesService.creaCliente(this.cliente).subscribe(response => 
                {
              
              this.clientDialog = false;
              swal.fire('Exito','Se guardo cliente con exito','success')
              this.reloadClientes();
              
            }
            )
        
          }*/
   public creaCliente(): void {
  const añoActual = new Date().getFullYear();
  const prefijoAño = `C${añoActual}`;
  delete this.cliente.id;  
  this._clientesService.getEndNumCliente().pipe(
    // Manejar el número de cliente y generar el consecutivo
    map(ultimoNumCliente => {
      let nuevoConsecutivo = 1;
      const partes = ultimoNumCliente.split('-');

      if (partes.length === 2 && partes[0] === prefijoAño) {
        const ultimoConsecutivo = Number(partes[1]);
        if (!isNaN(ultimoConsecutivo)) {
          nuevoConsecutivo = ultimoConsecutivo + 1;
        }
      }

      const consecutivoFormateado = nuevoConsecutivo.toString().padStart(4, '0');
      return `${prefijoAño}-${consecutivoFormateado}`;
    }),
    // Llamar al servicio para guardar el cliente
    switchMap(numClienteNuevo => {
      this.cliente.numCliente = numClienteNuevo;
      return this._clientesService.creaCliente(this.cliente);
    }),
    catchError(err => {
      console.error('Error en el proceso de creación:', err);
      swal.fire('Error', 'No se pudo crear el cliente', 'error');
      return of(null); // Retorna observable vacío para evitar romper la cadena
    })
  ).subscribe(response => {
    if (response) {
      this.clientDialog = false;
      swal.fire('Éxito', 'Se guardó cliente con éxito', 'success');
      this.reloadClientes(); // Recargar la lista de clientes
    }
  });
}


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

reloadClientes() {
  this._clientesService.getClientes().subscribe(clientes => {
     this.clientes = clientes;
     this.first = 0; // resetear paginado
     this.clientesFiltrados = [...clientes];
  });
}

aplicarFiltros() {
  this.clientesFiltrados = this.clientes.filter(cliente => {
    return (!this.filtros.nombre || cliente.nombre.toLowerCase().includes(this.filtros.nombre.toLowerCase()))
      && (!this.filtros.apellidoPat || cliente.apellidoPat.toLowerCase().includes(this.filtros.apellidoPat.toLowerCase()))
      && (!this.filtros.telefono || cliente.telefono.includes(this.filtros.telefono))
      && (!this.filtros.fechaInicio || new Date(cliente.fechaAlta) >= new Date(this.filtros.fechaInicio))
      && (!this.filtros.fechaFin || new Date(cliente.fechaAlta) <= new Date(this.filtros.fechaFin));
  });
}

limpiarFiltros() {
  this.filtros = { nombre: '', apellidoPat: '', telefono: '', fechaInicio: null, fechaFin: null };
  this.clientesFiltrados = [...this.clientes];
}

toggleFiltros() {
  this.mostrarFiltros = !this.mostrarFiltros;
}

generarNumCliente(): void {
  const añoActual = new Date().getFullYear();

  this._clientesService.getEndNumCliente().subscribe({
    next: (ultimoNumCliente: string) => {
      // Ejemplo: ultimoNumCliente podría ser "C2025-7931"

      const partes = ultimoNumCliente.split('-');
      let nuevoConsecutivo = 1;
      let prefijoAño = `C${añoActual}`;

      if (partes.length === 2 && partes[0] === prefijoAño) {
        // Si el año coincide, incrementamos el consecutivo
        const ultimoConsecutivo = Number(partes[1]);
        if (!isNaN(ultimoConsecutivo)) {
          nuevoConsecutivo = ultimoConsecutivo + 1;
        }
      } 
      // Si el año no coincide o no hay clientes, el consecutivo será 1.
      
      // Formatear el consecutivo para que tenga al menos 4 dígitos (ej: 1 -> 0001)
      const consecutivoFormateado = nuevoConsecutivo.toString().padStart(4, '0');

      // Construir el número de cliente nuevo: C2025-0001
      const numClienteNuevo = `${prefijoAño}-${consecutivoFormateado}`;
      
      // Aquí asignarías el valor al formulario o modelo de cliente
      // Ejemplo: this.formCliente.patchValue({ numCliente: numClienteNuevo });
      
      console.log("Nuevo número de cliente generado:", numClienteNuevo);
    },
    error: (err) => {
      console.error("Error al obtener último número de cliente:", err);
      // En caso de error, puedes asignar un valor inicial o manejar el error.
    }
  });
}

}

