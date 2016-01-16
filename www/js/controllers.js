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

.controller('SelectionCtrl', function($scope, imageList, genreList, ImageService) {

    // Parent folder URL for all aws images
    var amazonUrl = 'https://s3-ap-southeast-2.amazonaws.com/sevenhillsimages/';

    // Clean uneccessary keys from database (Move to service, only use when importing fresh data.)
    /*for (var i = imageList.length - 1; i >= 0; i--) {
        if ("LastModified" in imageList[i]) {
            delete imageList[i].LastModified;
        }
        if ("Size" in imageList[i]) {
            delete imageList[i].Size;
        }
        if ("StorageClass" in imageList[i]) {
            delete imageList[i].StorageClass;
        }
        if ("ETag" in imageList[i]) {
            delete imageList[i].ETag;
        }
        if ("Key" in imageList[i]) {
            imageList[i].url = amazonUrl + imageList[i].Key;
            delete imageList[i].Key;
        }
        if (!imageList[i].captions) {
            imageList[i].captions = [{
                id: 1,
                text: 'No captions for this image yet',
                score: -1
            }];
        }
        if (!imageList[i].rating) {
            imageList[i].rating = 1;
        }
        if (!imageList[i].ratings) {
            imageList[i].ratings = {
                ones: 0,
                twos: 0,
                threes: 0,
                fours: 0,
                fives: 0
            };
        }
        if (!imageList[i].genreScores) {
            imageList[i].genreScores = {
                happy: 0,
                hungry: 0,
                excited: 0,
                tired: 0,
                aroused: 0,
                confused: 0
            };
        }
        imageList.$save(imageList[i]);
    }*/

    // Initialisations

    // Function declarations
    $scope.checkImages = checkImages;
    $scope.updateImageScore = updateImageScore;
    $scope.updateImageGenre = updateImageGenre;
    $scope.newImage = newImage;

    /* Current image serves as the image currently shown in the view, cuts down on memory usage 
    if data is simply swapped out of one view rather than loading multiple views and switching between them. */
    $scope.currentImage = {};
    $scope.tempScore = 1;
    $scope.tempGenre = '';

    /* An array of images already viewed this session so user only sees new images, 
    should be stored in Firebase under user accounts later to persist or use local storage*/
    $scope.viewedImages = [];

    // Simple stage toggle for ng-show directives for rating an image, voting on a genre or leaving a caption.
    $scope.stage = "rating";

    // Get image list from Firebase load on router
    $scope.imageList = imageList;

    // Get list of genre's stored in app constant file
    $scope.genreList = genreList;

    // Get list of non-viewed images using function to trim and maintain array of viewed images.
    $scope.newImages = $scope.checkImages();

    // Set a random image from non-viewed images to serve to the user.
    $scope.currentImage = $scope.newImages[Math.floor(Math.random() * $scope.newImages.length)];
    console.log($scope.currentImage);

    // Run Service script to make up for a missing backend
    ImageService.updateImage($scope.currentImage.$id);

    // Remove viewed images from view array
    function checkImages() {
        var imageArray = angular.copy(imageList);
        for (var i = imageList.length - 1; i >= 0; i--) {
            for (var j = $scope.viewedImages.length - 1; j >= 0; j--) {
                if (imageList[i].url === $scope.viewedImages[j].url) {
                    imageArray.splice(imageList[i], 1);
                }
            }
        }
        return imageArray;
    }

    // Send the users image score to the Service to be saved
    function updateImageScore(tempScore) {
        ImageService.updateScore($scope.currentImage.$id, tempScore);
        $scope.stage = "genre";
    }

    // Send the users chosen genre to the Service to be saved
    function updateImageGenre(tempGenre) {
        ImageService.updateGenre($scope.currentImage.$id, tempGenre);
        $scope.stage = "captions";
    }

    // Serve the user a new image
    function newImage(imgUrl) {
        $scope.viewedImages.push({
            url: imgUrl
        });
        $scope.newImages = $scope.checkImages();
        $scope.currentImage = $scope.newImages[Math.floor(Math.random() * $scope.newImages.length)];
        console.log($scope.currentImage);

        $scope.stage = "rating";
        $scope.tempScore = 1;
        $scope.tempGenre = '';

        ImageService.updateImage($scope.currentImage.$id);
    }
})

.controller('ImageCtrl', function($scope, $stateParams) {});
