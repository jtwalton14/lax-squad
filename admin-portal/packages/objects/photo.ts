import { PocketStyles } from "packages/emuns/pocket-styles";
import { State } from "packages/emuns/state";

enum PocketType {
  MALE = "MALE",
  FEMALE = "FEMALE"
}

export class TMTPhoto {
  public name: string;
  public photoUrl: string;
  public pocketStyle: PocketStyles;
  public state: State;
  public extention: string;
  public type: PocketType;
}
