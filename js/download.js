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