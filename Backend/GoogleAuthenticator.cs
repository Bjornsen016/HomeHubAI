using FirebaseAdmin;
using Google.Cloud.Firestore;
using Google.Apis.Auth;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Auth.OAuth2.Flows;
using Google.Apis.Auth.OAuth2.Responses;
using Google.Apis.Calendar.v3;
using Google.Apis.Services;
using System;
using System.IO;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Text.Json;
using System.Reflection;

public class GoogleAuthenticator
{
	private readonly string _clientId = "448042669503-ktadb30nns4j7pvo4os0eutgilcb9ipp.apps.googleusercontent.com";
	private readonly string _clientSecret = "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";
	private FirestoreDb _firestoreDb;

	public GoogleAuthenticator()
	{
		// Read the content of the service account key file
		string serviceAccountKeyFilePath = "homehubai-firebase-adminsdk-szq0v-f82673afe5.json";
		string serviceAccountKeyJson = File.ReadAllText(serviceAccountKeyFilePath);

		// Deserialize the JSON content to an object
		var serviceAccountKey = JsonConvert.DeserializeObject<Dictionary<string, object>>(serviceAccountKeyJson);

		// Initialize the Firebase Admin SDK with the service account key
		if (FirebaseApp.DefaultInstance == null)
		{
			var app = FirebaseApp.Create(new AppOptions
			{
				Credential = GoogleCredential.FromJson(JsonConvert.SerializeObject(serviceAccountKey))
			});
		}

		// Create Firestore instance with custom credentials
		var firestoreBuilder = new FirestoreDbBuilder
		{
			ProjectId = "homehubai",
			Credential = GoogleCredential.FromJson(JsonConvert.SerializeObject(serviceAccountKey))
		};
		_firestoreDb = firestoreBuilder.Build();
	}

	public async Task<AuthenticatedUserData?> AuthenticateAsync(AuthRequest authCode)
	{
		var flow = new GoogleAuthorizationCodeFlow(new GoogleAuthorizationCodeFlow.Initializer
		{
			ClientSecrets = new ClientSecrets
			{
				ClientId = _clientId,
				ClientSecret = _clientSecret
			},
			Scopes = new[] { "openid", "email", "profile" }
		});

		var tokenResponse = await flow.ExchangeCodeForTokenAsync(
			userId: authCode.authuser,
			code: authCode.code,
			redirectUri: "postmessage",
			CancellationToken.None);

		// Extract the access token and refresh token
		var accessToken = tokenResponse.AccessToken;
		var refreshToken = tokenResponse.RefreshToken;
		var expiresInSeconds = tokenResponse.ExpiresInSeconds;
		var idToken = tokenResponse.IdToken;

		//TODO: assign the refreshtoken to the firebase database user.

		// Validate and parse the ID token
		var payload = await GoogleJsonWebSignature.ValidateAsync(idToken, new GoogleJsonWebSignature.ValidationSettings
		{
			Audience = new[] { _clientId }
		});

		// Extract the user's name and picture from the ID token payload
		string? name = payload.Name;
		string? picture = payload.Picture; 
		string? email = payload.Email;
		await CreateOrUpdateUser(email, refreshToken);

		// Return the user data
		return new AuthenticatedUserData
		{
			AccessToken = accessToken,
			AccessTokenExpirationTime = DateTime.UtcNow.AddSeconds(expiresInSeconds.Value),
			Name = name,
			Picture = picture,
			Email = email
		};
	}

	public async Task<(string? AccessToken, DateTime AccessTokenExpirationTime)?> RefreshAccessTokenAsync(string userEmail)
	{
		var userDocRef = _firestoreDb.Collection("users").Document(userEmail);
		var userRef = _firestoreDb.Collection("users").Document(userEmail);
		var userDocSnapshot = await userDocRef.GetSnapshotAsync();

		if (!userDocSnapshot.Exists)
		{
			return null;
		}

		var refreshToken = userDocSnapshot.GetValue<string>("refreshToken");

		var flow = new GoogleAuthorizationCodeFlow(new GoogleAuthorizationCodeFlow.Initializer
		{
			ClientSecrets = new ClientSecrets
			{
				ClientId = _clientId,
				ClientSecret = _clientSecret
			},
			Scopes = new[] { "openid", "email", "profile" }
		});

		var tokenResponse = await flow.RefreshTokenAsync(userEmail, refreshToken, CancellationToken.None);

		var lastSigningTime = DateTime.UtcNow;
		var dictionary = new Dictionary<string, object>
		{
			["lastSigningTime"] = lastSigningTime
		};
		await userRef.UpdateAsync(dictionary);

		return (tokenResponse.AccessToken, DateTime.UtcNow.AddSeconds(tokenResponse.ExpiresInSeconds.Value));
	}



	public async Task CreateOrUpdateUser(string email, string refreshToken)
	{
		// Get the current time
		var lastSigningTime = DateTime.UtcNow;

		// Check if the user already exists in the database
		var userRef = _firestoreDb.Collection("users").Document(email);
		var userSnapshot = await userRef.GetSnapshotAsync();

		if (userSnapshot.Exists)
		{
			// Update the existing user's refreshToken and lastSigningTime
			var dictionary = new Dictionary<string, object>
			{
				["refreshToken"] = refreshToken,
				["lastSigningTime"] = lastSigningTime
			};
			await userRef.UpdateAsync(dictionary);
		}
		else
		{
			// Create a new user with the given email, refreshToken, and lastSigningTime
			var newUser = new
			{
				email,
				refreshToken,
				lastSigningTime
			};
			await userRef.SetAsync(newUser);
		}
	}

	public async Task UpdateUserSettingsAsync(string email, Settings settings)
	{
		var userRef = _firestoreDb.Collection("users").Document(email);
		var obj = new Dictionary<string, object>();
		foreach (PropertyInfo property in settings.GetType().GetProperties())
		{
			var value = property.GetValue(settings);
			if (value != null)
			{
				obj[property.Name] = value;
			}
		}
		// Overwrite the settings document with the new settings
		await userRef.UpdateAsync(obj);
	}

}

public class AuthenticatedUserData
{
	public string? AccessToken { get; set; }
	public DateTime AccessTokenExpirationTime { get; set; }
	public string? Name { get; set; }
	public string? Picture { get; set; }
	public string? Email { get; set; }
}
