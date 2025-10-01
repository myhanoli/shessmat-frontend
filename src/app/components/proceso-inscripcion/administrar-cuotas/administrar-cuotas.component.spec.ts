import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarCuotasComponent } from './administrar-cuotas.component';

describe('AdministrarCuotasComponent', () => {
  let component: AdministrarCuotasComponent;
  let fixture: ComponentFixture<AdministrarCuotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministrarCuotasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdministrarCuotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
