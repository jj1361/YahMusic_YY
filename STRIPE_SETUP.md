# Stripe Integration Setup

This guide walks you through setting up Stripe payments for the YermiYahu music website.

## 1. Create a Stripe Account

1. Go to [stripe.com](https://stripe.com) and create an account
2. Complete the account verification process

## 2. Get Your API Keys

1. Go to [Stripe Dashboard > API Keys](https://dashboard.stripe.com/apikeys)
2. You'll see two keys:
   - **Publishable key** (starts with `pk_test_` or `pk_live_`)
   - **Secret key** (starts with `sk_test_` or `sk_live_`)

> **Note:** Use test keys (`pk_test_` and `sk_test_`) for development. Switch to live keys for production.

## 3. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` with your Stripe keys:
   ```
   STRIPE_SECRET_KEY=sk_test_your_secret_key_here
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

3. For production, update `NEXT_PUBLIC_BASE_URL` to your actual domain:
   ```
   NEXT_PUBLIC_BASE_URL=https://yourdomain.com
   ```

## 4. Test the Integration

### Test Card Numbers

Use these test card numbers in test mode:

| Card Number | Description |
|-------------|-------------|
| `4242 4242 4242 4242` | Successful payment |
| `4000 0000 0000 3220` | 3D Secure authentication |
| `4000 0000 0000 9995` | Declined (insufficient funds) |

Use any future expiration date, any 3-digit CVC, and any postal code.

### Testing Checkout

1. Run the development server:
   ```bash
   npm run dev
   ```

2. Click "Buy Now" on the album card
3. Complete checkout with a test card
4. You should be redirected to `/success` on successful payment

## 5. Going Live

When ready for production:

1. Complete Stripe account activation at [dashboard.stripe.com/account/onboarding](https://dashboard.stripe.com/account/onboarding)

2. Switch to live API keys in your production environment:
   ```
   STRIPE_SECRET_KEY=sk_live_your_live_secret_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_publishable_key
   NEXT_PUBLIC_BASE_URL=https://yourdomain.com
   ```

3. Test a real transaction with a small amount

## 6. Viewing Orders

- Go to [Stripe Dashboard > Payments](https://dashboard.stripe.com/payments) to view all transactions
- Set up email notifications in [Dashboard > Settings > Emails](https://dashboard.stripe.com/settings/emails)

## Current Configuration

The checkout is configured with:

- **Payment methods:** Card payments
- **Currency:** USD
- **Product type:** Digital download (no shipping required)

To modify these settings, edit `src/app/api/checkout/route.ts`.

## Digital Downloads

After a successful purchase, customers can download individual tracks from the success page.

### Current Setup

Album tracks are stored in the `Songs/` folder at the project root:
```
Songs/
├── 1. Ready to do Your Will.mp3
├── 2. My Yah .mp3
├── 3. O Holy One.mp3
├── ...
└── 12. I Will Be Still.mp3
```

The download path is configured in `src/app/api/checkout/route.ts`:
```typescript
const albumDownloads: Record<string, string> = {
  "WE BOW": "Songs",
};
```

### How It Works

1. After successful payment, customers are redirected to the success page
2. The page fetches the track list from `/api/tracks`
3. Customers can download all tracks at once or individual tracks
4. Each download request is verified against the Stripe session

### Adding New Albums

To add downloadable files for new albums:

1. Create a folder for the album (e.g., `NewAlbum/`)
2. Add MP3 files with track numbers (e.g., `1. Song Name.mp3`)
3. Update the `albumDownloads` mapping in `src/app/api/checkout/route.ts`:
   ```typescript
   const albumDownloads: Record<string, string> = {
     "WE BOW": "Songs",
     "NEW ALBUM": "NewAlbum",
   };
   ```

### Security Notes

- Downloads require a valid, paid Stripe session ID
- The download API verifies payment status before serving files
- Track names are sanitized to prevent directory traversal attacks
- Files are served with proper Content-Disposition headers

## Troubleshooting

### "STRIPE_SECRET_KEY is not configured"
- Ensure `.env.local` exists and contains the `STRIPE_SECRET_KEY`
- Restart the development server after adding environment variables

### Checkout redirects fail
- Verify `NEXT_PUBLIC_BASE_URL` is set correctly
- For local development, use `http://localhost:3000`

### Payments not appearing in dashboard
- Confirm you're using the correct API keys (test vs live)
- Check the [Stripe logs](https://dashboard.stripe.com/logs) for errors

### Download button not working
- Verify the folder exists and contains MP3 files
- Check that the folder name matches the path in `albumDownloads` mapping
- Ensure the checkout session has completed payment (`payment_status: "paid"`)

### "Download file not found" error
- Confirm the folder path in `albumDownloads` matches the actual folder location
- Ensure MP3 files exist in the folder
