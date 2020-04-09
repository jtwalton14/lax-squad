export class TMTPocket {
  public id: string;
  public name: string;

  constructor(name?: string) {
    this.name = name ? name : "";
  }
}
