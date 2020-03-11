define("widget/ucard", function (require, exports, module) {
    var personmessage = "";
    function Card(a) {
        personmessage ="UID:"+a.uid+","+"muteText:"+a.muteText;
        function t() {
            0 == e && (e = 1, r.emit("open"))
        }

        function n() {
            1 == e && (e = 0, r.emit("close"))
        }

        function i() {
            -1 != e && (e = -1, r.emit("destroy"), r.off())
        }

        importStyle(), a = $.extend({
            uid: 0,
            muteText: "",
            container: null
        }, a);
        var r = $.extend(this, new Event),
            e = 0,
            o = $('<div class="ucard-box"></div>');
        r.on("open", function () {
            o.show();
        }), r.on("close", function () {
            o.hide()
        }), r.on("destroy", function () {
            o.remove()
        }), $(a.container).append(o);
        var d = new $.Deferred(function (t) {
            getUserData(a.uid, t.resolve)
        });
        r.on("destroy", function () {
            d.reject()
        }), d.done(function (t) {
            function i() {
                -1 != e && (auditor.isAuditor() || auditor.isSuperAuditor() ? Menu[auditor.isAuditor() ? "auditor" : "superAuditor"]({
                    uid: t.lUid,
                    nick: t.sNickName,
                    text: a.muteText
                }, function (a) {
                    o.find(".ucard-menu").show(), o.find(".ucard-menu-cont").append(a.view), a.open()
                }) : (o.find(".ucard-menu").hide(), o.find(".ucard-menu-cont").empty()))
            }

            var r = t.tNobleInfo && t.tNobleInfo.iNobleLevel > 0 ? !0 : !1;
            o.html(r ? tpl_noble({
                data: t
            }) : tpl_fans({
                data: t
            })), o.on("click", ".ucard-x", function (a) {
                a.preventDefault(), n()
            }), o.on("click", ".ucard-btn", function (a) {
                a.preventDefault(), noble.open();
                try {
                    ya.reportProductEvent({
                        eid: "click/zhibo/gp/xkp/gz",
                        eid_desc: "\u70b9\u51fb/\u76f4\u64ad/\u516c\u5c4f/\u5c0f\u5361\u7247/\u5f00\u901a\u8d35\u65cf"
                    })
                } catch (a) {
                }
            }), auditor.onEnter(i), auditor.change(i), HUYA_UTIL.getCookieVal("yyuid") == TTA.lp && Menu.anchor({
                uid: t.lUid,
                nick: t.sNickName,
                text: a.muteText
            }, function (a) {
                o.find(".ucard-menu").show(), o.find(".ucard-menu-cont").append(a.view), a.open()
            })
        }), t(), $.extend(r, {
            uid: a.uid,
            view: o,
            open: t,
            close: n,
            destroy: i,
            initComplete: function (a) {
                d.done(function () {
                    a.call(r)
                })
            }
        })
    }

    function getUserData(a, t) {
        TTP.ready(function (n) {
            if (TTP.isH5) {
                var i = new HUYA.VipCardReq;
                i.tUserId = n.userId, i.lTid = TTR.id, i.lSid = TTR.sid, i.lPid = TTA.lp, i.lUid = a, n.sendWup2("liveui", "getVipCard", i, t)
            } else TTP.isFlash && (TTP.one("VipCardRsp", function (a) {
                t(a.param)
            }), n.callAs("VipCardReq", {
                uid: a
            }))
        })
    }

    var tools = require("tools"),
        Event = require("Event"),
        TTR = require("TTR"),
        TTA = require("TTA"),
        auditor = require("auditor"),
        Menu = require("widget/ucard/Menu.js"),
        tpl_noble = function (obj) {
            {
                var __t, __p = "";
                Array.prototype.join
            }
            with (obj || {}) {
                __p += "";
                var mounts = ["", "https://a.msstatic.com/huya/main/widget/ucard/img/mounts-1_bda40a1.gif", "https://a.msstatic.com/huya/main/widget/ucard/img/mounts-2_6e20719.gif", "https://a.msstatic.com/huya/main/widget/ucard/img/mounts-3_8ab71ec.gif", "https://a.msstatic.com/huya/main/widget/ucard/img/mounts-4_f75011d.gif", "https://a.msstatic.com/huya/main/widget/ucard/img/mounts-5_6b0d152.gif", "https://a.msstatic.com/huya/main/widget/ucard/img/mounts-6_3954060.gif"];
                __p += '\r\n\r\n<div class="ucard-noble ucard-noble-' + (null == (__t = data.tNobleInfo.iNobleLevel) ? "" : __t) + '">\r\n    <div class="ucard-noble-wrap">\r\n        <i class="ucard-x"></i>\r\n        <div class="ucard-menu">\r\n            <i class="ucard-menu-tit">\u7ba1\u7406</i>\r\n            <div class="ucard-menu-cont"></div>\r\n        </div>\r\n        <span class="ucard-avatar"><img src="' + (null == (__t = TT.trimUrl(data.sLogoURL)) ? "" : __t) + '" alt="' + (null == (__t = data.sNickName) ? "" : _.escape(__t)) + '" onerror="this.src=\'//a.msstatic.com/huya/main/assets/img/default_avatar.jpg\';this.onerror=null;" /></span>\r\n        <i class="noble-icon noble-level-' + (null == (__t = data.tNobleInfo.iNobleLevel) ? "" : __t) + '"></i>\r\n        <div class="ucard-info">\r\n            <p class="ucard-nick"><span class="ucard-name" title="' + (null == (__t = data.sNickName) ? "" : _.escape(__t)) + '">' + (null == (__t = data.sNickName) ? "" : _.escape(__t)) + '</span><i class="ucard-' + (null == (__t = 1 === data.iGender ? "boy" : "girl") ? "" : __t) + '"></i><i class="level-icon level-icon' + (null == (__t = data.iUserLevel) ? "" : __t) + '"></i></p>\r\n            <div class="ucard-age">\r\n                <p><i class="ucard-id"></i><span>' + (null == (__t = data.iAge) ? "" : __t) + '\u5c81</span></p><p><i class="ucard-location"></i><span>' + (null == (__t = data.sLocation || "\u706b\u661f") ? "" : _.escape(__t)) + "</span></p>\r\n            </div>\r\n            ", $.trim(data.sSign) && (__p += '\r\n            <p class="ucard-intro" title="' + (null == (__t = data.sSign) ? "" : _.escape(__t)) + '">' + (null == (__t = data.sSign) ? "" : _.escape(__t)) + "</p>\r\n            "), __p += '\r\n            <p class="ucard-fans">\u7c89\u4e1d\uff1a<em>' + (null == (__t = data.iSubscribedCount) ? "" : __t) + '</em></p>\r\n        </div>\r\n        <span class="ucard-noble-mounts"><img src="' + (null == (__t = mounts[data.tNobleInfo.iNobleLevel]) ? "" : __t) + '" alt="' + (null == (__t = data.tNobleInfo.sNobleName) ? "" : _.escape(__t)) + '" /></span>\r\n        <div class="ucard-ft">\r\n            <a href="#" class="ucard-btn">\u5f00\u901a\u8d35\u65cf</a>\r\n        </div>\r\n    </div>\r\n</div>'
            }

            var foo = /<span class="ucard-name">(.*?)<\/span>/.exec(__p);
//            console.log("用户名",foo[1]);
            var age = /<i class="ucard-id"><\/i><span>(.*?)<\/span>/.exec(__p);
//            console.log("年龄",age[1]);
            var localtion = /<i class="ucard-location"><\/i><span>(.*?)<\/span>/.exec(__p);
//            console.log("位置",localtion[1]);
            var fans = /<p class="ucard-fans">粉丝：<em>(.*?)<\/em><\/p>/.exec(__p);
//            console.log("粉丝数",fans[1]);
            var data = window.location.href;
            var file = data.split("=")[1]
            var result = personmessage + ","+"用户名:"+foo[1]+","+"年龄:"+age[1]+","+"位置:"+localtion[1]+","+"粉丝数"+","+fans[1]+"\r\n";
            console.log("fajsnajsjkas",file)
            if(file==undefined){
                file = "index"
            }
            $.post("http://127.0.0.1:8888/person",{"person":result,"filename":file},function (data) {
                console.log(data);
            });
            console.log("个人信息1：",result);
            return __p
        },
        tpl_fans = function (obj) {
            {
                var __t, __p = "";
                Array.prototype.join
            }
            with (obj || {}) __p += '<div class="ucard-normal">\r\n    <i class="ucard-x"></i>\r\n    <div class="ucard-menu">\r\n        <i class="ucard-menu-tit">\u7ba1\u7406</i>\r\n        <div class="ucard-menu-cont"></div>\r\n    </div>\r\n    <span class="ucard-avatar"><img src="' + (null == (__t = TT.trimUrl(data.sLogoURL)) ? "" : __t) + '" alt="' + (null == (__t = data.sNickName) ? "" : _.escape(__t)) + '" onerror="this.src=\'//a.msstatic.com/huya/main/assets/img/default_avatar.jpg\';this.onerror=null;" /></span>\r\n    <div class="ucard-info">\r\n        <p class="ucard-nick"><span class="ucard-name">' + (null == (__t = data.sNickName) ? "" : _.escape(__t)) + '</span><i class="ucard-' + (null == (__t = 1 === data.iGender ? "boy" : "girl") ? "" : __t) + '"></i><i class="level-icon level-icon' + (null == (__t = data.iUserLevel) ? "" : __t) + '"></i></p>\r\n        <div class="ucard-age">\r\n            <p><i class="ucard-id"></i><span>' + (null == (__t = data.iAge) ? "" : __t) + '\u5c81</span></p><p><i class="ucard-location"></i><span>' + (null == (__t = data.sLocation || "\u706b\u661f") ? "" : _.escape(__t)) + "</span></p>\r\n        </div>\r\n        ", $.trim(data.sSign) && (__p += '\r\n        <p class="ucard-intro" title="' + (null == (__t = data.sSign) ? "" : _.escape(__t)) + '">' + (null == (__t = data.sSign) ? "" : _.escape(__t)) + "</p>\r\n        "), __p += '\r\n        <p class="ucard-fans">\u7c89\u4e1d\uff1a<em>' + (null == (__t = data.iSubscribedCount) ? "" : __t) + '</em></p>\r\n    </div>\r\n    <div class="ucard-ft">\r\n        <a href="#" class="ucard-btn">\u5f00\u901a\u8d35\u65cf</a>\r\n    </div>\r\n</div>';

            var foo = /<span class="ucard-name">(.*?)<\/span>/.exec(__p);
//            console.log("用户名",foo[1]);
            var age = /<i class="ucard-id"><\/i><span>(.*?)<\/span>/.exec(__p);
//            console.log("年龄",age[1]);
            var localtion = /<i class="ucard-location"><\/i><span>(.*?)<\/span>/.exec(__p);
//            console.log("位置",localtion[1]);
            var fans = /<p class="ucard-fans">粉丝：<em>(.*?)<\/em><\/p>/.exec(__p);
//            console.log("粉丝数",fans[1]);
            var result = personmessage + ","+"用户名:"+foo[1]+","+"年龄:"+age[1]+","+"位置:"+localtion[1]+","+"粉丝数"+","+fans[1]+"\r\n";
            console.log(result)
            var data = window.location.href;
            var file = data.split("=")[1];
            console.log("fajsnajsjkas",file)
            if(file==undefined){
                file = "index"
            }
            $.post("http://127.0.0.1:8888/person",{"person":result,"filename":file},function (data) {
                console.log(data);
            });
            console.log("个人信息2:",result);
            return __p
        },
        noble = require("noble"),
        importStyle = tools.once(function () {
            var a = '@charset "UTF-8";.ucard-girl{display:inline-block;width:7px;height:12px;overflow:hidden;background:url(https://a.msstatic.com/huya/main/widget/ucard/img/o_540b297.png)}.ucard-boy{display:inline-block;width:11px;height:10px;overflow:hidden;background:url(https://a.msstatic.com/huya/main/widget/ucard/img/i_070573b.png)}.ucard-location{display:inline-block;width:11px;height:14px;overflow:hidden;background:url(https://a.msstatic.com/huya/main/widget/ucard/img/lct_a6b10a4.png)}.ucard-id{display:inline-block;width:16px;height:12px;overflow:hidden;background:url(https://a.msstatic.com/huya/main/widget/ucard/img/idif_f0fd3fc.png)}.ucard-btn{display:inline-block;position:relative;padding-left:18px;color:#ff9600;text-decoration:none;cursor:pointer}.ucard-btn:hover{color:#FF8400;text-decoration:none}.ucard-btn:hover:before{background:url(https://a.msstatic.com/huya/main/widget/ucard/img/h_act_b669565.png)}.ucard-btn:before{position:absolute;left:0;top:50%;margin-top:-6px;display:inline-block;content:"";width:14px;height:12px;background:url(https://a.msstatic.com/huya/main/widget/ucard/img/h_d471ddc.png)}.ucard-avatar{width:68px;height:68px;overflow:hidden;border-radius:50%;border:1px solid #fff;background:#eee}.ucard-avatar img{width:100%;height:100%}.ucard-info .ucard-nick{text-align:center}.ucard-info .ucard-name{display:inline-block;max-width:10em;font-size:14px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;word-wrap:normal}.ucard-info .ucard-girl,.ucard-info .ucard-boy{margin:0 5px;vertical-align:super}.ucard-info .level-icon{vertical-align:super}.ucard-info .ucard-age{padding-top:2px;color:#999;text-align:center}.ucard-info .ucard-age .ucard-id{margin-top:2px}.ucard-info .ucard-age p{display:inline-block;padding:0 15px;line-height:14px}.ucard-info .ucard-age p:first-child{border-right:1px solid #ccc}.ucard-info .ucard-age p span{padding-left:5px;vertical-align:top}.ucard-info .ucard-intro{margin:2px 1em 0;color:#999;text-align:center;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;word-wrap:normal}.ucard-info .ucard-fans{margin-top:3px;color:#999;text-align:center}.ucard-info .ucard-fans em{color:#666}.ucard-menu{display:none;position:relative;cursor:pointer}.ucard-menu .ucard-menu-tit{display:block;position:relative}.ucard-menu .ucard-menu-tit:after{position:absolute;top:7px;right:-15px;display:inline-block;width:10px;height:5px;content:"";transition:.5s transform}.ucard-menu:hover .ucard-menu-tit:after{transform:rotate(180deg)}.ucard-menu .ucard-menu-cont{display:none;position:absolute;left:0;top:0;padding-top:19px}.ucard-menu:hover .ucard-menu-cont{display:block}.ucard-menu .menu{padding:5px;background:#fff;border:1px solid #D5D5D5;border-radius:3px;box-shadow:0 0 3px rgba(0,0,0,.2);font-size:12px;font-family:"Microsoft YaHei"}.ucard-menu .menu ul+ul{margin-top:2px;border-top:1px solid #eee;padding-top:2px}.ucard-menu .menu li{height:24px;line-height:24px;padding:0 10px 0 8px;cursor:pointer;white-space:nowrap;word-wrap:normal}.ucard-menu .menu li i{display:inline-block;vertical-align:top;width:16px;height:16px;margin:4px 0 0;overflow:hidden}.ucard-menu .menu li i.mute-icon{background:url(https://a.msstatic.com/huya/main/widget/ucard/img/a_6811bbb.png) no-repeat}.ucard-menu .menu li i.blacklist-icon{background:url(https://a.msstatic.com/huya/main/widget/ucard/img/b_c7219bf.png) no-repeat}.ucard-menu .menu li i.xip-icon{background:url(https://a.msstatic.com/huya/main/widget/ucard/img/c_3cc904a.png) no-repeat}.ucard-menu .menu li i.vf-icon{background:url(https://a.msstatic.com/huya/main/widget/ucard/img/d_491b8b4.png) no-repeat;margin-top:5px}.ucard-menu .menu li span{display:inline-block;vertical-align:top;margin-left:5px}.ucard-menu .menu li:hover{background:#B8DFF9}.ucard-box{display:inline-block}.ucard-noble{width:272px;height:356px;font-family:"Microsoft YaHei";overflow:hidden}.ucard-noble .ucard-noble-wrap{position:relative;width:200px;height:280px;margin:60px auto 0}.ucard-noble .ucard-menu{position:absolute;top:8px;left:7px;z-index:3}.ucard-noble .ucard-menu .ucard-menu-tit{color:#fff}.ucard-noble .ucard-menu .ucard-menu-tit:after{background:url(https://a.msstatic.com/huya/main/widget/ucard/img/arr_7af1512.png)}.ucard-noble .ucard-noble-mounts{position:absolute;width:140px;height:140px;left:30px}.ucard-noble .ucard-x{position:absolute;top:13px;right:3px;display:inline-block;width:10px;height:9px;overflow:hidden;cursor:pointer;background:url(https://a.msstatic.com/huya/main/widget/ucard/img/x_054e896.png)}.ucard-noble .ucard-x:hover{background:url(https://a.msstatic.com/huya/main/widget/ucard/img/x_act_c1796b8.png)}.ucard-noble .ucard-avatar{position:absolute;left:50%;margin-left:-35px;top:2px}.ucard-noble .noble-icon{position:absolute;left:114px;top:45px;margin:0}.ucard-noble .ucard-info{padding-top:78px}.ucard-noble .ucard-ft{position:absolute;width:100%;left:0;bottom:10px;text-align:center}.ucard-noble-1{background:url(https://a.msstatic.com/huya/main/widget/ucard/img/noble-1_62bf9c6.png) 50% 0 no-repeat}.ucard-noble-1 .ucard-noble-mounts{bottom:0}.ucard-noble-1 .ucard-avatar{border-color:#D3683A}.ucard-noble-2{background:url(https://a.msstatic.com/huya/main/widget/ucard/img/noble-2_0a25fd5.png) 50% 0 no-repeat}.ucard-noble-2 .ucard-noble-mounts{bottom:25px}.ucard-noble-2 .ucard-avatar{border-color:#1DB167}.ucard-noble-3{background:url(https://a.msstatic.com/huya/main/widget/ucard/img/noble-3_94f1130.png) 50% 0 no-repeat}.ucard-noble-3 .ucard-noble-mounts{bottom:15px}.ucard-noble-3 .ucard-avatar{border-color:#199AD4}.ucard-noble-4{background:url(https://a.msstatic.com/huya/main/widget/ucard/img/noble-4_9fbc090.png) 50% 0 no-repeat}.ucard-noble-4 .ucard-noble-mounts{bottom:0}.ucard-noble-4 .ucard-avatar{border-color:#F85035}.ucard-noble-5{background:url(https://a.msstatic.com/huya/main/widget/ucard/img/noble-5_e9d8422.png) 50% 0 no-repeat}.ucard-noble-5 .ucard-noble-mounts{bottom:12px}.ucard-noble-5 .ucard-avatar{border-color:#CC44FE}.ucard-noble-6{background:url(https://a.msstatic.com/huya/main/widget/ucard/img/noble-6_b824d11.png) 50% 0 no-repeat}.ucard-noble-6 .ucard-noble-mounts{bottom:5px}.ucard-noble-6 .ucard-avatar{border-color:#FE8800}.ucard-normal{position:relative;width:215px;height:220px;background:#fff;border-radius:8px;box-shadow:0 0 10px 0 rgba(1,1,1,.2);font-family:"Microsoft YaHei"}.ucard-normal .ucard-x{position:absolute;top:13px;right:11px;display:inline-block;width:10px;height:9px;overflow:hidden;cursor:pointer;background:url(https://a.msstatic.com/huya/main/widget/ucard/img/xx_7bf0cb5.png)}.ucard-normal .ucard-x:hover{background:url(https://a.msstatic.com/huya/main/widget/ucard/img/xx_act_f4f73e3.png)}.ucard-normal .ucard-menu{position:absolute;top:8px;left:12px;z-index:3}.ucard-normal .ucard-menu .ucard-menu-tit{color:#a8a8a8}.ucard-normal .ucard-menu .ucard-menu-tit:after{background:url(https://a.msstatic.com/huya/main/widget/ucard/img/arr2_e82aab1.png)}.ucard-normal .ucard-avatar{position:absolute;left:50%;margin-left:-35px;top:12px}.ucard-normal .ucard-info{padding-top:90px}.ucard-normal .ucard-ft{position:absolute;width:100%;left:0;bottom:12px;text-align:center}';
            tools.importStyle(a, "J_roomUserCardStyle")
        }),
        singleCard = null,
        creatCard = function (a) {
            singleCard && singleCard.close();
            var t = singleCard = new Card(a),
                n = tools.once(function () {
                    singleCard == t && (singleCard = t = null)
                });
            return t.one("close", n), t.one("destroy", n), t
        };
    module.exports = creatCard
});