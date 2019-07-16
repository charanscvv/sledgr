import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  totalOvers = null;
  inningsData = [];
  preMatchPanelFlag = true;
  selectedOverNo: any;
  selectedBallNo: any;
  totalScore = 0;
  activeOver = 0;
  batFirstTeam: any;
  innings = 0;
  currentBattingTeam = '';

  totalInningsData = {
    teamA: [],
    teamB: []
  };
  constructor() { }
}
