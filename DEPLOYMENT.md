# Deploying YermiYahu Music Website to Vercel

This guide walks you through deploying the website to Vercel with secure audio file storage.

## Prerequisites

- A [Vercel account](https://vercel.com/signup)
- A [Stripe account](https://dashboard.stripe.com/register) with API keys
- A [GitLab](https://gitlab.com) or [GitHub](https://github.com) account
- Your audio files in the `Songs/` folder locally

## Step 1: Push Code to GitLab/GitHub

1. Create a new repository on GitLab or GitHub

2. Initialize and push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://gitlab.com/your-username/yy-music-web.git
   git branch -M main
   git push -u origin main
   ```

   > Note: The `Songs/` folder is in `.gitignore` and won't be pushed (this is intentional for security)

## Step 2: Create Vercel Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)

2. Click **"Add New..."** → **"Project"**

3. Import your GitLab/GitHub repository

4. Configure the project:
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (default)
   - **Build Command:** `next build` (default)
   - **Output Directory:** `.next` (default)

5. Click **"Deploy"** (don't worry about environment variables yet - we'll add them next)

## Step 3: Create Vercel Blob Storage

1. In your Vercel project dashboard, go to **"Storage"** tab

2. Click **"Create"** → **"Blob"**

3. Give it a name (e.g., `yy-music-songs`)

4. Select your project to connect it to

5. Click **"Create"**

6. After creation, you'll see the `BLOB_READ_WRITE_TOKEN` - Vercel automatically adds this to your project's environment variables

## Step 4: Configure Environment Variables

1. In your Vercel project, go to **"Settings"** → **"Environment Variables"**

2. Add the following variables:

   | Name | Value | Environment |
   |------|-------|-------------|
   | `STRIPE_SECRET_KEY` | `sk_live_...` (your live key) | Production |
   | `STRIPE_SECRET_KEY` | `sk_test_...` (your test key) | Preview, Development |
   | `NEXT_PUBLIC_BASE_URL` | `https://your-domain.vercel.app` | All |

   > Get your Stripe keys from [Stripe Dashboard → API Keys](https://dashboard.stripe.com/apikeys)

3. The `BLOB_READ_WRITE_TOKEN` should already be added from Step 3

## Step 5: Upload Songs to Blob Storage

1. Copy the `BLOB_READ_WRITE_TOKEN` from Vercel:
   - Go to **"Storage"** → Click your blob store → **"Settings"** tab
   - Copy the token value

2. Add it to your local `.env.local`:
   ```bash
   BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxx
   ```

3. Run the upload script:
   ```bash
   npm run upload-songs
   ```

   This uploads all songs from your local `Songs/` folder to Vercel Blob storage.

4. Verify upload:
   - Go to Vercel Dashboard → Storage → Your Blob Store → **"Browser"** tab
   - You should see `albums/WE BOW/` folder with all your MP3 files

## Step 6: Redeploy with Environment Variables

1. Go to your Vercel project → **"Deployments"** tab

2. Click the three dots on the latest deployment → **"Redeploy"**

3. Check **"Redeploy with existing Build Cache"** and click **"Redeploy"**

## Step 7: Configure Custom Domain (Optional)

1. Go to **"Settings"** → **"Domains"**

2. Add your custom domain (e.g., `yermiyahu.com`)

3. Follow Vercel's instructions to update your DNS records

4. Update `NEXT_PUBLIC_BASE_URL` to your custom domain

## Step 8: Configure Stripe for Production

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)

2. Toggle to **Live mode** (top right)

3. Go to **API Keys** and copy your live keys

4. Update the `STRIPE_SECRET_KEY` in Vercel for Production environment

5. Configure Stripe email notifications:
   - Go to **Settings** → **Emails**
   - Enable "Successful payments" notifications

## Verification Checklist

After deployment, verify everything works:

- [ ] Website loads at your Vercel URL
- [ ] Audio previews play (30-second clips)
- [ ] Stripe checkout opens when clicking "Buy Now"
- [ ] Test purchase works (use Stripe test card: `4242 4242 4242 4242`)
- [ ] Success page shows after payment
- [ ] Download buttons work (both ZIP and individual tracks)

## Adding New Albums

To add a new album in the future:

1. Create a folder locally with the MP3 files (e.g., `NewAlbum/`)

2. Update the upload script to include the new album path

3. Run the upload:
   ```bash
   npm run upload-songs
   ```

4. Update `src/app/api/checkout/route.ts`:
   ```typescript
   const albumDownloads: Record<string, string> = {
     "WE BOW": "albums/WE BOW",
     "NEW ALBUM": "albums/NEW ALBUM",
   };
   ```

5. Deploy the changes

## Troubleshooting

### "STRIPE_SECRET_KEY is not configured"
- Verify the environment variable is set in Vercel
- Redeploy after adding environment variables

### Audio previews not working
- Check that songs were uploaded to Blob storage
- Verify `BLOB_READ_WRITE_TOKEN` is set

### Downloads failing after purchase
- Ensure the blob path matches: `albums/WE BOW/`
- Check Vercel logs for errors: **Deployments** → **Logs**

### Stripe payments not appearing
- Confirm you're using the correct mode (test vs live)
- Check [Stripe Logs](https://dashboard.stripe.com/logs) for errors

## Security Notes

- Audio files are stored in Vercel Blob, not in git
- Downloads require a valid, paid Stripe session ID
- The download API verifies payment status before serving files
- Track names are sanitized to prevent directory traversal attacks
- Preview API only serves 30-second clips

## Costs

- **Vercel Hobby Plan:** Free (sufficient for small traffic)
- **Vercel Blob Storage:** First 5GB free, then $0.15/GB/month
- **Stripe:** 2.9% + $0.30 per transaction

For higher traffic, consider upgrading to Vercel Pro ($20/month).
