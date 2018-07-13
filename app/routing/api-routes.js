var friends = require("../data/friends.js");

module.exports = function (app) {

    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req, res) {

        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };
        console.log(req.body);

        // result of user survey post
        var userData = req.body;
        var userScores = userData.scores;

        console.log(userScores);

        // calculate the difference between user scores and scores of each user
        var totalDifference = 0;

        // loop through all friends in the database
        for (var i = 0; i < friends.length; i++) {

            console.log(friends[i]);
            totalDifference = 0;

            // loop through scores of each friend
            for (var j = 0; j < friends[i].scores[j]; j++) {
                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

                if (totalDifference <= bestMatch.friendDifference) {
                    bestMatch.name = friends[i].name;
                    bestMatch.photo = friends[i].photo;
                    bestMatch.friendDifference = totalDifference;
                }
            }
        }

        friends.push(userData);

        res.json(bestMatch);

    });
}