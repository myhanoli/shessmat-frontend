import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambioEmisoraComponent } from './cambio-emisora.component';

describe('CambioEmisoraComponent', () => {
  let component: CambioEmisoraComponent;
  let fixture: ComponentFixture<CambioEmisoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CambioEmisoraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CambioEmisoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
