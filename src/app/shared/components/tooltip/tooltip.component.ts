import { OverlayModule } from '@angular/cdk/overlay';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  imports: [OverlayModule],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss'
})
export class TooltipComponent {
  message = input<string | undefined>();
}
