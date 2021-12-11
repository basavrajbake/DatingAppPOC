using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Helpers;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            /*
                         //There are 3 ways to add services in dependency injection. using 3 ways we can
                          define the lifetime of the service.
                         // 1. services.AddSingleton() - Services can be added as Singleton object that means object created
                            or instanced doesn't stop until application stops. application continues to use the resources.
                            Example : Loging,in case of Token creation service this method is not suitable.
                         // 2. services.AddScoped() - This is scoped lifetime of the http request. In case of token creation
                          service when request is created and finished then service will be destroyed. It can injeted in
                          particular controller and destryoed after the request finishes.
                            Note: This is the one which always uses.
                        // 3. services.AddTransient() - This is used in cases where service is going to be created and 
                           destroyed as soon as the method is finished. This one is not quite considered for http request.

                           Question: Do we really need the Interface(ITokenService)?
                           Ans: No, We Don't. We just create the TokenService, it will function as it is
                           Reason why to specify the Interface : Testing. For easy to mock an interface.
                        */

            // Like this is useful for Mock testing of interface
            services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IPhotoService, PhotoService>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
            // if testing is not considered then below will work fine.
            // services.AddScoped<TokenService>();
            services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });
            return services;
        }
    }
}