<?php require_once('lib/auth.php');?><!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>Search Posts - ウォール検索</title>
<link rel="stylesheet" href="wall.css" />
<?php if($_GET['tab']=='1'){ ?>
<link rel="stylesheet" href="t.css" />
<?php }else if($_GET['mb']=='1'){?>
<link rel="stylesheet" href="m.css" />
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
<?php }else{?>
<!--[if lt IE 9]><script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
<?php }?>
</head>
<body>
<header id="t">
    <h1><?=$apName?></h1>
    <?php if($_GET['mb']!='1'){?><iframe id="l" src="http://www.facebook.com/plugins/like.php?app_id=230251640320544&locale=en_US&href=http%3A%2F%2Fwww.facebook.com%2Fapps%2Fapplication.php%3Fid%3D168589393194273&send=false&layout=button_count&width=120&show_faces=true&action=like&colorscheme=light&font&height=21" scrolling="no" frameborder="0" style="border:none;overflow:hidden;width:120px;height:21px" allowTransparency="true"></iframe><?php }?>
    <div class="l c">
        <p>Hello <a href="<?=$me['profile_url']?>" target="_blank"><?=$me['name']?></a>.</p>
        <?php if($_GET['mb']!='1'){?><ul class="c">
            <li><a href="https://github.com/AtsushiM/Facebook-WallSearch" target="_blank">github</a></li>
            <li><a href="https://www.facebook.com/pages/Search-Posts-%E3%82%A6%E3%82%A9%E3%83%BC%E3%83%AB%E6%A4%9C%E7%B4%A2-Community/341257545897974" target="_blank">about</a></li>
        </ul><?php }?>
    </div>
    <form id="s" action=".">
        <div id="i">
            <p class="t"><input type="text" name="q" id="q" value="" placeholder="<?=$searchExp?>" /><span class="p"><?=$tipQuery?></span></p>
            <p id="b"><input type="image" src="l.png" value="<?=$searchBtn?>" id="y" /><span class="a c"><span class="a1"></span><span class="a2"></span><span class="a3"></span></span></p>
            <p id="o">0/0</p>
        </div>
        <div id="g">
            <h2 id="v">+ <?=$optLabel?></h2>
            <div id="d">
                <?php if($_GET['mb']!='1'){?>
                <fieldset>
                    <legend><?=$periodLabel?></legend>
                    <select name="p" id="p">
                        <option id="pn" value="" selected="selected"><?=$penone?></option>
                        <option id="ph" value="h"><?=$peh24?></option>
                        <option id="pw" value="w"><?=$peweek?></option>
                        <option id="pm" value="m"><?=$pemonth?></option>
                    </select>
                </fieldset>
                <?php }?>
                <fieldset>
                    <legend><?=$otherLabel?></legend>
                    <ul>
                        <li><input type="checkbox" name="ao" id="ao" value="1" /><label for="ao"><?=$atonly?></label></li>
                        <li><input type="checkbox" name="lo" id="lo" value="1" /><label for="lo"><?=$lionly?></label></li>
                        <li><input type="checkbox" name="os" id="os" value="1" /><label for="os"><?=$strict?></label></li>
                        <?php if($_GET['mb']!='1'){?>
                        <li><input type="checkbox" name="ns" id="ns" value="1" /><label for="ns"><?=$nonstop?></label></li>
                        <?php }?>
                    </ul>
                </fieldset>
            </div>
        </div>
        <!-- <nav id="r" class="t"> -->
        <!--     <ul class="c"> -->
        <!--         <li><input type="radio" name="r" id="rm" value="me" checked="checked" /><label for="rm"><?=$rame?></label></li> -->
        <!--         <li><input type="radio" name="r" id="rf" value="friends" /><label for="rf"><?=$rafr?></label></li> -->
        <!--         <li><input type="radio" name="r" id="ra" value="all" /><label for="ra"><?=$raall?></label></li> -->
        <!--         <li><input type="radio" name="r" id="rs" value="star" /><label for="rs">★</label></li> -->
        <!--     </ul> -->
        <!--     <p class="p"><?=$tipRange?></p> -->
        <!-- </nav> -->
        <nav id="r" class="t ui-buttonset">
            <ul class="c">
                <li>
                    <input type="radio" name="r" id="rm" value="me" checked="checked" class="ui-helper-hidden-accessible">
                    <label for="rm" aria-pressed="false" class="ui-button ui-widget ui-state-default ui-button-text-only ui-corner-left" role="button">
                        <span class="ui-button-text">自分のウォール</span>
                    </label>
                </li>
                <li>
                    <input type="radio" name="r" id="rf" value="friends" class="ui-helper-hidden-accessible">
                    <label for="rf" aria-pressed="false" class="ui-button ui-widget ui-state-default ui-button-text-only" role="button">
                        <span class="ui-button-text">友達のウォール</span>
                    </label>
                </li>
                <li>
                    <input type="radio" name="r" id="ra" value="all" class="ui-helper-hidden-accessible">
                    <label for="ra" class="ui-state-active ui-button ui-widget ui-state-default ui-button-text-only" aria-pressed="true" role="button">
                        <span class="ui-button-text">自分＋友達のウォール</span>
                    </label>
                </li>
                <li>
                    <input type="radio" name="r" id="rs" value="star" class="ui-helper-hidden-accessible">
                    <label for="rs" aria-pressed="false" class="ui-button ui-widget ui-state-default ui-button-text-only ui-corner-right" role="button">
                        <span class="ui-button-text">★</span>
                    </label>
                </li>
            </ul>
            <p class="p">検索するウォールを選択してください。</p>
        </nav>
    </form>
</header>
<div id="w">
    <!--[if IE]><div id="x"><p><?=$exp?></p><ul><li>Google Chrome</li><li>Safari</li><li>Mozilla Firefox</li></ul></div><![endif]-->
</div>
<footer>
    <?php if($_GET['mb']!='1'){?>
    <ul id="c" class="c">
        <li>Programs &amp; Coding :@<a href="http://www.facebook.com/atsushi.mizoue" target="_blank">Atsushi Mizoue</a></li>
        <li id="k">Special Thanks :@<a href="http://www.facebook.com/chroru" target="_blank">Ken Kuroda</a></li>
        <li id="f">FQL Teacher :@<a href="http://www.facebook.com/pinmarch.t" target="_blank">Satoshi Tada</a></li>
    </ul>
    <?php }else{?>
    <a href="#t" id="pt">&gt;&gt; Page Top</a>
    <?php }?>
</footer>
<div id="fb-root"></div>
<script>
    var UID='<?=$me['uid']?>',
        LA='<?=$me['local']?>',
        Q='<?=$_GET['q']?>',
        R='<?=$_GET['r']?>',
        NO=<?php if($_GET['no']){echo 'true';}else{echo 'false';} ?>;
</script>
<script src="jquery.mix.js"></script>
<script src="wall.js"></script>
</body>
</html>
