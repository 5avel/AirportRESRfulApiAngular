export class PlaneType {
    constructor(
      public id: number,
      public model: string,
      public seats: number,
      public capacity: number,
      public range: number,
      public serviceLife: number // in ticks (TimeSpan)
    ) { }
  }
  