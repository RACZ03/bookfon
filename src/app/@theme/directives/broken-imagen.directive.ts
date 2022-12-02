import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appBrokenImagen]'
})
export class BrokenImagenDirective {
  @Input() urlCustom!: string;

  constructor(
    private element: ElementRef
  ) { }

  @HostListener('error')
  loadImage() {
    const element = this.element.nativeElement;
    element.src = this.urlCustom || 'assets/images/bookfons/user-found-1.png';
  }

}
