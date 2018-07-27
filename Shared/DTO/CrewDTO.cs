namespace AirportRESRfulApi.Shared.DTO
{
    using Newtonsoft.Json;
    using System.Collections.Generic;
    public class CrewDto : BaseDto
    {
        public int? DepartureId { get; set; }
        public string Name { get; set; }
    }
}