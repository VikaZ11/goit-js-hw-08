import Player from '@vimeo/player';
var throttle = require('lodash.throttle');

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

const onPlay = function (data) {
    localStorage.setItem('videoplayer-current-time', data.seconds);
};

player.on('timeupdate', throttle(onPlay, 1000));

let saveData = localStorage.getItem('videoplayer-current-time');
if (saveData) {
    player.setCurrentTime(saveData);
}


