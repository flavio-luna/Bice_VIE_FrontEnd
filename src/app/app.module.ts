import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IndicadorDetalleComponent } from './indicador/indicador-detalle/indicador-detalle.component';
import { IndicadorListaComponent } from './indicador/indicador-lista/indicador-lista.component';
import { IndicadorBuscarPorFechaComponent } from './indicador/indicador-buscar-por-fecha/indicador-buscar-por-fecha.component';
import { IndicadorGraficoPorAnnoComponent } from './indicador/indicador-grafico-por-anno/indicador-grafico-por-anno.component';
import { GoogleChartsModule } from 'angular-google-charts';

import localeEsCL from '@angular/common/locales/es-CL';
registerLocaleData(localeEsCL, 'es-CL');

@NgModule({
  declarations: [
    AppComponent,
    IndicadorDetalleComponent,
    IndicadorListaComponent,
    IndicadorBuscarPorFechaComponent,
    IndicadorGraficoPorAnnoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    GoogleChartsModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es-CL' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
