import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'
import { DatePipe } from '@angular/common';

import {IIndicador} from './indicador';

@Injectable({ providedIn: 'root' })
export class IndicadorEconomicoService {
    private urlApiIndicadores = 'https://localhost:44349/api/IndicadoresEconomicos';

    constructor(private http: HttpClient){}

    getTodos() : Observable<IIndicador[]>{
        return this.http.get<IIndicador[]>
        (this.urlApiIndicadores + '/todos')
        .pipe( catchError(this.manejarError));
    }

    getIndicadorPorTipo(tipo : string) : Observable<IIndicador | undefined>{
        return this.http.get<IIndicador>
        (this.urlApiIndicadores + '/por-tipo?tipo=' + tipo);
    }

    getIndicadorPorTipoYFecha(tipo : string, fecha: Date) : Observable<IIndicador | undefined>{
        var param =  '/por-tipo-y-fecha?tipo=' + tipo + '&fecha=' + this.fechaToString(fecha,'yyyy-MM-dd');
        return this.http.get<IIndicador>
        (this.urlApiIndicadores + param);
    }

    getIndicadorPorTipoYAnno(tipo : string, anno: string) : Observable<IIndicador | undefined>{
        var param =  '/por-tipo-y-anno?tipo=' + tipo + '&anno=' + anno;
        return this.http.get<IIndicador>
        (this.urlApiIndicadores + param);
    }

    fechaToString(fecha:Date, formato:string): string {
        const datepipe: DatePipe = new DatePipe('en-US');
        let fechaFormateada =  datepipe.transform(fecha, formato);
        return fechaFormateada;
      }

    private manejarError(err: HttpErrorResponse)
    {
        let mensajeError = ''
        if(err.error instanceof ErrorEvent){
            mensajeError = 'error en cliente  ${err.error.message}';
        }else{
            mensajeError = 'error en Servidor, Status:${err.status}, mensaje: ${err.message}';
        }
        return throwError(mensajeError);
    }
}