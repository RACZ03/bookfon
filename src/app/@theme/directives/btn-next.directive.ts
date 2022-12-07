import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appBtnNext]'
})
export class BtnNextDirective {

  constructor(
    private el: ElementRef
  ) { 
  }

  @HostListener('click') 
  nextFunc() {
    // console.log('CLICKED')
    let elem = this.el.nativeElement.parentElement.parentElement.children[0];
    let item = elem.getElementsByClassName('item');
    
    elem.append(item[0]);
  }

}
