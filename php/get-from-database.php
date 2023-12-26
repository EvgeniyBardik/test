<?php
$db = new SQLite3('./../db/my.db');

$result = $db->query('SELECT * FROM accordion_elements');

$data = [];
while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
    $data[] = $row;
}

$db->close();

header('Content-Type: application/json');
echo json_encode($data);
?>

