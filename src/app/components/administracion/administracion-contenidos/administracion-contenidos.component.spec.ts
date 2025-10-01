import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministracionContenidosComponent } from './administracion-contenidos.component';

describe('AdministracionContenidosComponent', () => {
  let component: AdministracionContenidosComponent;
  let fixture: ComponentFixture<AdministracionContenidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministracionContenidosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdministracionContenidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
