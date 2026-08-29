
using Capstone.DAL.Repository;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;

namespace Capstone.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var dbPath = Path.Combine(
                Directory.GetParent(builder.Environment.ContentRootPath).FullName,
                "Capstone.DAL",
                "Database",
                "ServiceDeskDB.db"
            );

            builder.Services.AddDbContext<HelpDeskDbContext>(options =>
                options.UseSqlite($"Data Source={dbPath}"));

            builder.Services.AddScoped<IRepository, Repository>();

            // ENABLE CORS

            var allowedOrigins = "_allowedOrigins";
            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: allowedOrigins,
                    policy =>
                        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            });


            var app = builder.Build();
            

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseAuthorization();

            //**********FOR CORS
            app.UseCors(allowedOrigins);
            //**********FOR CORS
            app.MapControllers();

            app.Run();
        }
    }
}
