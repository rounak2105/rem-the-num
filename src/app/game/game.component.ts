import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

export interface myJSON {
  uid: string;
  note: string;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent{

  title = 'rem-the-num';
  currentLevel = 1;
  gameStarted = false;
  gameGuess = false;
  gameLost = false;
  newScore = false
  noToRem = 0;
  scores: myJSON[] = [];
  counter: {sec: number }
  payload = {
    uid : '210500',
    note : ''
  };

  constructor(private apiService: ApiService) {
    this.apiService = apiService;
    this.apiService.getHighScore().subscribe((response: any) => {
      this.scores = response;
    });
  }

  reset() {
    this.currentLevel = 1;
    this.gameStarted = false;
    this.gameGuess = false;
    this.noToRem = 0;
    window.location.reload();
  }

  startTimer(secs) {
    this.counter = { sec: secs }
    setInterval(() => {
      if (this.counter.sec - 1 == -1) {
        this.counter.sec = 59
      } 
      else this.counter.sec -= 1
      if (this.counter.sec == 0) this.guessTheNumber()
    }, 1000)
  }

  startGame() {
    this.noToRem = this.getRandom(this.currentLevel+2)
    this.gameStarted = true;
    if(this.currentLevel!=1)
      this.startTimer(10 + this.currentLevel*2)
    else
      this.startTimer(5);
  }

  guessTheNumber() {
    this.gameStarted = false;
    this.gameGuess = true;
  }

  getRandom(length) {
    return Math.floor(Math.pow(10, length-1) + Math.random() * 9 * Math.pow(10, length-1));
    }

  guessedNumber(num) {
    this.gameGuess = false
    if(num==this.noToRem) 
      this.nextLevel();
    else
      this.gameOver();
  }

  nextLevel() {
    this.currentLevel += 1;
    this.startGame()
  }

  gameOver() {
    this.gameLost = true;
    this.isHighScore(this.currentLevel);
  }

  isHighScore(level) {

    var greaterOnce = 0;
    for(var i=0;i<this.scores.length;i++)
      if(parseInt(this.scores[i].note.split(",")[1]) >= level)
        greaterOnce += 1;

    if(greaterOnce < 3) 
      this.newHighScore();
    else
      setTimeout(this.reset, 2000);

  }

  newHighScore() {
    this.newScore = true;
  }

  highScore(name) {
    this.payload.note = name + "," + this.currentLevel;
    this.apiService.addHighScore(this.payload).subscribe((response: any) => {
      console.log(response)
    });
    setTimeout(this.reset, 1000); 
  }

}
