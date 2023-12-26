<?php
$db = new SQLite3('./../db/my.db');
$postData = json_decode(file_get_contents('php://input'), true);

$db->exec('DROP TABLE IF EXISTS accordion_elements');
$db->exec('CREATE TABLE accordion_elements (id INTEGER PRIMARY KEY AUTOINCREMENT, value1 TEXT, textAreaInput TEXT)');

foreach ($postData as $element) {
    $value1 = $db->escapeString($element['value1']);
    $textAreaInput = $db->escapeString($element['textAreaInput']);
    $db->exec("INSERT INTO accordion_elements (value1, textAreaInput) VALUES ('$value1', '$textAreaInput')");
}

$db->close();

header('Content-Type: application/json');
echo json_encode(['success' => true]);
?>

