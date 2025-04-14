
export function getAdminNotificationHtml(
    userName: string,
    userEmail: string,
    bookingDate: Date,
    companyName?: string | null,
    notes?: string | null,
  ): string {
    const formattedDate = bookingDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    // Assuming a generic time confirmation or follow-up for specific time
    const bookingTime = "During Business Hours";
    const timezone = "Australian time"; // Or specify relevant timezone
  
    // Using the simplified admin notification template structure
    return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Demo Booking: ${userName}</title>
  <style>
    body { margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333333; background-color: #f4f4f4; }
    .container { width: 100%; max-width: 580px; margin: 30px auto; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; }
    .header { background-color: #f8f8f8; padding: 20px; border-bottom: 1px solid #e0e0e0; }
    .header h2 { margin: 0; font-size: 20px; color: #333; font-weight: 600; }
    .content { padding: 25px 30px; }
    .content h3 { color: #4a90e2; font-size: 18px; margin-top: 0; margin-bottom: 20px; border-bottom: 2px solid #eef5fc; padding-bottom: 8px; }
    .info-grid { margin-bottom: 20px; }
    .info-grid p { margin: 8px 0; font-size: 15px; color: #444; }
    .info-grid strong { display: inline-block; min-width: 100px; font-weight: 600; color: #111; }
    .footer { padding: 15px 30px; text-align: center; font-size: 12px; color: #999999; background-color: #f8f8f8; border-top: 1px solid #e0e0e0; }
  </style>
  </head>
  <body>
  <div class="container">
    <div class="header"><h2>✨ New Demo Booking Notification</h2></div>
    <div class="content">
      <h3>Booking Details:</h3>
      <div class="info-grid">
        <p><strong>Name:</strong> ${userName}</p>
        <p><strong>Email:</strong> <a href="mailto:${userEmail}" style="color: #4a90e2; text-decoration: none;">${userEmail}</a></p>
        ${companyName ? `<p><strong>Company:</strong> ${companyName}</p>` : ""}
        <p><strong>App:</strong> Hoo-man</p>
        <p><strong>Preferred Date:</strong> ${formattedDate}</p>
        <p><strong>Preferred Time:</strong> ${bookingTime} (${timezone})</p>
        ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ""}
      </div>
      <p>Please follow up or prepare for the demo accordingly.</p>
    </div>
    <div class="footer"><p>Automated notification from the booking system.</p></div>
  </div>
  </body>
  </html>
    `;
  }