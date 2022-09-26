import Player from '@vimeo/player';
import storage from './storage';
var throttle = require('lodash.throttle');

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

const onPlay = function (data) {
    storage.save('videoplayer-current-time', data.seconds);
};

player.on('timeupdate', throttle(onPlay, 1000));

let saveData = storage.load('videoplayer-current-time');
if (saveData) {
    player.setCurrentTime(saveData);
}


