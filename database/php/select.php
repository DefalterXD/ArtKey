<?php
// берёт все продкуты из базы чтоб показать на фронте
$db = new SQLite3('../shop.db');

$query = "SELECT id, name, image, price FROM items";
$result = $db->query($query);

$products = array();

while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
    $product = array(
        'id' => $row['id'],
        'name' => $row['name'],
        'images' => $row['image'],
        'price' => $row['price']
    );
    array_push($products, $product);
}

echo json_encode($products);

$db->close();
?>