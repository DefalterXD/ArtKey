<?php
// добавляет строку в БД по POST запросу от фронта
$db = new SQLite3('../shop.db');

$id = $_POST['id'];
$name = $_POST['name'];
$image = $_POST['image'];
$price = $_POST['price'];

$query = "INSERT INTO items (id,name,image, price) VALUES (:id, :name,:image,:price)";
$stmt = $db->prepare($query);
$stmt->bindValue(':id', $id, SQLITE3_INTEGER);
$stmt->bindValue(':name', $name, SQLITE3_TEXT);
$stmt->bindValue(':image', $image, SQLITE3_BLOB);
$stmt->bindValue(':price', $price, SQLITE3_FLOAT);

if ($stmt->execute()) {
    echo "Data inserted successfully.";
} else {
    echo "Error inserting data.";
}

$db->close();
?>