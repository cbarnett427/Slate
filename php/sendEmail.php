<?php

// Replace this with your own email address
$to = 'you@example.com';

function url(){
    return sprintf(
        "%s://%s",
        isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off' ? 'https' : 'http',
        $_SERVER['SERVER_NAME']
    );
}

if($_POST) {

    $name = $_POST['name']; // required
    $email = $_POST['email']; // required
    $subject = $_POST['subject']; // required
    $contact_message = $_POST['message']; // required

    function clean_string($string) {
        $bad = array("content-type","bcc:","to:","cc:","href");
        return str_replace($bad,"",$string);
      }

   
	// If subject blank, set value to "Contact Form Submission"
    if ($subject == '') { $subject = "Contact Form Submission"; }

    // Set Message
    $message .= "Sent from your website: ".url()."\n\n";
    // $message .= "Email From: ".clean_string($name)."\n";
    // $message .= "Email Address: ".clean_string($email)."\n";
    // $message .= "Subject: ".clean_string($subject)."\n";
    $message .= "".clean_string($contact_message);

    // Set From: header
    $from =  $name . " <" . $email . ">";

    // Email Headers
    $headers = 'From: '.$from."\r\n".
    $headers .= 'Reply-To: '.$email."\r\n" .
    $headers .= 'X-Mailer: PHP/' . phpversion();

    ini_set("sendmail_from", $to); // for windows server
    $mail = mail($to, $subject, $message, $headers);

    if ($mail) {
        header('location: success.php');
    } else {
        header('location: error.php');
    }
    }

?>