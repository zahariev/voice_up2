import { Component, HostListener, Input, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";

import { Subject } from "rxjs";
import { Card, Deck } from "../shared/models";
import { GameService } from "../game.service";
import texts from "../../assets/translation.json";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"],
})
export class CardComponent implements OnInit {
  private componentDestroyed$: Subject<any> = new Subject<void>();
  _shake = false;
  @Input() set shake(value: boolean) {
    this._shake = value;
    console.log(this._shake);
  }

  @HostListener("window:resize", ["$event"])
  onResize(event: Event): void {
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
  }

  windowWidth: number = window.innerWidth;
  windowHeight: number = window.innerHeight;
  TEXT = texts;
  mousePosition = { x: 0, y: 0 };
  lastZindex = 100;
  dragEvent = false;

  constructor(public gs: GameService, private titleService: Title) {
    this.titleService.setTitle(this.TEXT.page_title);
  }

  ngOnInit() {
    this.gs.checkAllEmptyDecks();
    // this.gs.checkOnlyOneDeckOpen();
  }

  dragMove(event: any, card: Card) {
    const el = event.source.element.nativeElement;
    this.dragEvent = true;
    this.hopCardUp(el.style);
  }

  hopCardUp(elStyle: any) {
    this.lastZindex += 10;
    elStyle.zIndex = this.lastZindex;
  }

  magnify(event: any, card: Card) {
    const el = <HTMLInputElement>document.getElementById("card" + card.id);

    this.hopCardUp(el.style);
    this.gs.magnify(event, card);
  }

  showAllCards(deck: Deck) {
    this.gs.showAllCards(deck);
  }

  isMobileDevice(): boolean {
    if (this.windowWidth < 550 || this.windowHeight < 550) return true;
    const ua = navigator.userAgent;
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(
        ua
      )
    )
      return true;
    return false;
  }

  dragEnd($event: any, card: Card) {
    this.dragEvent = false;

    const elStyle = $event.source.element.nativeElement.style;

    const smallCard = $event.source.element.nativeElement.clientHeight < 200;
    const el = $event.source.getRootElement().getBoundingClientRect();
    card.position = $event.source.getFreeDragPosition();

    if (!elStyle.position) {
      card.position = {
        x: el.left + window.scrollX,
        y: el.top - 60 + window.scrollY,
      };
    }
    this.gs.dropCard.emit();
    this.gs.saveState();
  }

  getPosition(el: any) {
    let x = 0;
    let y = 0;
    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
      x += el.offsetLeft - el.scrollLeft;
      y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
    }
    return { top: y, left: x };
  }

  mouseDown($event: MouseEvent) {
    this.mousePosition.x = $event.screenX;
    this.mousePosition.y = $event.screenY;
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(0);
    this.componentDestroyed$.complete();
  }
}
