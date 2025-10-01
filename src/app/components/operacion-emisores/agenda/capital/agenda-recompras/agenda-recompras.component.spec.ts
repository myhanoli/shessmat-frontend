import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaRecomprasComponent } from './agenda-recompras.component';

describe('AgendaRecomprasComponent', () => {
  let component: AgendaRecomprasComponent;
  let fixture: ComponentFixture<AgendaRecomprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgendaRecomprasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgendaRecomprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
