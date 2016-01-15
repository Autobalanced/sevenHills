// Ionic sevenHills App

/* An app created solely for comedic affect for a friends 30th Birthday. 
The intent was to create a Tinder clone that serves nothing but images of my friend,
with each photo assigned to 6 category hills and the highest ranking image attaining
the highest rank and the Hill of Man (surname of subject: Hillman). */

angular.module('sevenHills', ['ionic', 'firebase', 'sevenHills.controllers', 'sevenHills.factories', 'sevenHills.services'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.search', {
        url: '/search',
        views: {
            'menuContent': {
                templateUrl: 'templates/search.html'
            }
        }
    })

    .state('app.browse', {
            url: '/browse',
            views: {
                'menuContent': {
                    templateUrl: 'templates/browse.html'
                }
            }
        })
        .state('app.selection', {
            url: '/selection',
            views: {
                'menuContent': {
                    templateUrl: 'templates/selection.html',
                    controller: 'SelectionCtrl'
                }
            },
            resolve: {
                // Force state change to wait for loaded response from Firebase.
                imageList: ['FireFactory', function(FireFactory) {
                    return FireFactory.$loaded().then(function() {
                        return FireFactory;
                    });
                }]
            }
        })

    .state('app.single', {
        url: '/image/:imageId',
        views: {
            'menuContent': {
                templateUrl: 'templates/imagePage.html',
                controller: 'ImagePageCtrl'
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/selection');
})

.constant('externals', {
    firebaseUrl: 'https://sevenhills.firebaseio.com/',
    awsUrl: 'https://s3-ap-southeast-2.amazonaws.com/sevenhillsimages/'
})

.constant('genreList', {
    genres: [{
        text: 'Happy',
        icon: 'ion-happy-outline',
        colour: 'button-assertive'
    },{
        text: 'Hungry',
        icon: 'ion-pizza'
    }, {
        text: 'Excited',
        icon: 'ion-ios-pulse'
    }, {
        text: 'Tired',
        icon: 'ion-ios-cloudy-night-outline'
    }, {
        text: 'Aroused',
        icon: 'ion-android-contacts'
    }, {
        text: 'Confused',
        icon: 'ion-transgender'
    }]
});
