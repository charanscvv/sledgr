import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { SharedService } from '../shared/services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.scss']
})
export class GameboardComponent implements OnInit {

  constructor(public sharedService: SharedService, public router: Router) { }

  setInningsData() {
    this.sharedService.currentInnings = {
      wicketsDown: 0,
      totalScore: null,
      extras: 0,
      ballsLeft: this.sharedService.totalOvers * 6,
      crr: 0,
      rrr: 0,
      inningsData: []
    };
    for (let i = 0; i < this.sharedService.totalOvers; i++) {
      this.sharedService.currentInnings.inningsData.push([null, null, null, null, null, null]);
    }
    this.sharedService.preMatchPanelFlag = false;
    this.sharedService.currentInnings.totalScore = 0;
    this.sharedService.activeOver = 0;
    if (this.sharedService.innings !== 2) {
      this.sharedService.innings = 1;
      this.sharedService.currentBattingTeam = this.sharedService.batFirstTeam;
    } else {
      this.sharedService.currentBattingTeam = this.sharedService.batFirstTeam === 'Team A' ? 'Team B' : 'Team A';
    }
    this.calculateTotalScore();
  }

  setScore(score) {
    this.sharedService.currentInnings.inningsData[this.sharedService.selectedOverNo][this.sharedService.selectedBallNo] = score;
    this.calculateTotalScore();
  }
  calculateTotalScore() {
    this.sharedService.currentInnings.totalScore = 0;
    this.sharedService.currentInnings.wicketsDown = 0;
    _.each(this.sharedService.currentInnings.inningsData, (over, overNo) => {
      if (overNo <= this.sharedService.activeOver) {
        let currentOverBalls = 0;
        let currentOverRemainingBalls = 0;
        _.each(over, (ball) => {
          if (ball === 1 || ball === 2 || ball === 3 || ball === 4 || ball === 5 || ball === 6) {
            this.sharedService.currentInnings.totalScore = this.sharedService.currentInnings.totalScore + ball;
          }
          if (ball === '↔' || ball === 'N') {
            if (over.length < 6 + _.filter(over, (o) => (o === '↔' || o === 'N')).length) {
              this.sharedService.currentInnings.inningsData[overNo].push(null);
            }
            ++this.sharedService.currentInnings.totalScore;
            ++this.sharedService.currentInnings.extras;
          }
          if (this.sharedService.innings === 2 && this.sharedService.currentInnings.totalScore >= this.sharedService.targetScore) {
            this.router.navigate(['/match-stats']);
          }
          if (ball === 'W') {
            this.sharedService.currentInnings.wicketsDown++;
          }
          if (ball !== null && ball !== '↔' && ball !== 'N') {
            currentOverBalls++;
          }
          this.sharedService.currentInnings.crr = Number((this.sharedService.currentInnings.totalScore * 6 / ((this.sharedService.activeOver * 6) + currentOverBalls)).toFixed(2));

          if (this.sharedService.innings === 2) {
            if (ball === null) {
              currentOverRemainingBalls++;
            }
            this.sharedService.currentInnings.ballsLeft = (((this.sharedService.totalOvers - (this.sharedService.activeOver + 1)) * 6) + currentOverRemainingBalls);
            this.sharedService.currentInnings.rrr = Number((((this.sharedService.targetScore - this.sharedService.currentInnings.totalScore) * 6) / this.sharedService.currentInnings.ballsLeft).toFixed(2));
          }
        });
      }
    });
    this.setTeamScore();
  }

  setTeamScore() {
    if (this.sharedService.batFirstTeam === 'Team A') {
      if (this.sharedService.innings === 1) {
        this.sharedService.totalInningsData.teamA = this.sharedService.currentInnings.inningsData;
        this.sharedService.matchData.teamA = _.cloneDeep(this.sharedService.currentInnings);
      }
      if (this.sharedService.innings === 2) {
        this.sharedService.totalInningsData.teamB = this.sharedService.currentInnings.inningsData;
        this.sharedService.matchData.teamB = _.cloneDeep(this.sharedService.currentInnings);
      }
    } else if (this.sharedService.batFirstTeam === 'Team B') {
      if (this.sharedService.innings === 1) {
        this.sharedService.totalInningsData.teamB = this.sharedService.currentInnings.inningsData;
        this.sharedService.matchData.teamB = _.cloneDeep(this.sharedService.currentInnings);
      }
      if (this.sharedService.innings === 2) {
        this.sharedService.totalInningsData.teamA = this.sharedService.currentInnings.inningsData;
        this.sharedService.matchData.teamA = _.cloneDeep(this.sharedService.currentInnings);
      }
    }
  }

  updateOver() {
    if (!(_.filter(this.sharedService.currentInnings.inningsData[this.sharedService.activeOver], (score) => score === null).length > 0)) {
      this.sharedService.activeOver = this.sharedService.activeOver + 1;
    }
  }
  changeInnings() {
    this.sharedService.innings = 2;
    this.sharedService.targetScore = this.sharedService.currentInnings.totalScore + 1;

    this.setInningsData();
  }

  ngOnInit() {
  }

}
