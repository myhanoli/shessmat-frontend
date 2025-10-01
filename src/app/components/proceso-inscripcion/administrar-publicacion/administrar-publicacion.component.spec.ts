import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarPublicacionComponent } from './administrar-publicacion.component';

describe('AdministrarPublicacionComponent', () => {
  let component: AdministrarPublicacionComponent;
  let fixture: ComponentFixture<AdministrarPublicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministrarPublicacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdministrarPublicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
