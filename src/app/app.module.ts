import { DragDropModule } from "@angular/cdk/drag-drop";
import { NgModule } from "@angular/core";
import { BrowserModule, Title } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatListModule } from "@angular/material/list";
import { AppComponent } from "./app.component";
import { CardComponent } from "./card/card.component";
import { MatCheckboxModule } from "@angular/material/checkbox";
// import { FooterComponent } from "./footer/footer.component";
import { MenuComponent } from "./menu/menu.component";
import { DiceComponent } from "./dice/dice.component";

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    // FooterComponent,
    MenuComponent,
    DiceComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatListModule,
    MatMenuModule,
  ],
  providers: [Title],
  bootstrap: [AppComponent],
})
export class AppModule {}
