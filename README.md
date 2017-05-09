# ximalaya-plugin
喜马拉雅下载助手，又称喜马小助手，是一个能一键获取喜马拉雅免费音频的下载地址的chrome插件

# 使用方法 #
1.[下载插件安装包](https://raw.githubusercontent.com/cloudroc/ximalaya-plugin/master/DIST/ximalaya_v1.0.0.crx)，拖进chrome浏览器的扩展程序内，这个操作需要打开chrome的开发者模式。安装完成之后应该是这样的：

![](http://wx2.sinaimg.cn/mw690/7d6b7503ly1fff3zes36ej20nk075t9g.jpg)

2.无需特殊设置，打开喜马拉雅网站，进入某个专辑，点击某个声音查看进入明细页面，比如：

http://www.ximalaya.com/7712455/sound/2272558

![](http://wx2.sinaimg.cn/mw690/7d6b7503ly1fff3zdcpkjj20w30rf48f.jpg)

注意URL里面的sound单词，这个在后面的插件原理里面会讲

你会发现多出来两个链接**“下载32kps音频”** **“下载64kps音频”**，点击链接下载音频即可，是不是很简单...

这里要注意的是
（1）下载后的文件格式为.m4a（一般的PC播放器都可以播放）
（2）32kps的音频可能只有24kps，这个是喜马的问题
（3）下载的文件名是一串乱码，最好自己改一下名字

# 插件原理 #
记得我上面说到的声音明细页面URL中的sound吗，后面跟着的数字就是这个声音在喜马拉雅上面的唯一ID。

喜马拉雅在播放声音前会请求一个URL，比如：
http://www.ximalaya.com/tracks/2272558.json
获取一个包涵音频文件实际地址的json：

```
{
    "id": 2272558,
    "play_path_64": "http://audio.xmcdn.com/group10/M08/35/72/wKgDZ1WVCBiSqUiVAKza8osLTaA696.m4a",
    "play_path_32": "http://audio.xmcdn.com/group10/M08/35/6A/wKgDaVWVCC_hoDuwAEH7lqBPx3k059.m4a",
    "play_path": "http://audio.xmcdn.com/group10/M08/35/72/wKgDZ1WVCBiSqUiVAKza8osLTaA696.m4a",
    "duration": 1400,
    "title": "银河帝国1_基地_08",
    "nickname": "大屁股老鼠哈哈笑",
    "uid": 7712455,
    "waveform": "group4/M02/0C/E7/wKgDtFMlI3qysDNYAAAKbDrnGSU1990.js",
    "upload_id": "u_2639732",
    "cover_url": "http://fdfs.xmcdn.com/group4/M01/0C/ED/wKgDs1MlI7-x71uZAAGl7WuFCDY006.jpg",
    "cover_url_142": "http://fdfs.xmcdn.com/group4/M01/0C/ED/wKgDs1MlI7-x71uZAAGl7WuFCDY006_web_large.jpg",
    "formatted_created_at": "3月16日 12:08",
    "is_favorited": false,
    "play_count": 32701,
    "comments_count": 36,
    "shares_count": 0,
    "favorites_count": 92,
    "album_id": 244444,
    "album_title": "阿西莫夫_基地（银河帝国基地系列第一部）",
    "intro": "长篇科幻小说，基地，阿西莫夫[美]著，叶李华译，连载中...，播讲：哈哈笑。",
    "have_more_intro": false,
    "time_until_now": "3年前",
    "category_name": "book",
    "category_title": "有声书",
    "played_secs": null,
    "is_paid": false,
    "is_free": null,
    "price": null,
    "discounted_price": null
}
```

其中的play_path_64 play_path_32 就是64kps和32kps音频的实际服务器存放地址

然后事情就简单了，在chrome插件中注入一段js，根据这个id请求到实际地址，然后添加下载的链接即可

核心代码：
```
console.log("inject success!");

//音频Id
var track_id = $(".shareLink").attr("track_id");

console.log("track_id="+track_id);

var dataUrl = "http://www.ximalaya.com/tracks/"+track_id+".json";

$.get(dataUrl, function(result){
	var href32 =  result.play_path_32; 
	var href64 =  result.play_path_64;
	//增加按钮
	$('.sound_bottom .fr').append("<a class='forwardBtn link1 down32' download href='"+href32+"'>下载32kps音频</a>")
	.append("<a class='forwardBtn link1 down64' download href='"+href64+"'> 下载64kps音频</a>");
});
```

# 开发背景 #
1.用了喜马好几年了，最近的广告越来越烦人，比如“XX老道勾引小妖精”这种声音广告特别烦人，而且即使不是在线听，缓存到手机，在联通网络的情况下还是会插播广告

2.所在company封网络，ximalya.com还有music.163.com都无法打开，让在线听歌也成了问题

基于以上两点，就花了点时间写出这个插件，可以提前将喜欢的有声读物下载到电脑上或者拷入手机

希望对您的生活和学习有帮助，enjoy~

很惭愧，只做了些微小的工作，您的支持将鼓励我继续努力创作！/斜眼笑
![](http://blog.jarjar.cn/images/weixin.png)
