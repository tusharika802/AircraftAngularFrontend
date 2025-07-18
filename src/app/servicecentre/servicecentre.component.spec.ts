import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicecentreComponent } from './servicecentre.component';

describe('ServicecentreComponent', () => {
  let component: ServicecentreComponent;
  let fixture: ComponentFixture<ServicecentreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServicecentreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicecentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
