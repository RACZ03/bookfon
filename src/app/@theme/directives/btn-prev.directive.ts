import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appBtnPrev]'
})
export class BtnPrevDirective {

  constructor(
    private el: ElementRef
  ) { 
  }

  @HostListener('click') 
  prevFunc() {
    let elem = this.el.nativeElement.parentElement.parentElement.children[0];
    let item = elem.getElementsByClassName('item');
    
    elem.prepend(item[item.length - 1]);
  }

}
