# Google Ads leads in the Rentaroom CRM

The backend receives Google Ads lead form submissions at:

```text
https://YOUR_PUBLIC_API_HOST/api/leads/google-ads
```

Replace `YOUR_PUBLIC_API_HOST` with the public HTTPS origin of this Express API (the same origin used by `NEXT_PUBLIC_API_URL`). The endpoint must be reachable from Google Ads; do not use localhost or a private network address.

## Configure the shared key

1. Generate a long, random secret and add it to the backend deployment environment as `GOOGLE_ADS_WEBHOOK_KEY`.
2. Restart/redeploy the backend so it loads the new environment variable.
3. In Google Ads, enter the endpoint URL above and the exact same secret in the webhook Key field. Keep the key private. If it is exposed, rotate it in both places.
4. Select **Send test data**. Confirm Google reports success and check Admin → Leads → Room Leads for the marked test submission.

The endpoint checks Google's `google_key` value, stores contact details and campaign metadata in MongoDB, records the additional form answers, and returns HTTP 200. Repeated deliveries of the same `lead_id` are acknowledged without creating another record. Test submissions are kept and marked as tests so you can verify the whole path.

## CRM features

In Admin → Leads → Room Leads, admins can search leads, filter by source or status, update the pipeline stage, assign an owner, keep follow-up notes, and export the currently filtered leads to CSV. The lead list and update API require the existing admin session. Website leads continue to use the existing form endpoint and appear in the same list.

Never put `GOOGLE_ADS_WEBHOOK_KEY` in frontend code or commit a real key to the repository.
