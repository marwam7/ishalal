//var geolocation = require('geolocation');


//if (navigator.geolocation) {
//    navigator.geolocation.getCurrentPosition(function (p) {
//        var LatLng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);
//        var mapOptions = {
//            center: LatLng
//            , zoom: 11
//            , mapTypeId: google.maps.MapTypeId.ROADMAP
//        };
p = {latitude: '52.379148', longitude: '4.900261'};
        var LatLng = new google.maps.LatLng(p.latitude, p.longitude);
        var mapOptions = {
            center: LatLng
            , zoom: 11
            , mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var image = 'https://cdn4.iconfinder.com/data/icons/islamic-filled-line/2048/6384_-_Halal_Sticker-48.png';
        var markers = [];
        $.getJSON("/data/stores", function (result) {
            for (var i = 0; i < result.length; i++) {
                marker = new google.maps.Marker({
                    position: {
                        lat: result[i].Lat
                        , lng: result[i].Lang
                    }
                    , map: map
                    , title: result[i].store_name
                    , icon: image
                    , city: result[i].city
                    , phone: result[i].store_phone
                    , street: result[i].street
                });
                var infowindow = new google.maps.InfoWindow({
                    content: " "
                });
                google.maps.event.addListener(marker, 'click', function () {
                    infowindow.setContent('<div>' + this.title + '</div>' + '<div>' + this.city + '</div>' + '<div>' + this.street + '</div>' + '<div>' + this.phone + '</div>');
                    infowindow.open(map, this);
                });
                markers.push(marker);
            }
        });
}
