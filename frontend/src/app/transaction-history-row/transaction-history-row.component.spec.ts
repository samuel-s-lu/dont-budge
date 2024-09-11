import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionHistoryRowComponent } from './transaction-history-row.component';

describe('TransactionHistoryRowComponent', () => {
  let component: TransactionHistoryRowComponent;
  let fixture: ComponentFixture<TransactionHistoryRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionHistoryRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionHistoryRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
