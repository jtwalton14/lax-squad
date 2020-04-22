export enum PocketType {
  MALE = "MALE",
  FEMALE = "FEMALE"
}

export class TMTPhoto {
  public photoUrl: string;
  public pocketStyle: string;
  public state: string;
  public type: string;
  public id: string;

  constructor(pocketStyle?: string, state?: string, type?: string) {
    this.pocketStyle = pocketStyle ? pocketStyle : "";
    this.state = state ? state : "";
    this.type = type ? type : "";
  }
}
