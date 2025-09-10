# 🚀 Deploy Supabase Function for Email Notifications

## The Issue
The membership form is working, but emails aren't being sent because the Supabase function needs to be deployed and configured.

## Step-by-Step Solution

### 1. Install Supabase CLI
```bash
npm install -g supabase
```

### 2. Login to Supabase
```bash
supabase login
```

### 3. Link to Your Project
```bash
supabase link --project-ref nxfcvllbeqomzarzvcjo
```

### 4. Deploy the Function
```bash
supabase functions deploy send-membership-notification
```

### 5. Set Up Resend API Key

#### Get Resend API Key:
1. Go to https://resend.com/
2. Sign up or login
3. Go to "API Keys" section
4. Click "Create API Key"
5. Copy the key (starts with `re_`)

#### Add to Supabase:
1. Go to https://supabase.com/dashboard/project/nxfcvllbeqomzarzvcjo
2. Go to Settings → Edge Functions
3. Add environment variable:
   - **Name:** `RESEND_API_KEY`
   - **Value:** Your Resend API key

### 6. Test the Function
After deployment, test by submitting a membership form on your website.

## Current Status
- ✅ Supabase function code is ready
- ✅ Function is properly configured
- ❌ Function needs to be deployed
- ❌ RESEND_API_KEY needs to be set

## Expected Result
Once deployed, when someone submits a membership inquiry:
- Email will be sent to: **rindisedna@gmail.com**
- Email will contain customer details and plan information
- Form will show success message

## Troubleshooting
If emails still don't work:
1. Check Supabase function logs in the dashboard
2. Verify RESEND_API_KEY is set correctly
3. Check if Resend account is verified
4. Look at browser console for error messages

## Alternative: Test Without Email
The form will work and show success messages even if email fails, so you can test the functionality immediately.
