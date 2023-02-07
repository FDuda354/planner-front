import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullpageuserComponent } from './fullpageuser.component';

describe('FullpageuserComponent', () => {
  let component: FullpageuserComponent;
  let fixture: ComponentFixture<FullpageuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullpageuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullpageuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
