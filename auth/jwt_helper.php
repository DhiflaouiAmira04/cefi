<?php

function base64url_encode($data) {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function base64url_decode($data) {
    $remainder = strlen($data) % 4;
    if ($remainder) {
        $padlen = 4 - $remainder;
        $data .= str_repeat('=', $padlen);
    }
    return base64_decode(strtr($data, '-_', '+/'));
}

function generateJWT($payload, $secret) {
    $header = json_encode([
        "alg" => "HS256",
        "typ" => "JWT"
    ]);

    $header = base64url_encode($header);
    $payload = base64url_encode(json_encode($payload));

    $signature = hash_hmac('sha256', "$header.$payload", $secret, true);
    $signature = base64url_encode($signature);

    return "$header.$payload.$signature";
}

function validateJWT($token, $secret) {
    $parts = explode('.', $token);
    if (count($parts) !== 3) return false;

    list($headerB64, $payloadB64, $signatureB64) = $parts;
    $payload = json_decode(base64url_decode($payloadB64));
    $expectedSignature = base64url_encode(hash_hmac('sha256', "$headerB64.$payloadB64", $secret, true));

    if (!hash_equals($expectedSignature, $signatureB64)) {
        return false;
    }

    // التحقق من انتهاء الصلاحية
    if (isset($payload->exp) && time() > $payload->exp) {
        return false;
    }

    return $payload;
}
