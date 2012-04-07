<?php 
require_once('facebook.php');
header("Content-type: text/html; charset=utf-8");
$facebook = new Facebook(
    array(
        'appId' => '000000000000000',
        'secret' => 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        'cookie' => true
    )
);

$permit = 'user_status,read_stream,user_likes,friends_likes,publish_stream,user_notes,friends_notes,user_photos,friends_photos,user_videos,friends_videos';
Facebook::$CURL_OPTS[CURLOPT_SSL_VERIFYPEER] = false;
Facebook::$CURL_OPTS[CURLOPT_SSL_VERIFYHOST] = 2;
$session = $facebook->getUser();

if(!$session) {
    setPermission($facebook, $permit);
}
else{
    try{
        $perms = $facebook->api(
            array(
                "method" => "fql.query",
                "query" => "SELECT ".$permit." FROM permissions WHERE uid=me()"
            )
        );
        foreach($perms[0] as$k => $v) {
            if($v != "1") {
                setPermission($facebook, $permit);
                break;
            }
        }

        $me=$facebook->api(
            array(
                "method" => "fql.query",
                "query" => "SELECT uid,name,profile_url,locale FROM user WHERE uid=me()"
            )
        );
        $me = $me[0];
        if(
            preg_match('/iPhone|iPod|Android/i', $_SERVER['HTTP_USER_AGENT']) &&
            $_GET['mb'] != '1'
        ) {
            echo'<script type="text/javascript">top.location.href="http://atms.sakura.ne.jp/wallsearch/?mb=1"</script>';
            exit;
        }
    }
    catch(FacebookApiException$e) {
        echo$e->getMessage();
        exit;
    }
}
function setPermission($facebook, $permit) {
    echo'<script type="text/javascript">top.location.href="'.$facebook->getLoginUrl(array('canvas'=>1,'fbconnect'=>0,'scope'=>$permit)).'";</script>';
    exit;
}

if($me['locale'] == 'ja_JP') {
    $apName = 'ウォール検索';
    $searchExp = '検索';
    $searchBtn = '検索';
    $optLabel = '検索オプション';
    $periodLabel = '期間を選択する';
    $penone = '指定なし';
    $peh24 = '24時間以内';
    $peweek = '1週間以内';
    $pemonth = '1ヶ月以内';
    $attachLabel = '検索対象を選ぶ';
    $otherLabel = 'その他';
    $atonly = 'リンク付き投稿のみ検索する';
    $lionly = 'いいね！した投稿のみ検索する';
    $coonly = 'コメントした投稿のみ検索する';
    $strict = '大文字・小文字を区別する';
    $nonstop = '一時停止せず検索する';
    $rame = '自分のウォール';
    $rafr = '友達のウォール';
    $raall = '自分＋友達のウォール';
    $exp = 'このアプリケーションは、以下のブラウザで正しく動作します。';
    $tipQuery = '入力例：本文、ユーザー名、最新コメント、リンクのタイトルなど...';
    $tipRange = '検索するウォールを選択してください。';
    if($_GET['mb']){
        $rame = '自分';
        $rafr = '友達';
        $raall = '自分+友達';
    }
}
else {
    $apName = 'Search Posts';
    $searchExp = 'Search';
    $searchBtn = 'Search';
    $optLabel = 'Options';
    $periodLabel = 'Period';
    $penone = 'none';
    $peh24 = 'past 24hours';
    $peweek = 'past 1week';
    $pemonth = 'past 1month';
    $attachLabel = 'Target';
    $otherLabel = 'Other';
    $atonly = 'only attachment';
    $lionly = 'only liked';
    $coonly = 'only commented';
    $strict = 'case-sensitive';
    $nonstop = 'not pause';
    $rame = 'My Wall';
    $rafr = 'Friends Wall';
    $raall = 'All Wall';
    $exp = 'This application works correctly in the browser below.';
    $tipQuery = 'Sample: Body, user name, the latest comments, link titles...';
    $tipRange = 'Search Select a Wall.';
}?>
