export enum PocketType {
  MALE = "MALE",
  FEMALE = "FEMALE"
}

export class TMTPhoto {
  public photoUrl: string;
  public pocketStyle: string;
  public state: string;
  public type: string;

  constructor(
    photoUrl?: string,
    pocketStyle?: string,
    state?: string,
    type?: string
  ) {
    this.photoUrl = photoUrl ? photoUrl : "";
    this.pocketStyle = pocketStyle ? pocketStyle : "";
    this.state = state ? state : "";
    this.type = type ? type : "";
  }
}
