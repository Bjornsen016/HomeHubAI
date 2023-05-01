using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddSingleton<GoogleAuthenticator>();
builder.Services.AddCors(o => o.AddPolicy("NUXT", builder =>
{
	builder.AllowAnyOrigin()
		   .AllowAnyMethod()
		   .AllowAnyHeader();
}));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors("NUXT");
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.MapPost("/api/auth/authenticate", async (AuthRequest authCode, GoogleAuthenticator authenticator) =>
{
	try
	{
		var accessToken = await authenticator.AuthenticateAsync(authCode);
		return Results.Ok(accessToken);
	}
	catch (Exception ex)
	{
		return Results.BadRequest(new { error = ex.Message });
	}
});

app.MapPost("/api/auth/refreshAccessToken", async (UserEmail userEmail, GoogleAuthenticator authenticator) =>
{
	try
	{
		var tokenData = await authenticator.RefreshAccessTokenAsync(userEmail.userEmail);
		if (tokenData == null)
		{
			return Results.NotFound(new { error = "User not found" });
		}
		return Results.Ok(new
		{
			AccessToken = tokenData.Value.AccessToken,
			AccessTokenExpirationTime = tokenData.Value.AccessTokenExpirationTime
		});
	}
	catch (Exception ex)
	{
		return Results.BadRequest(new { error = ex.Message });
	}
});

app.MapPut("/api/user/updateSettings/{userEmail}", async (string userEmail, Settings settings, GoogleAuthenticator authenticator) =>
{
	try
	{
		await authenticator.UpdateUserSettingsAsync(userEmail, settings);
		return Results.Ok(new { success = "User settings updated successfully." });
	}
	catch (Exception ex)
	{
		return Results.BadRequest(new { error = ex.Message });
	}
});


app.Run();

public class UserEmail
{
	public string userEmail { get; set; }
}

public class Settings
{
	public bool darkMode { get; set; }
	public string[] selectedCalendars { get; set; }
}