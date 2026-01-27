# Email Integration Setup Guide for RetroKick

## Overview

RetroKick includes a complete email notification system that automatically sends:
- **Customer Confirmation Email** - Order details, invoice, and shipping info
- **Admin Notification Email** - Order details for fulfillment

## Prerequisites

1. A Gmail account
2. Enable 2-Factor Authentication on your Google account
3. Generate an App Password for the email system

---

## Step 1: Enable 2-Factor Authentication

1. Go to: https://myaccount.google.com/
2. Select **Security** from the left menu
3. Under "Signing in to Google", find **2-Step Verification**
4. Click **Turn on 2-Step Verification**
5. Follow the setup process (you can use your phone as a security key)

---

## Step 2: Generate App Password

1. Go to: https://myaccount.google.com/
2. Select **Security** from the left menu
3. Under "Signing in to Google", find **2-Step Verification**
4. Scroll down to **App passwords** (may be under "Signing in with Google")
5. Click **Create app password**
6. Enter a name like "RetroKick Server"
7. Click **Create**
8. **Copy the 16-character password** (format: `xxxx xxxx xxxx xxxx`)
   - Example: `abcd efgh ijkl mnop`

---

## Step 3: Configure Environment Variables

Edit the `.env` file in the `server/` folder:

```env
# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop

# Admin email for notifications
ADMIN_EMAIL=abhikbangera@gmail.com

# Server port (optional, default is 3001)
PORT=3001
```

**Important:**
- Replace `your-email@gmail.com` with your Gmail address
- Replace `abcd efgh ijkl mnop` with the App Password (keep the spaces)
- The `ADMIN_EMAIL` is where you'll receive order notifications

---

## Step 4: Start the Server

```bash
cd /Users/abhikbangera/Downloads/eCommerce-Website-for-RetroKick/server
node index.js
```

The server runs on `http://localhost:3001` by default.

---

## Step 5: Test the Email System

1. Open the frontend: http://localhost:5174
2. Browse products and add items to cart
3. Complete the checkout process with a valid email address
4. Check if:
   - **Customer** receives confirmation at their email
   - **Admin** (abhikbangera@gmail.com) receives order notification

---

## Email Templates

### Customer Email Includes:
- Order ID
- Items purchased (name, size, quantity, price)
- Shipping address
- Order totals (subtotal, shipping, tax, grand total)
- Payment method

### Admin Email Includes:
- Order ID
- Customer details (name, email, phone, address)
- Items breakdown
- Payment information
- Order totals

---

## Troubleshooting

### Error: "Invalid login" or "Username and Password not accepted"
- **Cause:** Using regular password instead of App Password
- **Solution:** Enable 2FA and generate an App Password

### Error: "Less secure apps" warning
- **Cause:** Google disabled less secure app access
- **Solution:** App Passwords work without this. Ensure 2FA is enabled.

### No emails received
- Check **Spam/Junk** folder
- Verify email addresses in `.env`
- Check server console for errors
- Ensure `EMAIL_USER` matches the Gmail account used to generate the password

### Port already in use
- Edit `.env` and change `PORT=3002`
- Restart the server

---

## Security Best Practices

1. **Never commit `.env` to version control** - It's already in `.gitignore`
2. **Use App Passwords** - Never use your actual Gmail password
3. **Keep 2FA enabled** - Required for App Passwords to work
4. **Use a dedicated email** - Consider creating a business email for orders

---

## Alternative Email Providers

If you prefer not to use Gmail, you can configure:

### Outlook/Hotmail
```env
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your-app-password
```

### Yahoo
```env
EMAIL_USER=@yahoo.com
EMAIL_PASS=your-app-password
```

### SendGrid (Recommended for production)
```env
EMAIL_SERVICE=sendgrid
EMAIL_USER=your-sendgrid-api-key
```

---

## Support

For issues:
1. Check server console for error messages
2. Verify all environment variables are set correctly
3. Ensure 2FA is enabled on your Google account
4. Try generating a new App Password

