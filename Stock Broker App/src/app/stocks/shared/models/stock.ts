export class Stock {
  constructor(public symbol: string, public price: number,
              public volume: number, public timestamp: Date) {
    if (isNaN(this.volume)) {
      this.volume = 0;
    }
  }
}

