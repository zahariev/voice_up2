import { Component, ElementRef, Renderer2, ViewChild } from "@angular/core";

import { BehaviorSubject, Subject } from "rxjs";
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
  diceNum = diceNumbers;
  marginTop = 0;

  constructor(public gs: GameService, private renderer: Renderer2) {}

  diceChange(diceNum: number): void {
    if (diceNum === 0) return;
    this.renderer.setStyle(
      document.body,
      "background-color",
      this.diceNum[diceNum]
    );
  }
}
