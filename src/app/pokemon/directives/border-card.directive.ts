// applique un effet de bordure au survol d'un élement

import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
  selector: "[appBorderCard]",
})
export class BorderCardDirective {
  // propriétés de la bordure
  initialColor: string = "#f5f5f5";
  defaultColor: string = "#009688";
  defaultHeight: number = 180;

  constructor(private _el: ElementRef) {
    this.setHeight(this.defaultHeight);
    this.setBorder(this.initialColor);
  }

  // permet d'indiquer un paramètre à la directive
  @Input("appBorderCard") borderColor!: string;

  @HostListener("mouseenter") onMouseEnter(): void {
    // on applique la coulour indiquée dans le paramètre, sinon on utilise une couleur par défaut
    this.setBorder(this.borderColor || this.defaultColor);
  }
  @HostListener("mouseleave") onMouseLeave(): void {
    // on remet la couleur initiale
    this.setBorder(this.initialColor);
  }
  // fixe la  taille de la bordure
  setHeight(height: number): void {
    this._el.nativeElement.style.height = `${height}px`;
  }
  // fixe la couleur de la bordure
  setBorder(color: string): void {
    this._el.nativeElement.style.border = `solid 4px ${color}`;
  }
}
