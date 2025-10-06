<?php
// Initialize variables
$first_name = $last_name = $email = $message = "";
$success = $error = "";

// Process form when submitted
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Sanitize input
    $first_name = htmlspecialchars(trim($_POST['first_name'] ?? ''));
    $last_name  = htmlspecialchars(trim($_POST['last_name'] ?? ''));
    $email      = htmlspecialchars(trim($_POST['email'] ?? ''));
    $message    = htmlspecialchars(trim($_POST['message'] ?? ''));

    // Validate required fields
    if (empty($first_name) || empty($email) || empty($message)) {
        $error = "Please fill in all required fields.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = "Please enter a valid email address.";
    } else {
        // Prepare email
        $to = "admin@allsaintsla.church"; // Change to your email
        $subject = "New Message from Contact Form";
        $body = "First Name: $first_name\nLast Name: $last_name\nEmail: $email\n\nMessage:\n$message";
        $headers = "From: $email";

        // Attempt to send
        if (mail($to, $subject, $body, $headers)) {
            $success = "Message sent successfully! We'll be in touch soon.";
            // Clear form after sending
            $first_name = $last_name = $email = $message = "";
        } else {
            $error = "Sorry, your message could not be sent. Please try again later.";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Contact Us</title>
<style>
    body { font-family: Arial, sans-serif; max-width: 600px; margin: 2rem auto; line-height: 1.6; }
    .contact-form label { display: block; margin-top: 1rem; }
    input, textarea { width: 100%; padding: 8px; margin-top: 0.5rem; }
    button { margin-top: 1rem; padding: 10px 15px; }
    .success { background: #e8f9ee; color: #0a6028; padding: 1rem; border-radius: 5px; margin-bottom: 1rem; }
    .error { background: #fde8e8; color: #8b0000; padding: 1rem; border-radius: 5px; margin-bottom: 1rem; }
</style>
</head>
<body>

<h1>Contact Us</h1>

<?php if ($success): ?>
    <div class="success"><?= $success ?></div>
<?php elseif ($error): ?>
    <div class="error"><?= $error ?></div>
<?php endif; ?>

<form action="<?= htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="post" class="contact-form">
    <fieldset class="name-fields">
        <div>
            <label for="first_name">First Name <span>(required)</span></label>
            <input type="text" id="first_name" name="first_name" value="<?= $first_name ?>" required>
        </div>
        <div>
            <label for="last_name">Last Name</label>
            <input type="text" id="last_name" name="last_name" value="<?= $last_name ?>">
        </div>
    </fieldset>

    <label for="email">Email <span>(required)</span></label>
    <input type="email" id="email" name="email" value="<?= $email ?>" required>

    <label for="message">Message <span>(required)</span></label>
    <textarea id="message" name="message" rows="5" required><?= $message ?></textarea>

    <button type="submit">Send Message</button>
</form>

</body>
</html>
