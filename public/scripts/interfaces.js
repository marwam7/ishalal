'use strict';
$(document).ready(function () {
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        var target = this.hash;
        var $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 900, 'swing', function () {
            window.location.hash = target;
        });
    });
   
});
////////////////chart/////////////////////////
window.onload = function () {
    CanvasJS.addColorSet("colorful", [ //colorSet Array
"#423F52", "#E9BED0", "#91AF96"
]);
    var chart = new CanvasJS.Chart("chartContainer", {
        colorSet: "colorful"
        , backgroundColor: "#222"
        , title: {
            fontSize: 15
            , fontColor: "#A47F81"
            , text: "Average of ingredient's codes types"
        }
        , data: [
            {
                type: "doughnut"
                , dataPoints: [
                    {
                        y: 50
                        , indexLabel: "In between - Mashbooh"
                    }
                    , {
                        y: 10
                        , indexLabel: "Not Allowed - Haram"
                    }
                    , {
                        y: 40
                        , indexLabel: "Allowed - Halal"
                    },

       ]
     }
     ]
    });
    chart.render();
}
/*************autocomplere***************************/
//$(document).ready(function(){
//     var options = {
//	url: "data/ingredients.json",
//
//	getValue: "code",
//
//	list: {
//		match: {
//			enabled: true
//		}
//	}
//        
//	
//};
//
//$("#input1").easyAutocomplete(options);
//});
/*******************Enter***************/
$(document).keypress(function (e) {
    if (e.which == 13) {
        $("#btn1").click();
        
    }
});
$(document).keypress(function (e) {
    if (e.which == 13) {
        $("#loginbtn").click();
        
    }
});
 function reset() {
    document.getElementById("addForm").reset();
}
$(document).ready(function(){
   $("#btn1").click(function(){
 $("#viewdata").fadeIn(2900);
}); 
  

});


//   $("#btn1").click(function(){
// $("#image").fadeIn(2900);
//}); 
    

