angular.module('sevenHills.services', [])

// Image Service should contain all functions required to update an image and its associated data
.factory('ImageService', function($firebase, externals, FireFactory) {

    var imageServiceObject = {
        // Functions that should noramlly be run on the backend for general upkeep here
        updateImage: function(imgId) {
            // FireFactory.$loaded().then(function() {
            // Get image reference from database
            var localImage = FireFactory.$getRecord(imgId);

            // Update the images title to be the highest ranked caption
            var highestCaption = localImage.title || {
                text: 'No title yet',
                score: -1
            };
            for (var i = localImage.captions.length - 1; i >= 0; i--) {
                var thisCaption = localImage.captions[i];
                if (thisCaption.score > highestCaption.score) {
                    highestCaption = thisCaption;
                }
            }
            localImage.title = highestCaption;

            var numRatings = (localImage.ratings.ones + localImage.ratings.twos + localImage.ratings.threes + localImage.ratings.fours + localImage.ratings.fives) || 0;
            var totalRatings = (localImage.ratings.ones + (localImage.ratings.twos * 2) + (localImage.ratings.threes * 3) + (localImage.ratings.fours * 4) + (localImage.ratings.fives * 5));
            localImage.rating = (totalRatings / numRatings) || 0;
            // Save update to database
            FireFactory.$save(localImage);
            // });
        },
        // Update the score of a particular image
        updateScore: function(imgId, newScore) {
            var scoreRating = '';
            // Both string and int case required as Firebase returns string and input returns int
            switch (newScore) {
                case 1:
                case "1":
                    scoreRating = 'ones';
                    break;
                case 2:
                case "2":
                    scoreRating = 'twos';
                    break;
                case 3:
                case "3":
                    scoreRating = 'threes';
                    break;
                case 4:
                case "4":
                    scoreRating = 'fours';
                    break;
                case 5:
                case "5":
                    scoreRating = 'fives';
                    break;
            }
            // Get the images current score
            var localImage = FireFactory.$getRecord(imgId);
            var imgScore = localImage.rating;

            // Increment rating count
            localImage.ratings[scoreRating]++;

            // Save changes
            FireFactory.$save(localImage);
        },
        updateGenre: function(imgId, newGenre) {
            // Get Image record from database
            var localImage = FireFactory.$getRecord(imgId);

            // Increment genre score count
            localImage.genreScores[newGenre.toLowerCase()]++;

            // Save updates back to database
            FireFactory.$save(localImage);
        }
    };

    return imageServiceObject;
});
