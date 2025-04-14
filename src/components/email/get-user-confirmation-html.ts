const APP_NAME = "Hoo-man"
const COMPANY_NAME = "Hoo-man"
const WEBSITE_URL = "https://hoo-man.vercel.app/"

// Function to generate User Confirmation HTML
export function getUserConfirmationHtml(
  userName: string,
  bookingDate: Date,
): string {
  const formattedDate = bookingDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  // Assuming a generic time confirmation or follow-up for specific time
  const bookingTime = "During Business Hours (Details to Follow)";
  const timezone = "Australian time"; 
  const currentYear = new Date().getFullYear();
  const address = "545 kent street, NSW 2000, Australia";

  // Using the simplified user confirmation template structure
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Your ${APP_NAME} Demo is Confirmed!</title>
<style>
  body { margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333333; background-color: #f9f9f9; }
  .container { width: 100%; max-width: 580px; margin: 30px auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); overflow: hidden; }
  .header { background-color: #4a90e2; padding: 30px 20px; text-align: center; }
  .header h1 { margin: 0; color: #ffffff; font-size: 26px; font-weight: 500; }
  .content { padding: 35px 30px; }
  .content h2 { color: #333333; font-size: 22px; margin-top: 0; margin-bottom: 20px; font-weight: 500; }
  .content p { margin-bottom: 15px; color: #555555; font-size: 16px; }
  .details { background-color: #eef5fc; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 5px solid #4a90e2; }
  .details p { margin: 10px 0; font-size: 16px; color: #333; }
  .details strong { font-weight: 600; color: #4a90e2; }
  .footer { padding: 20px 30px; text-align: center; font-size: 13px; color: #888888; border-top: 1px solid #eeeeee; }
  .footer a { color: #4a90e2; text-decoration: none; }
</style>
</head>
<body>
<div class="container">
  <div class="header"><h1>${APP_NAME}</h1></div>
  <div class="content">
    <h2>Your Demo is Confirmed!</h2>
    <p>Hi ${userName},</p>
    <p>Great news! Your demo for <strong>${APP_NAME}</strong> has been successfully scheduled. We're excited to show you around.</p>
    <div class="details">
      <p><strong>Date:</strong> ${formattedDate}</p>
      <p><strong>Time:</strong> ${bookingTime} (${timezone})</p>
      <p><strong>Address:</strong> ${address}</p>
    </div>
    <p>We'll meet you at the address. If you have any immediate questions, feel free to reply to this email.</p>
    <p>Best regards,<br />The ${APP_NAME} Team</p>
  </div>
  <div class="footer">
    <p>&copy; ${currentYear} ${COMPANY_NAME}. All rights reserved.</p>
    <p><a href="${WEBSITE_URL}">Visit our website</a></p>
  </div>
</div>
</body>
</html>
  `;
}
