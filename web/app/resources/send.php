<?php

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
@$email = $request->email;
@$message = $request->message;

if(isset($email) && isset($message)) {  
  //Email information
  $admin_email = 'hi@thomasmichaeler.com';
  $subject = 'Website Inquiry';
  
  //send email
  mail($admin_email, "$subject", $message, "From:" . $email);
  
  $data['msg'] = 'Message sent!';
} else {
  $data['msg'] = 'Message not sent!'; 
}


$json = json_encode($data);
echo $json;


?>