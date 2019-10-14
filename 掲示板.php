<?php
/**
 * PHP 入門の何かで掲示板のようなものを作るときのサンプル
 *
 * @todo: ファイル読み書きの排他処理
 */
//ログファイルのパスを設定
$log_dir = __DIR__ . '/data';
$log_filename = 'log.json';
$log_path = $log_dir . '/' . $log_filename;
$title_for_page = '掲示板';
//ログファイルが存在すれば読み込む
if (file_exists($log_path)) {
    $messages = json_decode(file_get_contents($log_path), true);
} else {
    $messages = array();
}
//新規投稿があれば取り出して書き込む
if (isset($_POST['message'])) {
    $new_message = $_POST['message'];
    $messages[] = $new_message;
    $message_json = json_encode($messages);
    file_put_contents($log_path, $message_json);
}
//新しいメッセージが上に来るように並べ替え
$messages = array_reverse($messages);
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title><?php echo $title_for_page; ?></title>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <h1><?php echo $title_for_page; ?></h1>
        <form method="post" action="">
            <input type="text" name="message">
            <input type="submit" value="投稿">
        </form>
        <ul>
            <?php
                if (isset($messages)) {
                    foreach ($messages as $key => $message) {
                        //新規投稿だけに適用するクラスを指定
                        $li_class = '';
                        if ($key === 0) {
                            $li_class = ' class="newest"';
                        }
                        echo "<li {$li_class}>" . htmlspecialchars($message) . '</li>';
                    }
                }
            ?>
        </ul>
    </body>
</html>
