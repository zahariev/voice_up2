import { Time } from "@angular/common";
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { BehaviorSubject, map, Subject, switchMap, take, timer } from "rxjs";

@Component({
  selector: "app-dice",
  templateUrl: "./dice.component.html",
  styleUrls: ["./dice.component.scss"],
})
export class DiceComponent implements OnInit {
  @Output() diceNum = new EventEmitter<number>();
  @ViewChild("dice") dice!: ElementRef<HTMLElement>;

  lastRoll = "";
  rolling = false;
  selectedRollCount = 1;
  selectedType = 4;
  start$ = new BehaviorSubject(0);
  emitTimer!: any;
  roller$ = this.start$.pipe(
    switchMap((max) => {
      return timer(0, 150).pipe(
        take(2),
        map((_) => {
          var randNum = this.getRandomInt(1, 7);

          return randNum;
        })
      );
    })
  );

  constructor() {}

  ngOnInit() {
    this.roller$.subscribe((roll) => {
      var showClass = "show-" + roll;
      if (this.lastRoll)
        this.dice.nativeElement.classList.remove(this.lastRoll);

      this.lastRoll = showClass;
      this.dice.nativeElement.classList.add(showClass);
    });
  }

  async roll() {
    this.start$.next(1);
  }

  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }
}
