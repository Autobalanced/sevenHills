angular.module('sevenHills.factories', [])

// Factory that links the app to the Firebase database for storing image url and their data.
.factory('FireFactory', function($firebaseArray) {
    var itemsRef = new Firebase("https://sevenhills.firebaseio.com/images");
    return $firebaseArray(itemsRef);
});
