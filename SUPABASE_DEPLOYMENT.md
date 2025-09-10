# Supabase Function Deployment Guide

## To Deploy the Membership Notification Function:

### 1. Install Supabase CLI
```bash
npm install -g supabase
```

### 2. Login to Supabase
```bash
supabase login
```

### 3. Link to your project
```bash
supabase link --project-ref nxfcvllbeqomzarzvcjo
```

### 4. Deploy the function
```bash
supabase functions deploy send-membership-notification
```

### 5. Set Environment Variables
You need to set the RESEND_API_KEY in your Supabase project:

1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/nxfcvllbeqomzarzvcjo
2. Go to Settings > Edge Functions
3. Add environment variable: `RESEND_API_KEY` with your Resend API key

### 6. Get Resend API Key
1. Go to https://resend.com/
2. Sign up/login
3. Go to API Keys section
4. Create a new API key
5. Copy the key and add it to Supabase environment variables

## Current Status
- ✅ Function code is ready
- ❌ Function needs to be deployed
- ❌ RESEND_API_KEY needs to be set

## Testing
Once deployed, the membership form will send emails to: rindisedna@gmail.com
