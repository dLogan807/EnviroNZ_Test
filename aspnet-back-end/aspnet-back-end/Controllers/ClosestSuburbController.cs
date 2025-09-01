using System.Diagnostics;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

namespace aspnet_back_end.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ClosestSuburbController : ControllerBase
    {
        private readonly ILogger<ClosestSuburbController> _logger;

        public ClosestSuburbController(ILogger<ClosestSuburbController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public async Task<Suburb> Get(string? latitude, string? longitude)
        {
            _logger.LogInformation("Finding your closest suburb");
            _logger.LogInformation($"latitude: {latitude} longitude: {longitude}");

            //Logic should be moved to the model layer

            var filePath = Path.Combine(AppContext.BaseDirectory, "suburbs.json");
            var json = await System.IO.File.ReadAllTextAsync(filePath);
            var suburbs = JsonSerializer.Deserialize<List<Suburb>>(json);

            Suburb closestSuburb = new(-1, "Error finding suburb", -1, -1);
            if (latitude == null || longitude == null || suburbs == null)
            {
                return closestSuburb;
            }
            //NMeed to check for NAN
            double latitudeNum = Double.Parse(latitude);
            double longitudeNum = Double.Parse(longitude);

            double closestDistance = -1;

            foreach (Suburb suburb in suburbs)
            {
                //double thisDistance = GetEuclideanDistance(
                //    latitudeNum,
                //    longitudeNum,
                //    suburb.Latitude,
                //    suburb.Longitude
                //);

                if (closestDistance == -1) //|| thisDistance < closestDistance
                {
                    closestSuburb = suburb;
                }
            }

            return closestSuburb;
        }

        //double GetEuclideanDistance(
        //    double firstLatitude,
        //    double firstLongitude,
        //    double secondLatitude,
        //    double secondLongitude
        //) {
        //    double deltaLat = lat2 - lat1;
        //    double deltaLon = lon2 - lon1;
        //
        //}
    }
}
