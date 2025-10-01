import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaBitacoraComponent } from './consulta-bitacora.component';

describe('ConsultaBitacoraComponent', () => {
  let component: ConsultaBitacoraComponent;
  let fixture: ComponentFixture<ConsultaBitacoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaBitacoraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultaBitacoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
