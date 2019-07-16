import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { SharedService } from '../shared/services/shared.service';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.scss']
})
export class GameboardComponent implements OnInit {

  constructor(public sharedService: SharedService) { }

  setInningsData() {
    this.sharedService.inningsData = [];
    for (let i = 0; i < this.sharedService.totalOvers; i++) {
      this.sharedService.inningsData.push([null, null, null, null, null, null]);
    }
    this.sharedService.preMatchPanelFlag = false;
    this.sharedService.totalScore = 0;
    this.sharedService.activeOver = 0;
    if (this.sharedService.innings !== 2) {
      this.sharedService.innings = 1;
      this.sharedService.currentBattingTeam = this.sharedService.batFirstTeam;
    } else {
      this.sharedService.currentBattingTeam = this.sharedService.batFirstTeam === 'Team A' ? 'Team B' : 'Team A';
    }
  }

  setScore(score, extra?) {
    this.sharedService.inningsData[this.sharedService.selectedOverNo][this.sharedService.selectedBallNo] = score;
    this.calculateTotalScore();
  }
  calculateTotalScore() {
    this.sharedService.totalScore = 0;
    _.each(this.sharedService.inningsData, (over, overNo) => {
      _.each(over, (ball) => {
        if (ball === 1 || ball === 2 || ball === 3 || ball === 4 || ball === 5 || ball === 6) {
          this.sharedService.totalScore = this.sharedService.totalScore + ball;
        }
        if (ball === '↔' || ball === 'N') {
          console.log(_.find(over, (o) => (o === '↔' || o === 'N')).length)
          if (over.length < 6 + _.filter(over, (o) => (o === '↔' || o === 'N')).length) {
            this.sharedService.inningsData[overNo].push(null);
          }
          ++this.sharedService.totalScore;
        }
      });
    });
    this.setTeamScore();
  }

  setTeamScore() {
    if (this.sharedService.batFirstTeam === 'Team A') {
      if (this.sharedService.innings === 1) {
        this.sharedService.totalInningsData.teamA = this.sharedService.inningsData;
      }
      if (this.sharedService.innings === 2) {
        this.sharedService.totalInningsData.teamB = this.sharedService.inningsData;
      }
    } else if (this.sharedService.batFirstTeam === 'Team B') {
      if (this.sharedService.innings === 1) {
        this.sharedService.totalInningsData.teamB = this.sharedService.inningsData;
      }
      if (this.sharedService.innings === 2) {
        this.sharedService.totalInningsData.teamA = this.sharedService.inningsData;
      }
    }
  }

  updateOver() {
    if (this.sharedService.activeOver + 1 === this.sharedService.totalOvers) {
      console.log(this.sharedService.inningsData);
    }
    this.sharedService.activeOver = this.sharedService.activeOver + 1;
  }
  changeInnings() {
    this.sharedService.innings = 2;
    this.setInningsData();
  }

  ngOnInit() {
  }

}
