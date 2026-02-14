# AI Task IQ Deployment & Development Protocol

To ensure a "seamless every time" experience where every code change is instantly reflected on the live site, we must adhere to this unified workflow.

## 1. The Source of Truth

- **Authoritative Repository**: [aitaskiq-site](https://github.com/FraserYoung79/aitaskiq-site)
- **Local Work Path**: `/Users/fraseryoung/Documents/Antigravity-Agency/AGENCY_SITE`
- **Main Branch**: `main`

## 2. Automated Deployment Flow

- **Provider**: Netlify (or Vercel, to be confirmed)
- **Trigger**: Every push to the `main` branch.
- **Build Settings**:
  - **Base Directory**: `/`
  - **Build Command**: `(none)` (Static Site)
  - **Publish Directory**: `hybrid_v1/public`

## 3. Seamless Sync Rule

Whenever a change is requested:

1. **Implement**: Antigravity modifies files in `AGENCY_SITE/hybrid_v1/public`.
2. **Verify**: Test locally (if applicable).
3. **Ship**: Antigravity executes `git push origin main` from the `AGENCY_SITE` root.
4. **Propagate**: CI/CD (Netlify/Vercel) automatically updates `aitaskiq.com`.

## 4. Troubleshooting

If the site doesn't update within 60 seconds:

- Verify the **Publish Directory** in the hosting dashboard matches `hybrid_v1/public`.
- Check for build logs in the hosting provider's dashboard.
- Ensure no conflicting `.git` folders exist in subdirectories.
