# Google OAuth Setup Guide for RetroKick

Follow these steps to create Google OAuth 2.0 credentials for your website.

## Step 1: Go to Google Cloud Console

1. Visit: https://console.cloud.google.com/
2. Sign in with your Google account
3. Click **"Select a project"** at the top → Click **"NEW PROJECT"**

## Step 2: Create a New Project

1. Project name: `RetroKick`
2. Organization: (Select your email domain)
3. Location: (Default)
4. Click **"CREATE"**

## Step 3: Enable Google+ API

1. In the left sidebar, go to **APIs & Services** → **Library**
2. Search for **"Google+ API"** or **"Google People API"**
3. Click on it and click **"ENABLE"**

## Step 4: Configure OAuth Consent Screen

1. Go to **APIs & Services** → **OAuth consent screen**
2. Select **"External"** → Click **"CREATE"**
3. Fill in the details:

   - **App name:** RetroKick
   - **User support email:** Your email (e.g., abhikbangera@gmail.com)
   - **Email addresses:** Add your email
   - **App logo:** (Optional) Upload a logo

4. Click **"SAVE AND CONTINUE"**

5. Scopes page:
   - Click **"ADD OR REMOVE SCOPES"**
   - Select: `.../auth/userinfo.email` and `.../auth/userinfo.profile`
   - Click **"UPDATE"** → **"SAVE AND CONTINUE"**

6. Test users:
   - Click **"ADD USERS"**
   - Add your Google email address (abhikbangera@gmail.com)
   - Click **"ADD"** → **"SAVE AND CONTINUE"**

7. Summary page: Review and click **"BACK TO DASHBOARD"**

## Step 5: Create OAuth 2.0 Credentials

1. Go to **APIs & Services** → **Credentials**
2. Click **"CREATE CREDENTIALS"** → Select **"OAuth client ID"**
3. Application type: **"Web application"**
4. Name: `RetroKick Web Client`
5. **Authorized redirect URIs:**
   ```
   http://localhost:5173
   http://localhost:5173/google/callback
   ```

6. Click **"CREATE"**

## Step 6: Get Your Credentials

1. After creation, you'll see a popup with:
   - **Client ID**
   - **Client Secret**

2. Copy both values

## Step 7: Add Credentials to Your Project

### Option 1: Add to server/.env file

Edit `server/.env` and add:

```env
# Google OAuth Credentials
GOOGLE_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret-here
```

### Option 2: Environment Variables (Render/Production)

Add these to your deployment platform:
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

## Step 8: Update Authorized JavaScript Origins

For production, add your domain:
- `https://your-production-domain.com`

## Step 9: Add Users to Test (During Development)

Since your app is in "Testing" mode:
1. Go to OAuth consent screen
2. Scroll to **"Test users"**
3. Add the Google accounts you want to allow to sign in
4. Only added users can sign in during testing

## Step 10: Publish Your App (Production)

When ready for production:
1. Go to OAuth consent screen
2. Click **"PUBLISH APP"**
3. This makes OAuth available to all Google users

## Troubleshooting

### "Error 401: Invalid client" 
- Check that Client ID is correct
- Ensure you're using the right credentials

### "Not a valid origin for the client"
- Add your domain to authorized JavaScript origins
- For localhost, ensure port is correct

### "Sign in not supported"
- OAuth consent screen may be in testing mode
- Add your email to test users

## Quick Links

- Google Cloud Console: https://console.cloud.google.com/
- Google People API: https://developers.google.com/people
- OAuth 2.0 Documentation: https://developers.google.com/identity/protocols/oauth2

---

**After completing setup, provide me with:**
1. Google Client ID
2. Google Client Secret

I'll then implement the Google Sign-In feature for your RetroKick website!

