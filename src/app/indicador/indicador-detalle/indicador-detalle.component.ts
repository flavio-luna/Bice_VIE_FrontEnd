import { Component, Input, OnInit } from '@angular/core';
import { IIndicador } from '../indicador';

@Component({
  selector: 'app-indicador-detalle',
  templateUrl: './indicador-detalle.component.html',
  styleUrls: ['./indicador-detalle.component.css']
})
export class IndicadorDetalleComponent implements OnInit {
  @Input() indicador : IIndicador
  unidadMedidaData : any[] = [
      {
          unidadMedida: "Dólar",
          urlImagen: "",
          representacion: "USD $"
      },
      {
          unidadMedida: "Pesos",
          urlImagen: "",
          representacion: "CLP $"
      },
      {
          unidadMedida: "Porcentaje",
          urlImagen: "",
          representacion: "%"
      }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  mostrarFecha(indi : IIndicador) :  void{
    indi.mostrarFecha = !indi.mostrarFecha;
    indi.mostrarAnno = false;
  }

  mostrarAnno(indi : IIndicador) : void{
    indi.mostrarAnno = !indi.mostrarAnno;
    indi.mostrarFecha = false;
  }

  mostrarPrefijo(unidadMedida: string) : string{
    var resultado =  this.unidadMedidaData.filter((indicador: any) =>
      indicador.unidadMedida.toLocaleLowerCase().indexOf(unidadMedida.toLocaleLowerCase()) !== -1);
      console.log(resultado);
      return resultado[0].representacion;
  }

  numeroFormateadoCl(numero:number) : string{
      return Number(numero).toLocaleString('es-CL');
  }
}
