angular.module('sevenHills.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
            $scope.closeLogin();
        }, 1000);
    };
})

.controller('SelectionCtrl', function($scope, FireFactory, imageList) {
    /*FireFactory.$loaded().then(function() {
        $scope.fireImages = FireFactory;
        console.log(FireFactory);
    });*/
    /*$scope.imageList = [{
        title: 'testImage1',
        id: 1,
        url: './img/testingImages/image1.jpg',
        currentGenre: {
          title: 'hunger',
          score: 2,
          imageUrl: ''
        },
        topCaption: 'Finger up!',
        captions: [{
          score: 4,
          text: 'testCaption1'
        }]
    }, {
        title: 'testImage2',
        id: 2,
        url: './img/testingImages/image2.jpg'
    }, {
        title: 'testImage3',
        id: 3,
        url: './img/testingImages/image3.jpg'
    }, {
        title: 'testImage4',
        id: 4,
        url: './img/testingImages/image4.jpg'
    }];*/

    $scope.imageList = imageList;

    $scope.currentImage = $scope.imageList[1];
    console.log($scope.currentImage);
})

.controller('ImageCtrl', function($scope, $stateParams) {});
