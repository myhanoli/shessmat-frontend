import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaRecomprasFibrasComponent } from './agenda-recompras-fibras.component';

describe('AgendaRecomprasFibrasComponent', () => {
  let component: AgendaRecomprasFibrasComponent;
  let fixture: ComponentFixture<AgendaRecomprasFibrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgendaRecomprasFibrasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgendaRecomprasFibrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
