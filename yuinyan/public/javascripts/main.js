var userdata = JSON.parse(window.localStorage.getItem("yn_uuid"));

    var stations = [
        {
            "num":0,
            "name":"首里駅",
            "latitude":[26.219223,127.725552],
            "tips":[
                {
                    "title":"タイトル",
                    "image":"filename.jpg",
                    "note":"本文はここに。"
                },
                {
                    "title":"タイトル",
                    "image":"filename.jpg",
                    "note":"本文はここに。"
                },
                {
                    "title":"タイトル",
                    "image":"filename.jpg",
                    "note":"本文はここに。"
                },
                {
                    "title":"タイトル",
                    "image":"filename.jpg",
                    "note":"本文はここに。"
                }
            ]
        },
        {
            "num":1,
            "name":"儀保駅",
            "latitude":[26.224805,127.718914],
            "tips":[
                {
                    "title":"タイトル",
                    "image":"filename.jpg",
                    "note":"本文はここに。"
                    }
            ]
        },
        {
            "num":2,
            "name":"市立病院駅前",
            "latitude":[26.2274897,127.709942],
            "tips":[
                {
                    "title":"タイトル",
                    "image":"filename.jpg",
                    "note":"本文はここに。"
                    }
            ]
        },
        {
            "num":3,
            "name":"古島駅",
            "latitude":[26.230777,127.702887],
            "tips":[
                {
                    "title":"タイトル",
                    "image":"filename.jpg",
                    "note":"本文はここに。"
                    }
            ]
        },
        {
            "num":4,
            "name":"おもろまち駅",
            "latitude":[26.222833,127.69836],
            "tips":[
                {
                    "title":"タイトル",
                    "image":"filename.jpg",
                    "note":"本文はここに。"
                    }
            ]
        },
        {
            "num":5,
            "name":"安里駅",
            "latitude":[26.217111,127.695944],
            "tips":[
                {
                    "title":"タイトル",
                    "image":"filename.jpg",
                    "note":"本文はここに。"
                    }
            ]
        },
        {
            "num":6,
            "name":"牧志駅",
            "latitude":[26.217306,127.6925],
            "tips":[
                {
                    "title":"タイトル",
                    "image":"filename.jpg",
                    "note":"本文はここに。"
                    }
            ]
        },
        {
            "num":7,
            "name":"美栄橋駅",
            "latitude":[26.219305,127.684389],
            "tips":[
                {
                    "title":"タイトル",
                    "image":"filename.jpg",
                    "note":"本文はここに。"
                    }
            ]
        },
        {
            "num":8,
            "name":"県庁前駅",
            "latitude":[26.214472,127.679362],
            "tips":[
                {
                    "title":"タイトル",
                    "image":"filename.jpg",
                    "note":"本文はここに。"
                    }
            ]
        },
        {
            "num":9,
            "name":"旭橋駅",
            "latitude":[26.212195,127.675584],
            "tips":[
                {
                    "title":"タイトル",
                    "image":"filename.jpg",
                    "note":"本文はここに。"
                    }
            ]
        },
        {
            "num":10
            ,"name":"壷川駅",
            "latitude":[26.20589,127.678418],
            "tips":[
                {
                    "title":"タイトル",
                    "image":"filename.jpg",
                    "note":"本文はここに。"
                    }
            ]
        },
        {
            "num":11
            ,"name":"奥武山公園駅",
            "latitude":[26.200946,127.675529],
            "tips":[
                {
                    "title":"タイトル",
                    "image":"filename.jpg",
                    "note":"本文はここに。"
                    }
            ]
        },
        {
            "num":12
            ,"name":"小禄駅",
            "latitude":[26.196502,127.666669],
            "tips":[
                {
                    "title":"タイトル",
                    "image":"filename.jpg",
                    "note":"本文はここに。"
                    }
            ]
        },
        {
            "num":13
            ,"name":"赤嶺駅",
            "latitude":[26.1932346,127.6604804],
            "tips":[
                {
                    "title":"タイトル",
                    "image":"filename.jpg",
                    "note":"本文はここに。"
                    }
            ]
        },
        {
            "num":14
            ,"name":"那覇空港駅",
            "latitude":[26.206501,127.651142],
            "tips":[
                {
                    "title":"タイトル",
                    "image":"filename.jpg",
                    "note":"本文はここに。"
                    }
            ]
        }
    ];
    
var $stations = $("<ul />").addClass("stations");
var $distances = [];
var $stationLabels = [];



$(function(){
    
    $.each(stations,function(i){
        $distances[i] = $("<span />").text(0);
        
        var $tmp = $("<li />").attr({"data-station-id":this.num,"data-lat":this.latitude[0],"data-lon":this.latitude[1]}).html(
            '<span class="buddy"><span style="color:red">●</span><span style="color:green">●</span><span style="color:blue">●</span></span><span class="station-circle"></span><span class="station-name">'+ this.name +'</span><span class="distance"></span>');
            
        $stationLabels.push($tmp);
            
        $tmp.find(".distance").prepend($distances[i]);
        $stations.prepend($tmp);
        
        $("#initial-station").prepend($("<option>").text(this.name).attr({"value":i}));
    });
    $("#initial-station").val(0);

    $("#railway").append($stations);
})
    
var Geokit = function(callback) {
    this.status = undefined;
    this.result = false;
    return false;
}

Geokit.prototype.done = function(pos) {
this.status = "success";
// console.log(this.status, this);
// console.log("done:", pos, status);
this.result = pos;
}

Geokit.prototype.fail = function(a) {
	this.status = false;
	alert("airwncはGPS情報を必要とします。このメッセージが表示された場合、リロードして位置情報を許可して下さい。")
}

Geokit.prototype.get = function(callback,failedCallback) {
var $this = this;
navigator.geolocation.getCurrentPosition(
  function(pos) {
    $this.done(pos);
    if(!!callback) callback.call(this);
  },
  function(pos) {
    $this.fail(pos);console.log("failed");
   failedCallback.call(this);
  });
}

var geolocation = new Geokit();

var currentPos = [0,0];

function refreshGeolocation (callback){
    $("#geolocating").fadeIn();
    geolocation.get(function(){
        if(!!callback) callback.call(this);
        currentPos = [geolocation.result.coords.latitude,geolocation.result.coords.longitude];
        $("#geolocating").fadeOut();
    })
}

refreshGeolocation();

function refreshUserstatus (){
    
}
    
function geoDistance(lat1, lng1, lat2, lng2, precision) {
    // 引数　precision は小数点以下の桁数（距離の精度）
    var distance = 0;
    if ((Math.abs(lat1 - lat2) < 0.00001) && (Math.abs(lng1 - lng2) < 0.00001)) {
    distance = 0;
    } else {
    lat1 = lat1 * Math.PI / 180;
    lng1 = lng1 * Math.PI / 180;
    lat2 = lat2 * Math.PI / 180;
    lng2 = lng2 * Math.PI / 180;

    var A = 6378140;
    var B = 6356755;
    var F = (A - B) / A;

    var P1 = Math.atan((B / A) * Math.tan(lat1));
    var P2 = Math.atan((B / A) * Math.tan(lat2));

    var X = Math.acos(Math.sin(P1) * Math.sin(P2) + Math.cos(P1) * Math.cos(P2) * Math.cos(lng1 - lng2));
    var L = (F / 8) * ((Math.sin(X) - X) * Math.pow((Math.sin(P1) + Math.sin(P2)), 2) / Math.pow(Math.cos(X / 2), 2) - (Math.sin(X) - X) * Math.pow(Math.sin(P1) - Math.sin(P2), 2) / Math.pow(Math.sin(X), 2));

    distance = A * (X + L);
    var decimal_no = Math.pow(10, precision);
    distance = Math.round(decimal_no * distance / 1) / decimal_no;   // kmに変換するときは(1000で割る)
    }
    return distance;
}
    
function restore(uuid){
	 var result = $.ajax({
        type: "POST",
        url: "/getuserdata",
        data: {
            "_id" : uuid,
        },
        async: false
    }).responseText;
    return JSON.parse(result);
}


setInterval(function(){
    refreshGeolocation();
},5000);

setInterval(function(){
  refreshStationDistance();  
},1000)
function refreshStationDistance(){
    $.each(stations,function(i){
        this.distance = geoDistance(this.latitude[0],this.latitude[1],currentPos[0],currentPos[1],0);
        if(this.distance > 1000){
            $distances[i].text(Math.floor(this.distance/100)/10).addClass("kilometer");    
        }else{
            $distances[i].text(this.distance).removeClass("kilometer");
        }
        
        if(this.distance < 150){
            $stationLabels[i].addClass("near");    
        }else{
            $stationLabels[i].removeClass("near");
        }
         
    });
}

/**/

$(function(){
    $("#submit").on({"click":function(){
    var val = $("#input-username").val();
    var facial = $("input[name=facial-icon]:checked").val();
    var group = $("#input-init-groupId").val();
    
    console.log(group);
    
    if(!!val && val != ""){
        $.ajax({
        type: "POST",
        url: "/createuser",
        data: {
            "username" : val,
            "facial":facial,
            "groupId":group
        },
        success: function(data){
            console.log(data);  
            window.localStorage.setItem("yn_uuid",JSON.stringify({"uuid":data._id,"groupId":data.groupId}));
            window.userdata = {"uuid":data._id};
            
            if(!!data.groupId) window.userdata.groupId = data.groupId;
            $("#createuser").slideUp();
        }
        });
    }
    }})
    
    
    $("#checkin").on({"click":function(){
    var val = $("#station-selector").val();
    if(!!val && val != ""){
        $.ajax({
        type: "POST",
        url: "/checkin",
        data: {
            "_id" : userdata.uuid,
            "stationId" : val
        },
        success: function(data){
            console.log(data);
        }
        });
    }
    }})
    
    
    $("#addGroup").on({"click":function(){
    var val = $("#groupId").val();
    if(!!val && val != ""){
        $.ajax({
        type: "POST",
        url: "/addgroup",
        data: {
            "_id" : userdata.uuid,
            "groupId" : val
        },
        success: function(data){
            console.log(data);
        }
        });
    }
    }})
    
    
    
    $("#getfromgroupId").on({"click":function(){
    var val = $("#groupId").val();
    if(!!val && val != ""){
        $.ajax({
        type: "POST",
        url: "/getgroup",
        data: {
            "_id" : userdata.uuid,
            "groupId" : val
        },
        success: function(data){
            console.log(data);
        }
        });
    }
    }})
    
    
});