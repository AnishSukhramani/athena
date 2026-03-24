# JobPortalScout

Lead generation agent for dental/medical practice owners (USA) hiring front desk staff.

## Setup

1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Environment** (no Apify required)
   - Copy `.env.example` to `.env`
   - Add `HYPERBROWSER_API_KEY` (from [Hyperbrowser](https://app.hyperbrowser.ai/))
   - Add `OPENAI_API_KEY` (from [OpenAI](https://platform.openai.com/api-keys))
   - Add `HUNTER_API_KEY` (optional; from [Hunter.io](https://hunter.io/api-keys))
   - Add `GOOGLE_SHEET_ID` and `GOOGLE_SERVICE_ACCOUNT_PATH` for Sheets output

3. **Google Sheets**
   - Create a Google Cloud project, enable Google Sheets API
   - Create a service account and download JSON
   - Share your target Sheet with the service account email

## Run

```bash
pnpm run scout
# or
node src/index.js
```

## Sources (Apify-free)

- **Hyperbrowser**: DentalPost, Indeed, LinkedIn, iHireDental, Jobley
- **Reddit**: r/Dentistry, r/MedicalAssistant, r/dentalassistant, r/dentalhygiene

## Output

Leads are appended to the configured Google Sheet with columns: Company, Job Title, Source URL, Email, Phone, LinkedIn, Facebook, Source, Timestamp.
