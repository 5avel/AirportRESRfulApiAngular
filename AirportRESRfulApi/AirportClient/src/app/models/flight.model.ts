export class Flight {
  constructor(
    public id: number,
    public flightNumber: string,
    public departurePoint: string,
    public departureTime: string,
    public destinationPoint: string,
    public arrivalTime: string
  ) { }
}
