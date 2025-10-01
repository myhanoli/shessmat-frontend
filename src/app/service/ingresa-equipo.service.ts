import { Injectable } from '@angular/core';
import { Marca } from '../interface/Marca';
import { TipoEquipo } from '../interface/TipoEquipo';

@Injectable({
  providedIn: 'root'
})
export class IngresaEquipoService {
  private tipoEquipo:TipoEquipo[] = [
    {
      id:1,
      tipoEquipo:"Laptop"
    },
    {
      id:2,
      tipoEquipo:"Desktop"
    },
    {
      id:3,
      tipoEquipo:"Ensamble"
    }
  ];

  private marca:Marca[] = [
    {
      id:1,
      marca:"Samsung"
    },
    {
      id:2,
      marca:"DELL"
    },
    {
      id:3,
      marca:"HP"
    },
    {
      id:4,
      marca:"Lenovo"
    },
    {
      id:5,
      marca:"Gateway"
    },
    {
      id:6,
      marca:"Sony Vaio"
    }
  ];

  constructor() { }

getTipoEquipo():TipoEquipo[]{
  return this.tipoEquipo;
}

getMarca():Marca[]{
  return this.marca;
}


}
