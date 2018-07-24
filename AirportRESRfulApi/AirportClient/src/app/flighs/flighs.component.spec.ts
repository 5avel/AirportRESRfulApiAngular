import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlighsComponent } from './flighs.component';

describe('FlighsComponent', () => {
  let component: FlighsComponent;
  let fixture: ComponentFixture<FlighsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlighsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlighsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
