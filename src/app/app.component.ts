import {
  Component,
  ElementRef,
  HostListener,
  Renderer2,
  ViewChild,
} from "@angular/core";

import { BehaviorSubject, Subject, timeout } from "rxjs";
import { GameService } from "./game.service";

enum diceNumbers {
  "#465658",
  "#f4c903",
  "#fdae3e",
  "#ec76a4",
  "#9056bd",
  "#5084ef",
  "#34bbd2",
}
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  @ViewChild("board") board!: ElementRef;
  @HostListener("document:mousemove", ["$event"])
  onMouseMove(e: Event) {
    this.shake = true;
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.shake = false;
    }, 1000);
  }

  timeout: any;
  diceNum = diceNumbers;
  marginTop = 0;
  shake = false;

  constructor(public gs: GameService, private renderer: Renderer2) {}

  diceChange(diceNum: number): void {
    if (diceNum === 0) return;
  }
}
