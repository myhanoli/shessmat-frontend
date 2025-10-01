import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaTenedoresComponent } from './agenda-tenedores.component';

describe('AgendaTenedoresComponent', () => {
  let component: AgendaTenedoresComponent;
  let fixture: ComponentFixture<AgendaTenedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgendaTenedoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgendaTenedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
