var userdata = JSON.parse(window.localStorage.getItem("yn_uuid"));
function restore(uuid){
	 var result = $.ajax({
        type: "POST",
        url: "/getuserdata",
        data: {
            "_id" : userdata.uuid,
        },
        async: false
    }).responseText;
    return result;
}