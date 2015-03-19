var $ = require("jquery")
var base64 = require("js-base64").Base64
var deparam = require("jquery-deparam")

function klaviyoSubmitForm(){
  return function(e){
    e.preventDefault();
    var $this = $(this)
    var data = $this.serialize()
    var jsonData = deparam(data)
    data = JSON.stringify(jsonData)
    data = base64.encode(data)
    var request = $.ajax({
      "method": "get",
      "url": "https://a.klaviyo.com/api/track",
      "data": {
        "data": data
      }
    })
    $this.trigger("submitted", [request, jsonData])
  }
}

module.exports = klaviyoSubmitForm
