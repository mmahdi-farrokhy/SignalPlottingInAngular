import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import uPlot from 'uplot';

@Component({
  selector: 'app-uplot-template',
  standalone: true,
  imports: [],
  templateUrl: './uplot-template.component.html',
  styleUrl: './uplot-template.component.css'
})
export class UPlotTemplateComponent {
  @ViewChild('plotContainer', { static: true }) plotContainer: ElementRef;
  @Input() shouldRefresh: boolean = true;
  @Input() channelIndex: number;
  uplotInstance!: uPlot;
  intervalId: any;


  ngAfterViewInit() {
    const options: uPlot.Options = {
      width: 1000,
      height: 200,
      scales: { x: { time: false }, y: { auto: true } },
      axes: [
        {
          // Customize the x-axis to display seconds
          label: "Seconds",
          values: (u, vals) => vals.map(v => v.toFixed(2)) // formatting values to 2 decimal places
        },
        {
          label: `Signal ${this.channelIndex}`
        }
      ],
      series: [
        { label: 'Time' },
        { label: `Signal ${this.channelIndex}`, stroke: 'blue', width: 1 },
      ]
    };

    this.uplotInstance = new uPlot(options, [[], []], this.plotContainer?.nativeElement);

    if (this.shouldRefresh) {
      this.startRealTimeData();
    }
  }

  startRealTimeData() {
    let time = 0;
    this.uplotInstance.setData([new Float64Array([]), new Float64Array([])]);

    this.intervalId = setInterval(() => {
      if (!this.shouldRefresh) return;

      const newX = time++;
      const newY = Math.sin(newX / 10) * 100;

      const currentXArray = Array.from(this.uplotInstance.data[0]).filter(x => x !== null && x !== undefined);
      const currentYArray = Array.from(this.uplotInstance.data[1]).filter(y => y !== null && y !== undefined);

      currentXArray.push(newX / 32);
      currentYArray.push(newY);

      const newXArray = new Float64Array(currentXArray);
      const newYArray = new Float64Array(currentYArray);

      this.uplotInstance.setData([newXArray, newYArray]);
    }, 1000 / 40);
  }

  stopRealTimeData() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  ngOnChanges() {
    if (this.shouldRefresh) {
      this.startRealTimeData();
    } else {
      this.stopRealTimeData();
    }
  }
}