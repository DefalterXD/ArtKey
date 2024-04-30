<?php
// удаляет ВСЕ записи из БД. Запускается вручную
$db = new SQLite3('../shop.db');

if (!$db) {
    die("Failed to connect to database.");
}

$query = "DELETE FROM items";
$stmt = $db->prepare($query);

if (!$stmt) {
    die("Failed to prepare statement.");
}
$result = $stmt->execute();

if ($result) {
    echo "Data deleted successfully.";
} else {
    echo "Error deleting data.";
}

// Закрытие соединения с базой данных
$db->close();
?>