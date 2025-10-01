
export enum Role {
    ADMIN = "ADMIN",
	USER = "USER"
	
}

export interface Product {
    /*id?: string;
    code?: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    inventoryStatus?: InventoryStatus;
    category?: string;
    image?: string;
    rating?: number;*/

    id?: string;
    nombre?: string;
    apellidoPat?: string;
    apellidoMat?: string;
    direccion?: string;
    telefono?: string;
    username?: string;
    password?: string;
    rol?: Role;
    
    
}