import { Component, ElementRef, ViewChild } from '@angular/core';
import uPlot from 'uplot';

@Component({
  selector: 'app-real-time-plot',
  standalone: true,
  imports: [],
  templateUrl: './real-time-plot.component.html',
  styleUrl: './real-time-plot.component.css'
})
export class RealTimePlotComponent {
  @ViewChild('plotContainer', { static: true }) plotContainer: ElementRef | undefined;

  uplotInstance!: uPlot;
  data: any[] = [];

  ngAfterViewInit() {
    // Initial configuration for uPlot
    const options: uPlot.Options = {
      width: 800,
      height: 400,
      scales: { x: { time: false }, y: { auto: true } },
      series: [
        { label: 'Time' }, // x-axis (time)
        { label: 'Signal', stroke: 'blue', width: 1 }, // y-axis (signal)
      ]
    };

    // Initialize uPlot
    this.uplotInstance = new uPlot(options, [[], []], this.plotContainer?.nativeElement);

    // Start streaming data for real-time plotting
    this.startRealTimeData();
  }

  startRealTimeData() {
    let time = 0;

    setInterval(() => {
      const newX = time++;
      const newY = Math.sin(newX / 10) * 100 + Math.random() * 20;

      const currentXArray = Array.from(this.uplotInstance.data[0]).filter(x => x !== null && x !== undefined);
      const currentYArray = Array.from(this.uplotInstance.data[1]).filter(y => y !== null && y !== undefined);

      currentXArray.push(newX);
      currentYArray.push(newY);

      const newXArray = new Float64Array(currentXArray);
      const newYArray = new Float64Array(currentYArray);

      this.uplotInstance.setData([newXArray, newYArray]);
    }, 1000 / 128);
  }

}
