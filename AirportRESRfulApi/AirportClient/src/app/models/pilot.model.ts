export class Pilot {
    constructor(
      public id: number,
      public crewId: number,
      public firstName: string,
      public lastName: string,
      public birthDate: string,
      public experience: number // in ticks (timeSpan)
    ) { }
  }
  