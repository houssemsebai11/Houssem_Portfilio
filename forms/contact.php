<?php
/**
 * Updated Contact Form - Now saves directly to Supabase database
 * No email libraries needed - connects via Zapier webhook
 */

// Set headers for AJAX response
header('Content-Type: application/json');

// Check if form data exists
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
    exit;
}

// Validate required fields
$required_fields = ['name', 'email', 'message'];
$missing_fields = [];

foreach ($required_fields as $field) {
    if (empty($_POST[$field])) {
        $missing_fields[] = $field;
    }
}

if (!empty($missing_fields)) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error', 
        'message' => 'Missing required fields: ' . implode(', ', $missing_fields)
    ]);
    exit;
}

// Your Zapier webhook URL (generated from the trigger step)
$webhook_url = 'https://hooks.zapier.com/hooks/catch/20134506/23ow3ec/';

// Prepare form data for Supabase
$form_data = array(
    'name' => trim($_POST['name']),
    'email' => trim($_POST['email']),
    'subject' => isset($_POST['subject']) ? trim($_POST['subject']) : 'Contact Form Submission',
    'message' => trim($_POST['message']),
    'submitted_at' => date('Y-m-d H:i:s'),
    'ip_address' => $_SERVER['REMOTE_ADDR'] ?? 'unknown'
);

// Validate email format
if (!filter_var($form_data['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid email format']);
    exit;
}

// Send data to Zapier webhook (which saves to Supabase)
$ch = curl_init();
curl_setopt_array($ch, array(
    CURLOPT_URL => $webhook_url,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($form_data),
    CURLOPT_HTTPHEADER => array(
        'Content-Type: application/json',
        'Content-Length: ' . strlen(json_encode($form_data))
    ),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_SSL_VERIFYPEER => true
));

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curl_error = curl_error($ch);
curl_close($ch);

// Handle response
if ($curl_error) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Connection error: ' . $curl_error]);
} elseif ($http_code >= 200 && $http_code < 300) {
    // Success response for AJAX
    echo json_encode([
        'status' => 'success', 
        'message' => 'Thank you! Your message has been sent successfully.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'status' => 'error', 
        'message' => 'Failed to submit form. Please try again.'
    ]);
}
?>
