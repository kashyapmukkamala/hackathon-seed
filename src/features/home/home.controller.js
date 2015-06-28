(function() {
    'use strict';

    angular.module('app').controller('HomeController', HomeControllerFn );
    HomeControllerFn.$inject = ['spotifyService'];

    function HomeControllerFn (spotifyService) {
        var homeVm = this;
        homeVm.init = init;
        homeVm.getNewSuccess = getNewSuccess;
        homeVm.playSong = playSong;
        homeVm.playSuccess = playSuccess;
        homeVm.error = error;
        homeVm.newReleases = [];
        homeVm.index = 0;

        init();
        //////////////////////////
        function init() {
            spotifyService.getNewReleases().then(getNewSuccess, error);
        }

        function getNewSuccess(res) {
            console.log(res);
            homeVm.newReleases = res.albums.items;
        }

        function playSong(index, query) {
            homeVm.index = index;
            spotifyService.getMeTheSong(query).then(homeVm.playSuccess, homeVm.error);
        }

        function playSuccess(res) {

            var player = $('#playMe');

            if( homeVm.newReleases[homeVm.index].playing) {
                player[0].pause();
            }
            else {
                homeVm.url = res.tracks.items[0] ? res.tracks.items[0].preview_url : "";
                player.attr('src', homeVm.url);
                player[0].play();
                player.bind('ended', function() {
                    homeVm.newReleases[homeVm.index].playing = false;
                    $scope.$apply();
                });
            }

            (homeVm.newReleases).forEach(function(e, i){
                if( i === homeVm.index )e.playing = !e.playing;
                else e.playing = false;
            });

        }


        function error() {
            console.log('error')
        }

    }

})();