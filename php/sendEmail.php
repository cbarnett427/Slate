<?php
// Enable error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include PHPMailer library
require '/PHPMailer/src/PHPMailer.php';
require '/PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

// Setting manual "To:" email address header
$to = 'email@example.com';

// Initialize $message variable
$message = '';

function url() {
    return sprintf(
        "%s://%s",
        isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' ? 'https' : 'http',
        $_SERVER['SERVER_NAME']
    );
}

if ($_POST) {
    $name = $_POST['name']; // required
    $email = $_POST['email']; // required
    $subject = $_POST['subject']; // required
    $contact_message = $_POST['message']; // required

    function clean_string($string) {
        $bad = array("content-type","bcc:","to:","cc:","href");
        return str_replace($bad,"",$string);
    }

    // If subject blank, set value to "Contact Form Submission"
    if ($subject === '') {
        $subject = "Contact Form Submission";
    }

    // Set Message
    $message .= "Sent from your website: ".url()."\n\n";
    $message .= "Email From: ".clean_string($name)."\n";
    $message .= "Email Address: ".clean_string($email)."\n";
    $message .= "Subject: ".clean_string($subject)."\n";
    $message .= "".clean_string($contact_message);
    $message .= "".clean_string($name);

    // Instantiate PHPMailer
    $mail = new PHPMailer();

    // Configure SMTP settings
    $mail->isSMTP();
    $mail->Host = 'your-smtp-host'; // Replace with your SMTP host
    $mail->Port = 587; // Replace with your SMTP port (usually 587 for TLS or 465 for SSL)
    $mail->SMTPAuth = true;
    $mail->Username = 'your-smtp-username'; // Replace with your SMTP username
    $mail->Password = 'your-smtp-password'; // Replace with your SMTP password
    
    // Set From, To, Subject, and Message
    $mail->setFrom($email, $name);
    $mail->addAddress($to);
    $mail->addReplyTo($email, $name); // Set Reply-To email address
    $mail->Subject = $subject;
    $mail->Body = $message;

    // Debugging Code - Uncomment for Debugging
    // $mail->SMTPDebug = SMTP::DEBUG_SERVER;
    // $mail->Debugoutput = 'html';

    if ($mail->send()) {
        header('location: success.php');
        exit(); // Add this line to stop further execution after the redirect
    } else {
        header('location: error.php');
        exit(); // Add this line to stop further execution after the redirect
    }
}
// No other content or output beyond this point
?>