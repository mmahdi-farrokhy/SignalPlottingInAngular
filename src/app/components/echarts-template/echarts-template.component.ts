import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-echarts-template',
  standalone: true,
  imports: [],
  templateUrl: './echarts-template.component.html',
  styleUrl: './echarts-template.component.css'
})
export class EChartsTemplateComponent {
  @ViewChild('chartContainer', { static: true }) chartContainer: ElementRef;
  @Input() shouldRefresh: boolean = true;
  @Input() channelIndex: number;

  echartsInstance!: echarts.ECharts;
  intervalId: any;
  buffer: { x: number[], y: number[] } = { x: [], y: [] };
  downsampleRate: number = 1000; // Set your downsampling rate

  maxPoints: number = 1280; // 10 seconds window (128 points/second)
  bufferX: number[] = [];
  bufferY: number[] = [];

  ngAfterViewInit() {
    const option: echarts.EChartsOption = {
      xAxis: { type: 'value' },
      yAxis: { type: 'value' },
      series: [{
        type: 'line',
        data: [],
      }],
      animation: false // Disable animation for better performance
    };

    this.echartsInstance = echarts.init(this.chartContainer?.nativeElement);
    this.echartsInstance.setOption(option);

    if (this.shouldRefresh) {
      this.startRealTimeData();
    }
  }

  startRealTimeData() {
    let time = 0;

    this.intervalId = setInterval(() => {
      if (!this.shouldRefresh) return;

      const newX = time / 128; // Convert time to seconds (128 points/second)
      const newY = Math.sin(newX * 2 * Math.PI) * 100; // Example signal

      // Add new data point
      this.bufferX.push(newX);
      this.bufferY.push(newY);

      // Maintain the buffer size within maxPoints
      if (this.bufferX.length > this.maxPoints) {
        this.bufferX.shift(); // Remove the oldest X point
        this.bufferY.shift(); // Remove the oldest Y point
      }

      // Update the plot with the new data
      this.echartsInstance.setOption({
        series: [{
          data: this.bufferX.map((x, i) => [x, this.bufferY[i]]),
        }],
        xAxis: {
          min: Math.max(0, newX - 10), // Keep X-axis window sliding
          max: newX, // Update max value of X-axis
        },
      });

      time++;
    }, 1000 / 128); // 128 points per second
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
