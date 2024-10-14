import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit {

  private debouncer: Subject<string> = new Subject<string>();

  @Input()
  public placeholder: string = 'Search...';

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncer
    .pipe(
      debounceTime(300)
    )
    .subscribe((searchTerm) => {
      this.onDebounce.emit(searchTerm);
    });
  }

  public emitValue(value: string): void{
    this.onValue.emit(value);
  }

  public onKeyPress(searchTerm: string): void{
    // this.onValue.emit(searchTerm);
    this.debouncer.next(searchTerm);
  }

}
