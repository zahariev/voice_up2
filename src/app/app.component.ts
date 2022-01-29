import { Component, ElementRef, ViewChild } from "@angular/core";

import { BehaviorSubject, Subject } from "rxjs";
import { GameService } from "./game.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  @ViewChild("board") board!: ElementRef;

  marginTop = 0;

  constructor(public gs: GameService) {}
}
