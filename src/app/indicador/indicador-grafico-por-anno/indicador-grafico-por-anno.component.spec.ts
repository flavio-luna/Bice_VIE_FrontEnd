import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicadorGraficoPorAnnoComponent } from './indicador-grafico-por-anno.component';

describe('IndicadorGraficoPorAnnoComponent', () => {
  let component: IndicadorGraficoPorAnnoComponent;
  let fixture: ComponentFixture<IndicadorGraficoPorAnnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndicadorGraficoPorAnnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicadorGraficoPorAnnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
