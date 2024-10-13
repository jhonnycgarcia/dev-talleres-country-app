import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent {

  @Input()
  public placeholder: string = 'Search...';

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter<string>();

  public emitValue(value: string): void{
    this.onValue.emit(value);
  }

}