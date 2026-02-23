// ──────────────────────────────────────────────────────────────────────────
// Google Apps Script — Portfolio Contact Form Email Handler
// Deploy this at: script.google.com → New Project → paste → Deploy as Web App
// ──────────────────────────────────────────────────────────────────────────

function doPost(e) {
    try {
        var data = JSON.parse(e.postData.contents);

        var name = data.name || "Unknown";
        var email = data.email || "No email";
        var message = data.message || "No message";

        // Send email directly to your Gmail
        MailApp.sendEmail({
            to: "tejanarapureddy2@gmail.com",
            subject: "📩 Portfolio Contact from " + name,
            body:
                "You have a new message from your portfolio website!\n\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━\n" +
                "Name:    " + name + "\n" +
                "Email:   " + email + "\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
                "Message:\n" + message + "\n\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━\n" +
                "Sent from manotejareddy.xyz contact form",
            replyTo: email,
        });

        return ContentService
            .createTextOutput(JSON.stringify({ success: true }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (err) {
        return ContentService
            .createTextOutput(JSON.stringify({ success: false, error: err.message }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

// Required for CORS preflight
function doGet(e) {
    return ContentService
        .createTextOutput("Portfolio contact form endpoint is live.")
        .setMimeType(ContentService.MimeType.TEXT);
}
