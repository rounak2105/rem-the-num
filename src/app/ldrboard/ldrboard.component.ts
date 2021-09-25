import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { GameComponent, myJSON } from '../game/game.component';

@Component({
  selector: 'app-ldrboard',
  templateUrl: './ldrboard.component.html',
  styleUrls: ['./ldrboard.component.scss'],
  providers: [GameComponent]
})
export class LdrboardComponent implements OnInit {

  gameComponent : GameComponent;
  score : myJSON[];
  ldrBoardName = [];
  ldrBoardScore = [];
  first = -1;
  firstScore = -1;
  second = -1;
  secondScore = -1
  third = -1;
  thirdScore = -1
  constructor(private apiService: ApiService) {
    this.apiService = apiService;
    this.apiService.getHighScore().subscribe((response: any) => {
      this.score = response;
      this.convertScoreArray();
      this.leaderBoard();
    });
  }

  ngOnInit(): void {
  }

  convertScoreArray() {

    for(var i=0;i<this.score.length;i++) 
      if(parseInt(this.score[i].note.split(",")[1]) > this.firstScore) {
        this.first = i;
        this.firstScore = parseInt(this.score[i].note.split(",")[1]);
      }

    for(i=0;i<this.score.length;i++)
      if(i!=this.first && parseInt(this.score[i].note.split(",")[1]) > this.secondScore) {
        this.second = i;
        this.secondScore = parseInt(this.score[i].note.split(",")[1]);
      }
    
    for(i=0;i<this.score.length;i++)
      if(i!=this.first && i!=this.second && parseInt(this.score[i].note.split(",")[1]) > this.thirdScore) {
        this.third = i;
        this.thirdScore = parseInt(this.score[i].note.split(",")[1]);
      }
  
  }

  leaderBoard() {
      this.ldrBoardName[0] = this.score[this.first].note.split(",")[0];
      this.ldrBoardScore[0] = this.score[this.first].note.split(",")[1];
      this.ldrBoardName[1] = this.score[this.second].note.split(",")[0];
      this.ldrBoardScore[1] = this.score[this.second].note.split(",")[1];
      this.ldrBoardName[2] = this.score[this.third].note.split(",")[0];
      this.ldrBoardScore[2] = this.score[this.third].note.split(",")[1];
  }

}
