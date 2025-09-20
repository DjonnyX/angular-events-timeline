import { ComponentRef, Directive, ElementRef, HostListener, inject, input, OnInit } from '@angular/core';
import { Overlay, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { TooltipComponent } from '../../components/tooltip/tooltip.component';

@Directive({
  selector: '[tooltip]',
})
export class TooltipDirective implements OnInit {
  message = input<string | undefined>();

  @HostListener('mouseenter')
  show() {
    if (!this.message()) {
      return;
    }

    const tooltipPortal = new ComponentPortal(TooltipComponent),
      tooltipRef: ComponentRef<TooltipComponent> = this._overlayRef.attach(tooltipPortal);

    tooltipRef.instance.message = this.message;
  }

  @HostListener('mouseout')
  hide() {
    this._overlayRef.detach();
  }

  private _overlayRef: OverlayRef;

  private _overlayPositionBuilder = inject(OverlayPositionBuilder);

  private _overlay = inject(Overlay);

  private _elementRef = inject(ElementRef);

  constructor() {
    this._overlayRef = this._overlay.create()
  }

  ngOnInit() {
    const positionStrategy = this._overlayPositionBuilder
      .flexibleConnectedTo(this._elementRef)
      .withPositions([{
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom',
        offsetY: -2,
      }]);

    this._overlayRef = this._overlay.create({ positionStrategy });
  }
}
