import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import uPlot from 'uplot';
import { UPlotTemplateComponent } from '../uplot-template/uplot-template.component';
import { PlotType } from '../../plot-type';
import { NgIf, NgSwitch, NgSwitchCase } from '@angular/common';

@Component({
  selector: 'app-real-time-plot',
  standalone: true,
  imports: [UPlotTemplateComponent, NgIf, NgSwitch, NgSwitchCase],
  templateUrl: './real-time-plot.component.html',
  styleUrl: './real-time-plot.component.css'
})
export class RealTimePlotComponent {
  @ViewChild('plotContainer', { static: true }) plotContainer: ElementRef | undefined;
  @Input() shouldRefresh: boolean = true;
  @Input() channelIndex: number;
  uplotInstance!: uPlot;
  intervalId: any;
  plotType: PlotType = PlotType.UPlot;
}
