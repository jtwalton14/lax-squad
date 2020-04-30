export class TMTColor {
  public id: string;
  public name: string;

  public h: number;
  public s: number;
  public l: number;
  public hexValue: string;

  constructor(
    name?: string,
    h?: number,
    s?: number,
    l?: number,
    hexValue?: string
  ) {
    this.name = name ? name : "";
    this.h = h ? h : 0;
    this.s = s ? s : 100;
    this.l = l ? l : 50;
    this.hexValue = hexValue ? hexValue : "";
  }
}
