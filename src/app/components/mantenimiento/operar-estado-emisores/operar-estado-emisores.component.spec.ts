import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperarEstadoEmisoresComponent } from './operar-estado-emisores.component';

describe('OperarEstadoEmisoresComponent', () => {
  let component: OperarEstadoEmisoresComponent;
  let fixture: ComponentFixture<OperarEstadoEmisoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperarEstadoEmisoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OperarEstadoEmisoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
