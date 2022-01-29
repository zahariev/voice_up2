import { Component, OnInit } from "@angular/core";
import texts from "../../assets/translation.json";
import { GameService } from "../game.service";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
})
export class MenuComponent implements OnInit {
  TEXT = texts;

  constructor(public gs: GameService) {}

  ngOnInit(): void {}

  resetGame() {
    this.toggleZoom(false);
    this.gs.resetGame();
  }

  showAllCards() {
    if (this.gs.checkedIcons) return;
    this.gs.checkboxHide = false;
    this.gs.minify = true;
    this.gs.showAllCards();
  }

  positionReset() {
    this.gs.positionReset();
  }

  filterSelected() {
    this.toggleZoom(false);
    this.gs.filterSelected();
  }

  toggleZoom(minified?: boolean) {
    this.gs.checkboxHide = true;
    this.gs.minify = minified !== undefined ? minified : !this.gs.minify;
  }

  enableSelect() {
    this.gs.toggleSelectionMode();
  }

  toggleSelectionCards() {
    if (this.gs.allSelected) this.gs.clearCheckedCards();
    else this.gs.checkAllCards();
  }
}
