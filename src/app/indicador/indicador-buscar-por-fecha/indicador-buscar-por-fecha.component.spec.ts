import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicadorBuscarPorFechaComponent } from './indicador-buscar-por-fecha.component';

describe('IndicadorBuscarPorFechaComponent', () => {
  let component: IndicadorBuscarPorFechaComponent;
  let fixture: ComponentFixture<IndicadorBuscarPorFechaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndicadorBuscarPorFechaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicadorBuscarPorFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
