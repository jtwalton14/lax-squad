import { PocketStyle } from "packages/emuns/pocket-style";
import { State } from "packages/emuns/state";

export enum PocketType {
  MALE = "MALE",
  FEMALE = "FEMALE"
}

export class TMTPhoto {
  public photoUrl: string;
  public pocketStyle: PocketStyle;
  public state: State;
  public type: PocketType;
}
