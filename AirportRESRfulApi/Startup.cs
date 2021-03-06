﻿using AirportRESRfulApi.BLL.Interfaces;
using AirportRESRfulApi.BLL.Services;
using AirportRESRfulApi.BLL.Validations;
using AirportRESRfulApi.DAL;
using AirportRESRfulApi.DAL.Interfaces;
using AirportRESRfulApi.DAL.Models;
using AirportRESRfulApi.Shared.DTO;
using AutoMapper;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NJsonSchema;
using NSwag.AspNetCore;
using System.Reflection;

namespace AirportRESRfulApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;

        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Validators
            services.AddScoped<IValidator<TicketDto>, TicketsValidator>();
            services.AddScoped<IValidator<FlightDto>, FlightsValidator>();
            services.AddScoped<IValidator<CrewDto>, CrewsValidator>();
            services.AddScoped<IValidator<PilotDto>, PilotsValidator>();
            services.AddScoped<IValidator<StewardessDto>, StewardessesValidator>();
            services.AddScoped<IValidator<DepartureDto>, DeparturesValidator>();
            services.AddScoped<IValidator<PlaneDto>, PlanesValidator>();
            services.AddScoped<IValidator<PlaneTypeDto>, PlaneTypesValidator>();

            // DAL Context
            services.AddDbContext<AirportContext>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();

            //BLL
            services.AddScoped<ITicketsService, TicketsService>();
            services.AddScoped<IFlightsService, FlightsService>();
            services.AddScoped<IDeparturesService, DeparturesService>();
            services.AddScoped<ICrewsService, CrewsService>();
            services.AddScoped<IPilotsService, PilotsService>();
            services.AddScoped<IStewardessesService, StewardessesService>();
            services.AddScoped<IPlanesService, PlanesService>();
            services.AddScoped<IPlaneTypesService, PlaneTypesService>();

            //Maper
            services.AddScoped(_ => MapperConfiguration().CreateMapper());

            //FluentValidation
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1)
                .AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<Startup>());

            services.AddSwagger();

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "AirportClient/dist";
            });

            services.AddCors();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // Enable the Swagger UI middleware and the Swagger generator
            app.UseSwaggerUi(typeof(Startup).GetTypeInfo().Assembly, settings =>
            {
                settings.GeneratorSettings.DefaultPropertyNameHandling =
                    PropertyNameHandling.CamelCase;
            });

            app.UseCors(b => b.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyMethod());

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "api/{controller}/{action=Index}/{id?}");
            });


            //app.UseSpa(spa =>
            //{
            //    // To learn more about options for serving an Angular SPA from ASP.NET Core,
            //    // see https://go.microsoft.com/fwlink/?linkid=864501

            //    spa.Options.SourcePath = "AirportClient";
               
            //    if (env.IsDevelopment())
            //    {
            //        spa.UseAngularCliServer(npmScript: "start");
            //    }
            //});

        }

        public MapperConfiguration MapperConfiguration()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<Ticket, TicketDto>();
                cfg.CreateMap<TicketDto, Ticket>();

                cfg.CreateMap<Flight, FlightDto>();
                cfg.CreateMap<FlightDto, Flight>();

                cfg.CreateMap<Departure, DepartureDto>();
                cfg.CreateMap<DepartureDto, Departure>();

                cfg.CreateMap<Crew, CrewDto>();
                cfg.CreateMap<CrewDto, Crew>();

                cfg.CreateMap<Pilot, PilotDto>();
                cfg.CreateMap<PilotDto, Pilot>();

                cfg.CreateMap<Stewardess, StewardessDto>();
                cfg.CreateMap<StewardessDto, Stewardess>();

                cfg.CreateMap<Plane, PlaneDto>();
                cfg.CreateMap<PlaneDto, Plane>();

                cfg.CreateMap<PlaneType, PlaneTypeDto>();
                cfg.CreateMap<PlaneTypeDto, PlaneType>();
            });

            return config;
        }
    }
}
