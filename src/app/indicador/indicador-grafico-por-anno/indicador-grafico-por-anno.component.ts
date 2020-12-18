import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { IIndicador } from '../indicador';
import { ISerie } from '../serie';
import { IndicadorEconomicoService } from '../indicador-economico.service'

@Component({
  selector: 'app-indicador-grafico-por-anno',
  templateUrl: './indicador-grafico-por-anno.component.html',
  styleUrls: ['./indicador-grafico-por-anno.component.css']
})
export class IndicadorGraficoPorAnnoComponent implements OnInit {
  @Input() indicador : IIndicador;
  mensajeError : string;
  cambioAnno : boolean = false;
  mostrarGrafico : boolean = true;
  mostrarTabla : boolean = false;
  annoSel : string = 'Seleccione año...';
  radioVerComo = 'grafico';
  datosCargadosPrimeraVez : boolean = false;

  configGrafico: any = {
    titulo : '' ,
    tipo : 'LineChart',
    data : [],
    nombreColumnas : ['Fecha', ],
    opciones :{
      colores: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'], 
      hAxis: {titleTextStyle: {color: 'Black'}, format: "dd-MM"},
      is3D: true
    },
    altura: 300,
    ancho: 2000
  }
  
  //considerar dejar modulo para formateo de variables
  numeroFormateadoCl(numero:number) : string{
      return Number(numero).toLocaleString('es-CL');
  }

  fechaToString(fecha:Date, formato:string): string {
    const datepipe: DatePipe = new DatePipe('en-US');
    let fechaFormateada =  datepipe.transform(fecha, formato);
    return fechaFormateada;
  }

  variacionHtml(valorActual: number, valorAnterior:number): string{
    var variacionPorcentual = ((valorActual * 100)/valorAnterior) - 100;
    var variacionNominal = valorActual - valorAnterior;
    var tipoVariacion = '';
    var icono = '';
    if(variacionNominal > 0){
      tipoVariacion = 'Subió ' + this.numeroFormateadoCl(variacionPorcentual) + '%, un total de ' + this.numeroFormateadoCl(variacionNominal) + ' ' + this.indicador.unidad_Medida;
      icono = '';
    }else if(variacionNominal < 0){
      tipoVariacion = 'Bajó ' + this.numeroFormateadoCl(variacionPorcentual) + '%, un total de ' + this.numeroFormateadoCl(variacionNominal) + ' ' + this.indicador.unidad_Medida;
      icono = '';
    }else{
      tipoVariacion = 'se mantuvo igual';
      icono = '';
    }
    return tipoVariacion;
  }
  
  constructor(private indicadorEconomicoService : IndicadorEconomicoService) { }

  ngOnInit(): void {
    this.configGrafico.nombreColumnas.push(this.indicador.unidad_Medida);
  }

  mostrarTablaClick() : void{
    this.mostrarTabla = true;
    this.mostrarGrafico = false;
  }

  mostrarGraficoClick() : void{
    this.mostrarGrafico = true;
    this.mostrarTabla = false;
  }

  onVerClicked(anno: string) : void{
    this.cargarDataAnual(anno);
  }

  onAnnoChange() : void {
    this.cargarDataAnual(this.annoSel);
  }

  cargarDataAnual(anno: string): void{
      this.indicadorEconomicoService.getIndicadorPorTipoYAnno(this.indicador.codigo, anno)
      .subscribe({
        next: indicador  => {
          this.indicador.valores = indicador.valores;

          this.configGrafico.data = indicador.valores
          .reverse() 
          .map(function (valor, index, array) {
              return [ new Date(valor.fecha) , valor.valor];
          });

          this.indicador.valores.reverse();          
          this.datosCargadosPrimeraVez = true;
        },
        error: err => this.mensajeError = err
      });
  }

  onMostrarData(){

  }


}
