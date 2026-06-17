# CareLink Multispecialty Clinic Website

Fresh static website for GitHub Pages.

## Pages

- `index.html`: patient/client portal
- `admin.html`: staff/admin portal

There is no login in this version. The portals are separated only by URL.

## Features

- CareLink logo and branding
- Available procedures from the clinic service list
- Procedure category links that show matching doctors
- Doctor dropdown in the booking form
- Patient appointment request form
- Admin appointment status controls
- Admin CSV export for Google Sheets
- Admin daily reset button with confirmation prompt
- Admin doctor directory editor for non-technical staff
- Admin can add/delete doctors, including multiple doctors under the same specialty
- Admin doctor availability editor
- Max bookings per doctor per day
- Required appointment-record consent
- Optional promotion/announcement consent

## Privacy Notes

For basic Data Privacy Act alignment:

- Collect only details needed for appointment handling.
- Keep appointment-record consent required before form submission.
- Keep promotion consent separate and optional.
- Use promotion lists only for patients who opted in.
- Limit access to patient records to authorized clinic staff.
- Move to a secure database with real login before using this for multi-device clinic operations.

## Files

- `index.html`
- `admin.html`
- `app.js`
- `styles.css`
- `carelink.jpg`
- `carelink-logo.svg`

## Storage Note

This static version uses browser local storage. For real multi-device clinic use, connect the same screens to Firebase, Supabase, or a custom backend.

## Google Sheets

Use `admin.html` > **Export appointments for Google Sheets** to download a CSV file. Open the CSV in Google Sheets to keep a copy of patient appointment records.
