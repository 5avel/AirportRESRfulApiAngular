namespace AirportRESRfulApi.Shared.DTO
{
    using Newtonsoft.Json;
    using System.Collections.Generic;
    public class CrewDto : BaseDto
    {
        public int? DepartureId { get; set; }        
        public PilotDto Pilot { get; set; }
        public List<StewardessDto> Stewardesses { get; set; }
    }
}