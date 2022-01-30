import { Time } from "@angular/common";
import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from "@angular/core";
import { BehaviorSubject, map, Subject, switchMap, take, timer } from "rxjs";

@Component({
  selector: "app-dice",
  templateUrl: "./dice.component.html",
  styleUrls: ["./dice.component.scss"],
})
export class DiceComponent implements AfterViewInit {
  @Output() diceNum = new EventEmitter<number>();
  rolling = false;
  selectedRollCount = 1;
  selectedType = 4;
  start$ = new BehaviorSubject(0);
  emitTimer!: any;
  roller$ = this.start$.pipe(
    switchMap((max) => {
      return timer(0, 50).pipe(
        take(10),
        map((_) => {
          let total = 0;
          for (let i = 0; i < this.selectedRollCount; i++) {
            total += this.calcRoll(6);
          }
          this.emitDiceNum(total);
          return total;
        })
      );
    })
  );

  constructor() {}

  emitDiceNum(num: number) {
    clearTimeout(this.emitTimer);
    this.emitTimer = setTimeout(() => {
      this.diceNum.emit(num);
    }, 300);
  }

  ngAfterViewInit(): void {
    // this.start();
  }

  calcRoll(max: number) {
    const min = 1;
    return Number((Math.random() * (max - min) + min).toFixed(0));
  }

  start() {
    this.diceNum.emit(0);
    this.selectedType = 6;
    this.start$.next(1);
  }
}
