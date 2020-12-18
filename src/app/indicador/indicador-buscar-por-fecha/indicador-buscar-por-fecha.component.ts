import { Component, OnInit, Input } from '@angular/core';
import { IIndicador } from '../indicador';
import { DatePipe } from '@angular/common';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { IndicadorEconomicoService } from '../indicador-economico.service';

import {Injectable} from '@angular/core';
import { NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
  /**
 * This Service handles how the date is represented in scripts i.e. ngModel.
 */
@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {

  readonly DELIMITER = '/';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[2], 10)
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? ( date.day < 10 ? '0'+ date.day : date.day) + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }
}

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? ( date.day < 10 ? '0'+ date.day : date.day) + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
  }
}


@Component({
  selector: 'app-indicador-buscar-por-fecha',
  templateUrl: './indicador-buscar-por-fecha.component.html',
  styleUrls: ['./indicador-buscar-por-fecha.component.css'],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class IndicadorBuscarPorFechaComponent implements OnInit {
  @Input() indicador : IIndicador
  hoy: Date = new Date();
  fechaSeleccionada : NgbDateStruct = this.dateToNgbDateStruct(this.hoy);
  fechaSeleccionadaTxt : string = this.fechaToString(this.hoy, 'dd-MM-yyyy');
  fechaMax: NgbDateStruct = this.dateToNgbDateStruct(this.hoy); 
  valor : string = '--';
  mensajeError : string = '';
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
  ];

  constructor(private indicadorEconomicoService : IndicadorEconomicoService) { }

  ngOnInit(): void {
    
  }

  onSeleccionFecha(): void{
    console.log("selecciono fecha" + this.fechaSeleccionadaTxt);
    this.indicadorEconomicoService
    .getIndicadorPorTipoYFecha(this.indicador.codigo, this.stringToDate(this.fechaSeleccionadaTxt))
    .subscribe({
      next: indicador => {
        if(indicador.valores.length == 0){
          this.valor = 'No hay valor para este día :(';
        }else{
          this.valor = this.mostrarPrefijo(indicador.unidad_Medida) + ' ' + this.numeroFormateadoCl(indicador.valores[0].valor);
        }
      },
      error: err => this.mensajeError = err
    });
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

  fechaToString(fecha:Date, formato:string): string {
    const datepipe: DatePipe = new DatePipe('en-US');
    let fechaFormateada =  datepipe.transform(fecha, formato);
    return fechaFormateada;
  }

  dateToNgbDateStruct(date: Date): NgbDateStruct {
    return date ? {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    } : null;
  }

  stringToDate(fecha : string) : Date{

    var fec = fecha.split('/');
    var fechaDate = new Date( Number(fec[2]), Number(fec[1])-1, Number(fec[0]));
    return fechaDate;
  }

  ngbDateStructToDate(date: NgbDateStruct): Date {
    return date ? new Date(date.year, date.month - 1, date.day) : null;
  }

}
