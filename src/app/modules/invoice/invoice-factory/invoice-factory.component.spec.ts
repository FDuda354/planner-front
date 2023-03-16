import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceFactoryComponent } from './invoice-factory.component';

describe('InvoiceFactoryComponent', () => {
  let component: InvoiceFactoryComponent;
  let fixture: ComponentFixture<InvoiceFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceFactoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
