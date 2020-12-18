import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicadorListaComponent } from './indicador-lista.component';

describe('IndicadorListaComponent', () => {
  let component: IndicadorListaComponent;
  let fixture: ComponentFixture<IndicadorListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndicadorListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicadorListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
