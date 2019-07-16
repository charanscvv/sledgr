import { Component, OnInit } from '@angular/core';
import { playerList } from './payload';
import * as _ from 'lodash';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  playerList = playerList;
  teamA: any = [];
  teamB: any = [];
  teamsMade: boolean;
  toTeamA: boolean;
  swapCount = 0;
  swapLimit = 4;

  randomizeTeam() {
    this.teamsMade = false;
    this.teamA = [];
    this.teamB = [];
    this.swapCount = 0;
    this.shuffleArray(this.playerList);
    console.log(JSON.parse(JSON.stringify(this.playerList)));
    this.toTeamA = true;
    _.each(this.playerList, (player) => {
      this.insertPlayer(player);
    });
    // this.teamA = _.orderBy(this.teamA, 'rating', 'desc');
    // this.teamB = _.orderBy(this.teamB, 'rating', 'desc');
    this.teamsMade = true;
  }

  insertPlayer(player) {
    if (this.teamA.length === 0) {
      this.teamA.push(player);
    } else if (this.teamB.length === 0) {
      this.teamB.push(player);
    } else {
      // console.log(JSON.parse(JSON.stringify(this.teamA)), JSON.parse(JSON.stringify(player)), JSON.parse(JSON.stringify(this.teamB)));
      if (_.filter(this.teamA, (prospect) => prospect.rating === player.rating).length < _.filter(this.teamB, (prospect) => prospect.rating === player.rating).length) {
        this.teamA.push(player);
      } else if ((_.filter(this.teamA, (prospect) => prospect.rating === player.rating).length > _.filter(this.teamB, (prospect) => prospect.rating === player.rating).length)) {
        this.teamB.push(player);
      } else {
        if (this.toTeamA) {
          this.teamA.push(player);
        } else {
          this.teamB.push(player);
        }
        this.toTeamA = !this.toTeamA;
      }
    }
  }

  moveToTeamB(playerToMove) {
    ++this.swapCount;
    this.teamB.push(playerToMove);
    this.deletePlayerTeamA(playerToMove);
  }
  deletePlayerTeamA(selecterPlayer) {
    _.each(this.teamA, (player, index) => {
      if (player) {
        if (player.playerName === selecterPlayer.playerName) {
          this.teamA.splice(index, 1);
          return;
        }
      }
    });
  }
  moveToTeamA(playerToMove) {
    ++this.swapCount;
    this.teamA.push(playerToMove);
    this.deletePlayerTeamB(playerToMove);
  }
  deletePlayerTeamB(selecterPlayer) {
    _.each(this.teamB, (player, index) => {
      if (player) {
        if (player.playerName === selecterPlayer.playerName) {
          this.teamB.splice(index, 1);
          return;
        }
      }
    });
  }
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  ngOnInit() {
    this.randomizeTeam();
  }

}
