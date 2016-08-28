//var geolocation = require('geolocation');
p = {latitude: 52.379148, longitude: 4.900261};
        var LatLng = new google.maps.LatLng(p.latitude, p.longitude);
        var mapOptions = {
            center: LatLng
            , zoom: 11
            , mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("dvMap"), mapOptions);
        var marker = new google.maps.Marker({
            position: LatLng
            , map: map
            , animation: google.maps.Animation.BOUNCE
            , title: "<div style = 'height:60px;width:200px'><b>Your location:</b><br />Latitude: " + p.latitude + "<br />Longitude: " + p.longitude
        });
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
