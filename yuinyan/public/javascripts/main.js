var userdata = JSON.parse(window.localStorage.getItem("yn_uuid"));

var stations = [
        {"num":0,"name":"首里駅","latitude":[26.219223,127.725552]},
        {"num":1,"name":"儀保駅","latitude":[26.224805,127.718914]},
        {"num":2,"name":"市立病院駅前","latitude":[26.2274897,127.709942]},
        {"num":3,"name":"古島駅","latitude":[26.230777,127.702887]},
        {"num":4,"name":"おもろまち駅","latitude":[26.222833,127.69836]},
        {"num":5,"name":"安里駅","latitude":[26.217111,127.695944]},
        {"num":6,"name":"牧志駅","latitude":[26.217306,127.6925]},
        {"num":7,"name":"美栄橋駅","latitude":[26.219305,127.684389]},
        {"num":8,"name":"県庁前駅","latitude":[26.214472,127.679362]},
        {"num":9,"name":"旭橋駅","latitude":[26.212195,127.675584]},
        {"num":10,"name":"壷川駅","latitude":[26.20589,127.678418]},
        {"num":11,"name":"奥武山公園駅","latitude":[26.200946,127.675529]},
        {"num":12,"name":"小禄駅","latitude":[26.196502,127.666669]},
        {"num":13,"name":"赤嶺駅","latitude":[26.1932346,127.6604804]},
        {"num":14,"name":"那覇空港駅","latitude":[26.206501,127.651142]}
    ];
    
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