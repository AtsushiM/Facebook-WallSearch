var WS = (function(win, doc) {
    (function(d) {
        var j,
            i = 'facebook-jssdk';

        j = d.createElement('script');
        j.id = i;
        j.async = true;
        j.src = '//connect.facebook.net/en_US/all.js';
        d.getElementsByTagName('head')[0].appendChild(j);
    }(doc));

    win.fbAsyncInit = function() {
        FB.init({
            appId: '168589393194273',
            channelUrl: '//atms.sakura.ne.jp/amidawars/index.php',
            status: true,
            cookie: true,
            xfbml: true
        });
        $('#s').slideDown(cS);
        if (Q) {
            sInit();
        }
    };

    var ret = {
            like: function(i, t, m) {
                t.disabled = true;

                if (sR.me[i]) {
                    m = sR.me[i].likes.user_likes;
                }
                else if (sR.friends[i]) {
                    m = sR.friends[i].likes.user_likes;
                }
                else if (sR.all[i]) {
                    m = sR.all[i].likes.user_likes;
                }

                if (m === true) {
                    m = 'delete';
                }
                else {
                    m = 'post';
                }

                FB.api('/' + i + '/likes', m, function(r) {
                    if (r && !r.error) {
                        t.innerHTML = lTT[m];

                        if (sR.me[i]) {
                            sR.me[i].likes.user_likes = !sR.me[i].likes.user_likes;
                        }
                        if (sR.friends[i]) {
                            sR.friends[i].likes.user_likes =
                            !sR.friends[i].likes.user_likes;
                        }
                        if (sR.all[i]) {
                            sR.all[i].likes.user_likes = !sR.all[i].likes.user_likes;
                        }
                    }
                    else {
                        alert(liFT);
                    }

                    t.disabled =  false;
                });
                return false;
            },
            star: function(t) {
                var s = gLS('star'),
                    i = t.name;

                s = s ? J.parse(s) : {};
                if (t.className === 's') {
                    t.className = 's o';
                    s[i] = tR[i];
                }
                else {
                    t.className = 's';
                    delete s[i];
                }

                sLS('star', J.stringify(s));
            }
        },
        $W = $('#w')[0],
        $C = $('#o')[0],
        $Q = $('#q')[0],
        $B = $('#b')[0],
        $CF = $('#d'),
        $RM = $('#rm')[0],
        $RF = $('#rf')[0],
        $RA = $('#ra')[0],
        $RS = $('#rs')[0],
        $PN = $('#pn')[0],
        $PH = $('#ph')[0],
        $PW = $('#pw')[0],
        $PM = $('#pm')[0],
        $AO = $('#ao')[0],
        $LO = $('#lo')[0],
        $OS = $('#os')[0],
        $NS = $('#ns')[0],
        $ET,
        peL = 'もっと見る',
        shT = 'シェア',
        stT = '星',
        sMT = 'もっと検索する',
        sET = '検索が終了しました',
        lT = 'いいね！',
        uLT = 'いいねを取り消す',
        liFT = 'いいね！に失敗しました。時間を置いてもう一度お試しください。',
        hC,
        tC,
        now,
        tR,
        sR = {
            me: {},
            friends: {},
            all: {}
        },
        pT = [
            '<article><img src="https://graph.facebook.com/',
            '/picture" class="i" /><div><h2><a href="',
            '" target="_blank">',
            '</a></h2><p>',
            '</p>',
            '<aside>',
            '</aside><time>',
            '</time><nav>· <a href="',
            '" target="_blank" class="u">' +
                peL +
                '</a>· <a href="http://www.facebook.com/sharer.php?u=',
            '" target="_blank" class="u">' + shT + '</a>',
            '</nav></div><a class="s',
            '" title="' + stT + '" name="',
            '" onclick="WS.star(this)">★</a></article>'
        ],
        lBT = [
            '· <a href="javascript:void(0);" onclick="WS.like(\'',
            /* '\',\'', */
            '\',this);">',
            '</a>'
        ],
        pAT = [
            '<blockquote><a href="',
            '" target="_blank" class="h"><img src="',
            '" /></a><div><h3><a href="',
            '" target="_blank">',
            '</a></h3><p>',
            '</p></div></blockquote>'
        ],
        pA = [
            '<blockquote><h2><a href="',
            '" target="_blank">',
            '</a></h2><p>',
            '</p></blockquote>'
        ],
        rT = '<mark>$1</mark>',
        anT = '<span class="a c"><span class="a1"></span>' +
            '<span class="a2"></span><span class="a3"></span></span>',
        loT = '<p id="e">' + anT + '</p>',
        lTT = {
            'delete': lT,
            'post': uLT
        },
        lTM = {
            'delete': 'post',
            'post': 'delete'
        },
        fql = {
            me: '=me() AND permalink!=""',
            friends: 'in(SELECT target_id FROM' +
                    ' connection WHERE source_id=me())AND source_id!=me()',
            all: 'in(SELECT target_id FROM connection WHERE source_id=me())'
        },
        fqli,
        cS = 'fast',
        d1 = 86400000,
        JF = true,
        J = JSON,
        LS = win.localStorage;

    if (LA !== 'ja_JP') {
        peL = 'View post';
        shT = 'Share';
        stT = 'Star';
        sMT = 'More';
        sET = 'Search Exit.';
        lT = 'Like';
        uLT = 'unlike';
        liFT = 'Like Failed. Please try again at intervals.';

        lTT = {
            'delete': lT,
            'post': uLT
        }
    }

    for (fqli in fql) {
        fql[fqli] = 'SELECT post_id,actor_id,message,created_time,' +
            'permalink,attachment,comments,likes FROM stream WHERE ' +
            'source_id ' + fql[fqli] +
            ' AND is_hidden=0';
    }

    if (LS && typeof(J) === 'object' && J.stringify && J.parse) {
        var q = gLS('query'),
            r = gLS('range'),
            p = gLS('period');

        if (Q) {
            q = Q;
        }
        if (R) {
            r = R;
        }
        if (q) {
            $Q.value = q;
        }

        if (r && r !== 'me') {
            $RM.checked = false;

            switch (r) {
                case 'friends':
                    $RF.checked = true;
                    break;
                case 'all':
                    $RA.checked = true;
                    break;
                default:
                    $RS.checked = true;
                    break;
            }
        }
        if (p && p !== '') {
            $PN.selected = false;

            switch (p) {
                case 'h':
                    $PH.selected = true;
                    break;
                case 'w':
                    $PW.selected = true;
                    break;
                default:
                    $PM.selected = true;
                    break;
            }
        }
        if (gLS('atonly') == 1) {
            $AO.checked = true;
        }
        if (gLS('lionly') == 1) {
            $LO.checked = true;
        }
        if (gLS('strict') == 1) {
            $OS.checked = true;
        }
        if (gLS('nonstop') == 1) {
            $NS.checked = true;
        }
    }
    else {
        JF = false;
        $RS.disabled = true;
        pT[10] = '</div></div></div></li>';
    }

    $('#y').button()[0].onclick = function() {
        sInit();
        return false;
    };
    $('#r').buttonset().find('input').click(function() {
        sInit();
    });
    $('#v')[0].onclick = function() {
        $CF.slideToggle(cS);
    };

    $('a[href^=#]').click(function() {
        location.hash = $(this).attr('href');
        location.hash = '';
        return false;
    });

function sInit() {
    var w = $Q.value,
        ao = gChecked($AO),
        lo = gChecked($LO),
        os = gChecked($OS),
        ns = gChecked($NS),
        r,
        p;

    if ($RM.checked === true) {
        r = $RM.value;
    }
    else if ($RF.checked === true) {
        r = $RF.value;
    }
    else if ($RA.checked === true) {
        r = $RA.value;
    }
    else {
        r = $RS.value;
    }

    if ($PN.selected === true) {
        p = $PN.value;
    }
    else if ($PH.selected === true) {
        p = $PH.value;
    }
    else if ($PW.selected === true) {
        p = $PW.value;
    }
    else {
        p = $PM.value;
    }

    tR = {};
    now = new Date().getTime();
    hC = tC = 0;

    $C.innerHTML = '0/0';
    $W.innerHTML = loT;
    $ET = $('#e')[0];
    $ET.style.display = 'block';
    $B.className = 'n';

    if (LS) {
        sLS('query', w);
        sLS('atonly', ao);
        sLS('lionly', lo);
        sLS('strict', os);
        sLS('nonstop', ns);
        sLS('range', r);
        sLS('period', p);
    }
    if (p !== '') {
        var d = d1;
        switch (p) {
            case 'w':
                d = d * 7;
                break;
            case 'm':
                d = d * 30;
                break;
            default:
                break;
        }
        p = now - d;
    }
    if (w) {
        var ropt = 'ig';

        if (os) {
            ropt = 'g';
        }

        w = w
            .replace(/　/g, ' ')
            .replace(/^\s+|\s+$/g, ' ')
            .split(' ');

        for (var i = 0, l = w.length; i < l; i++) {
            w[i] = new RegExp('(' + hEsc(w[i])
                   .replace(/([\\|\(|\)|\{|\}|\[|\]|\.|\^|\||\+|\*|\?|\$])/g,
                   '\\$1') + ')',
                   ropt);
        }
    }

    var c = {
        ec: 0,
        sc: 0,
        bc: 0,
        atonly: ao,
        lionly: lo,
        strict: os,
        nonstop: ns,
        range: r,
        period: p,
        word: w,
        q: fql[r],
        qid: now
    };

    if (r !== 'star') {
        sPost(c, false);
    }
    else {
        var stars = gLS('star');
        stars = stars ? J.parse(stars) : {};
        sStar(stars, c, Math.floor(now / 1000));
    }
}
function _s(res, conf) {
    if (now === conf.qid) {
        var html = '',
            uname = '',
            uurl = '',
            word = conf.word,
            h = 0,
            i,
            resi,
            m,
            media,
            athtml,
            at,
            atname,
            atdes,
            hw,
            re,
            hew,
            hit,
            user,
            uname,
            uurl,
            lihtml,
            sharelink,
            permalink,
            groupID,
            d,
            com,
            comlist,
            comi,
            comlen,
            j,
            wordlen,
            stars;

        for (i in res) {
            resi = res[i];
            user = resi.user;
            m = hEsc(resi.message);
            at = {};
            atname = atdes = '';
            hit = true;

            if (resi.attachment) {
                at = resi.attachment;
                atname = hEsc(at.name);
                atdes = hEsc(at.description);
                media = at.media;
            }
            if (user) {
                uname = user.name;
                uurl = user.profile_url;
            }

            if (
                (conf.atonly == 1 && !atname && !atdes && !media) ||
                (conf.lionly == 1 &&
                    resi.likes &&
                    !resi.likes.user_likes) ||
                (conf.period > resi.created_time * 1000)
            ) {
                hit = false;
            }
            else if (word[0] !== '') {
                hw = m + atname + atdes;

                if (user && user.name) {
                    hw += user.name;
                }
                if (resi.comments) {
                    comlist = resi.comments.comment_list;
                    com = '';
                    for (comi = 0, comlen = comlist.length;
                            comi < comlen;
                            comi++) {
                        com += ' ' + comlist[comi].text;
                    }
                    hw += com;
                }
                for (j = 0, wordlen = word.length; j < wordlen; j++) {
                    hew = word[j];
                    if (!hw.match(hew)) {
                        hit = false;
                        break;
                    }
                    else {
                        m = m.replace(hew, rT);
                        atname = atname.replace(hew, rT);
                        atdes = atdes.replace(hew, rT);
                        com = com.replace(hew, rT);
                        uname = uname.replace(hew, rT);
                    }
                }
            }

            if (hit) {
                tR[resi.post_id] = resi;
                athtml = lihtml = '';
                permalink = sharelink = resi.permalink;

                if (at && at.properties) {
                    if (media[0]) {
                        media = media[0];
                        sharelink = media.href;
                        athtml = pAT[0] +
                                 sharelink +
                                 pAT[1] +
                                 media.src +
                                 pAT[2] +
                                 sharelink +
                                 pAT[3] +
                                 atname +
                                 pAT[4] +
                                 atdes +
                                 pAT[5];
                    }
                    else {
                        sharelink = resi.attachment.href;
                        athtml = pA[0] +
                                 sharelink +
                                 pA[1] +
                                 atname +
                                 pA[2] +
                                 atdes +
                                 pA[3];
                    }
                }
                if (conf.range !== 'star') {
                    lihtml = lBT[0] + resi.post_id + lBT[1];
                    if (!resi.likes.user_likes) {
                        /* lihtml += 'post' + lBT[2] + lT; */
                        lihtml += lT;
                    }
                    else {
                        /* lihtml += 'delete' + lBT[2] + uLT */;
                        lihtml += uLT;
                    }
                    lihtml += lBT[2];
                }
                d = new Date(resi.created_time * 1000);
                html += pT[0] +
                        resi.actor_id +
                        pT[1] +
                        uurl +
                        pT[2] +
                        uname +
                        pT[3] +
                        m +
                        pT[4] +
                        athtml +
                        pT[5] +
                        com +
                        pT[6] +
                        d.getFullYear() +
                        '/' +
                        d2((d.getMonth() + 1)) +
                        '/' +
                        d2(d.getDate()) +
                        ' ' +
                        d2(d.getHours()) +
                        ':' +
                        d2(d.getMinutes()) +
                        ':' +
                        d2(d.getSeconds()) +
                        pT[7] +
                        permalink +
                        pT[8] +
                        sharelink +
                        pT[9] +
                        lihtml +
                        pT[10];

                if (JF) {
                    stars = gLS('star');
                    if (stars) {
                        stars = J.parse(stars);
                        if (stars[resi.post_id]) {
                            html += ' o';
                        }
                    }
                    html += pT[11] + resi.post_id + pT[12];
                }

                h++;
            }
        }
        tC += res.length;
        if (html) {
            hC += h;
            groupID = conf.range + hC;
            var insdom = doc.createElement('div');
            insdom.id = groupID;
            insdom.style.display = 'none';
            insdom.innerHTML = html;
            $W.insertBefore(insdom,$W.lastChild);
            $('#' + groupID).slideDown(cS);
        }
        $C.innerHTML = hC + '/' + tC;
        conf.sc = hC;
        return i;
    }
}
function sStar(r, c) {
    var co = 0,
        t = [],
        i;

    for (i in r) {
        t[co] = r[i];
        co++;
    }
    t.sort(function(a, b) {
        return a['created_time'] < b['created_time'] ? 1 : -1;
    });
    setTimeout(function() {
        _s(t, c);
        sEnd();
    }, 100);
}
function sSave(r, c, ct) {
    if (now === c.qid) {
        var co = 0,
            l = 0,
            tr = [],
            ri,
            i;

        if (!c.last_time) {
            c.last_inputsime = ct;
        }

        for (i in r) {
            ri = r[i];
            if (ri.created_time < ct) {
                tr[co] = ri;
                if (c.last_time > ri.created_time) {
                    c.last_time = ri.created_time;
                }
                co++;
            }
            delete r[i];
            l++;

            if (l > 49) {
                break;
            }
        }
        _s(tr, c);
        if (l > 0) {
            setTimeout(function() {
                sSave(r, c, ct);
            }, 300);
        }
        else {
            ct = c.last_time;
            delete c.last_time;
            sPost(c, ct);
        }
    }
}
function sPost(c, ct) {
    if (now === c.qid) {
        var q = c.q;

        if (ct) {
            q += ' AND created_time<' + ct;
        }
        FB.api({
            method: 'fql.multiquery',
            queries: {
                'q1': q,
                'q2': 'select uid,name,profile_url from user ' +
                'where uid IN(select actor_id from #q1)'
            }
        },
        function(rs) {
            if (rs.error_msg) {
                return false;
            }
            if (now === c.qid) {
                var r = rs[0].fql_result_set;

                if (r.length) {
                    var ru = rs[1].fql_result_set,
                        u = {},
                        dR,
                        hit = false,
                        ri,
                        i,
                        len;

                    for (i = 0, len = r.length; i < len; i++) {
                        sR[c.range][r[i].post_id] = r[i];
                    }
                    for (i = 0, len = ru.length; i < len; i++) {
                        u[ru[i].uid] = ru[i];
                    }
                    if (JF) {
                        dR = J.parse(J.stringify(sR[c.range]));
                    }
                    for (i in r) {
                        ri = r[i];
                        ri['user'] = u[ri.actor_id];
                    }
                    var pno = _s(r, c);
                    c.ec = 0;
                    if (!c.nonstop && c.sc - c.bc >= 10) {
                        c.bc = c.sc;
                        c.last_time = r[pno].created_time;
                        sEnd(c);
                    }
                    else {
                        hit &&
                        dR ? sSave(dR, c, r[pno].created_time) : setTimeout(
                            function() {
                                sPost(c, r[pno].created_time);
                            }, 500);
                    }
                }
                else if (c.ec < 5) {
                    c.ec++;
                    setTimeout(function() {
                        sPost(c, ct);
                    },500);
                }
                else {
                    sEnd();
                }
            }
        });
    }
}
function sEnd(c) {
    $ET.style.display = 'block';
    $ET.className = '';
    $ET.innerHTML = sMT;

    $B.className = '';

    if (c && c.last_time) {
        $ET.onclick = function() {
            var ct = c.last_time;

            delete c.last_time;
            sPost(c, ct);

            delete $ET.onclick;
            $ET.className = 'n';
            $ET.innerHTML = anT;
        }
    }
    else {
        $ET.innerHTML = sET;
        $ET.className = 'e';
    }
}
function gLS(k) {
    return LS['wallsearch-' + k];
}
function sLS(k, v) {
    LS['wallsearch-' + k] = v;
}
function d2(n) {
    return n * 1 < 10 ? '0' + n : n;
}
function hEsc(h) {
    var c = function(s) {
        var m = {
            '<': '&lt;',
            '>': '&gt;'
        };

        return m[s];
    };
    return h ? h.replace(/<|>/g, c) : '';
}
function gChecked(el) {
    if (el.checked === true) {
        return el.value;
    }
    return '';
}


return ret;

}(window, document));
