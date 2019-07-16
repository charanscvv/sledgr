import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  totalOvers = null;
  currentInnings = {
    wicketsDown: 0,
    totalScore: null,
    ballsLeft: 0,
    extras: 0,
    crr: 0,
    rrr: 0,
    inningsData: []
  };
  targetScore = 0;
  preMatchPanelFlag = true;
  selectedOverNo: any;
  selectedBallNo: any;
  activeOver = 0;
  batFirstTeam: any;
  innings = 0;
  currentBattingTeam = '';
  matchData = {
    teamA: {},
    teamB: {}
  }

  totalInningsData = {
    teamA: [],
    teamB: []
  };
  constructor() { }
}
