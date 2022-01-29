export interface Deck {
  id: number;
  title: string;
  color: string;
  size: number;
  backSide: boolean;
  empty: boolean;
  accentIcons: any[];
  accentColor: string;
  iconColor: string;
}

export class Card {
  position?: { x: number; y: number };
  magnified!: boolean;
  checked: boolean = false;
  constructor(public id: number, public side: string, public deckId: number) {}
}
