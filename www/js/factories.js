angular.module('sevenHills.factories', [])

// Factory that links the app to the Firebase database for storing image url and their data, returns as Array.
.factory('FireFactory', function($firebaseArray) {
    var itemsRef = new Firebase("https://sevenhills.firebaseio.com/Contents/awsImages");
    return $firebaseArray(itemsRef);
});
