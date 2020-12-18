import { Component, OnInit } from '@angular/core';
import { IIndicador } from '../indicador';
import { IndicadorEconomicoService } from '../indicador-economico.service';

@Component({
  selector: 'app-indicador-lista',
  templateUrl: './indicador-lista.component.html',
  styleUrls: ['./indicador-lista.component.css']
})
export class IndicadorListaComponent implements OnInit {

  indicadores: IIndicador[];
  indicadoresInicial: IIndicador[];
  mensajeError = '';


  constructor(private indicadorEconomicoService : IndicadorEconomicoService) { 
    
  }

  _filtro = '';
  get filtro(): string{
      return this._filtro;
  }

  set filtro(valor : string){
      this._filtro = valor;
      this.indicadores = valor == "" 
      ? this.indicadoresInicial 
      : this.filtrarInidicadores(valor);
  }

  filtrarInidicadores(filtro : string) : IIndicador[]
  {
      return this.indicadoresInicial.filter((indicador: IIndicador) =>
      indicador.nombre.toLocaleLowerCase().indexOf(filtro.toLocaleLowerCase()) !== -1);
  }

  

  ngOnInit(): void {
      this.indicadorEconomicoService.getTodos().subscribe({
          next: indicadores => {
              console.log(indicadores);
              this.indicadores = indicadores;
              this.indicadoresInicial = indicadores;
          },
          error: err => this.mensajeError = err
      });
  }

}
