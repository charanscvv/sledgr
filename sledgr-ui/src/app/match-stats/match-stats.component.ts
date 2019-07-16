import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { SharedService } from '../shared/services/shared.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-match-stats',
  templateUrl: './match-stats.component.html',
  styleUrls: ['./match-stats.component.scss']
})
export class MatchStatsComponent implements OnInit {

  teamAData = {
    lineGraphData: []
  };
  teamBData = {
    lineGraphData: []
  };
  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Team A' },
    { data: [], label: 'Team B' }
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'rgb(255, 120, 0)',
      backgroundColor: 'rgba(255, 120, 0, 0.44)',
    },
    {
      borderColor: 'blue',
      backgroundColor: 'rgba(0, 18, 255, 0.44)',
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  constructor(public sharedService: SharedService) { }

  setLineGraphData() {
    this.teamAData.lineGraphData = [];
    this.teamBData.lineGraphData = [];
    let overEndTotal = 0;
    _.each(this.sharedService.totalInningsData.teamA, (over) => {
      _.each(over, (ball) => {
        if (ball === 1 || ball === 2 || ball === 3 || ball === 4 || ball === 5 || ball === 6) {
          overEndTotal = overEndTotal + ball;
        }
        if (ball === '↔' || ball === 'N') {
          ++overEndTotal;
        }
      });
      this.teamAData.lineGraphData.push(overEndTotal);
    });
    this.lineChartData[0].data = this.teamAData.lineGraphData;
    overEndTotal = 0;
    _.each(this.sharedService.totalInningsData.teamB, (over) => {
      _.each(over, (ball) => {
        if (ball === 1 || ball === 2 || ball === 3 || ball === 4 || ball === 5 || ball === 6) {
          overEndTotal = overEndTotal + ball;
        }
        if (ball === '↔' || ball === 'N') {
          ++overEndTotal;
        }
      });
      this.teamBData.lineGraphData.push(overEndTotal);
    });
    this.lineChartData[1].data = this.teamBData.lineGraphData;
  }



  ngOnInit() {
    this.lineChartLabels = [];
    for (let i = 0; i < this.sharedService.totalOvers; i++) {
      this.lineChartLabels.push(`Over ${i + 1}`);
    }
    this.setLineGraphData();
  }

}
