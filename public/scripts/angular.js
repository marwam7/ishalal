'use strict';
var app = angular.module('project', []);
//app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
//    $routeProvider
//        .when('/check', {
//            templateUrl: '../index.html'
//            , controller: 'checker as vm'
//        })
//        .when('/stores', {
//            templateUrl: '../index.html'
//            , controller: 'addStore as vm'
//        })
//
//    .when('/admin', {
//        templateUrl: '../admin.html'
//        , controller: 'admin as vm'
//    })
//        .otherwise({
//            redirectTo: '/'
//        });
//
//}]);
/*************************getting ingredients cotroller*****************/
app.controller('checker', function (ingredients) {
    var vm = this;
    ingredients.getIngredients().then(function (ingredientData) {
        vm.ingredients = ingredientData;
        console.log(ingredientData);
        //var last=vm.ingredients.length-1;
        vm.find = function (value) {
            for (var i = 0; i <= ingredientData.length; i++) {
                if (ingredientData[i])
                    if (value.toUpperCase() === ingredientData[i].code) {
                        console.log('Found');
                        return ingredientData[i];
                    }
            }
            return ingredientData[0];
        }
    });
});
/*************************getting ingredients service*****************/
app.service('ingredients', function ($http) {
    this.getIngredients = function () {
        return $http.get('/data/ingredients').then(function (response) {
            console.log(response.data);
            return response.data;
        });
    }
});
///***********************adding stores form*****************************************/
app.controller('addStore', function ($scope, $http,$window) {
    $scope.formData = {};
    $scope.createStore = function () {
        var storeData = {
            store_name: $scope.formData.store_name
            , city: $scope.formData.city
            , street: $scope.formData.street
            , store_phone: $scope.formData.store_phone
//            , postcode:$scope.formData.postcode
            , Lat: $scope.formData.Lat
            , Lang: $scope.formData.Lang
        };
        //	 when landing on the page, get all data and show them
        $http.get('/data/stores').success(function (data) {
            $scope.stores = data;
        }).error(function (data) {
            console.log('Error: ' + data);
        });
        // when submitting the add form, send the text to the node API
        console.log(storeData);
        $http.post('/data/stores1', storeData).success(function (data) {
            console.log(data);
            $scope.stores1 = data;
            // Once complete, clear the form (except location)
            //                $scope.formData.store_name = "";
            //                $scope.formData.city = "";
            //                $scope.formData.street = "";
            //                $scope.formData.store_phone = '';
            //                $scope.formData.Lat='';
            //                $scope.formData.Lang='';
        }).error(function (data) {
            console.log('Error: ' + data);
        });
                
//$window.location.reload();
    }
});
/************************Stores gaining (for the extra idea)***********************/
app.controller('admin', function ($scope, stores, stores1, $http) {
    $scope.password = function (pswd) {
        if (pswd === 'marwa') {
           
            document.getElementById('added_stores').style.display = "inline";
            document.getElementById('login').style.display = "none";
        }
        else {
            document.getElementById('Wrong_pwd').style.display = "inline";
        }
    }
    var vm = this;
    stores1.getStores1().then(function (storesData) {
        vm.stores1 = storesData;
        vm.deleteStore1 = function (id) {
            console.log(id);
            $http.delete('/data/stores1/' + id).success(function (data) {
                
                vm.stores1 = data;
            }).error(function (data) {
                console.log('Error: ' + data);
            });
        }
        vm.approveStore = function (id) {
            $http.post('/data/stores1/' + id).success(function (data) {
                vm.stores1 = data;
            }).error(function (data) {
                console.log('Error:' + data);
            });
        }
    });
    
      stores.getStores().then(function (storesData) {
        vm.stores = storesData;
        vm.deleteStore = function (id) {
            console.log(id);
            $http.delete('/data/stores/' + id).success(function (data) {
                
                vm.stores = data;
            }).error(function (data) {
                console.log('Error: ' + data);
            });
        }
    });
});
app.service('stores', function ($http) {
    this.getStores = function () {
        return $http.get('/data/stores').then(function (response) {
            console.log(response.data);
            return response.data;
        });
    }
});
app.service('stores1', function ($http) {
    this.getStores1 = function () {
        return $http.get('/data/stores1').then(function (response) {
            console.log(response.data);
            return response.data;
        });
    }
});
