const { remote } = require('electron');
const path = require('path');
const { fs, log, util } = require('vortex-api');

function findGame() {
  return util.steam.findByName('Starbound')
      .then(game => game.gamePath);
}

function gameExecutable() {
  if (process.platform === 'win32') {
    return 'win32/starbound.exe';
  }
  return 'win64/starbound.exe';
}

function prepareForModding() {
  return fs.ensureDirAsync('mods');
}

function main(context) {
  context.registerGame({
    id: 'starbound',
    name: 'Starbound',
    mergeMods: true,
    queryPath: findGame,
    queryModPath: () => 'mods',
    logo: 'gameart.png',
    executable: gameExecutable,
    requiredFiles: [
      gameExecutable(),
    ],
    setup: prepareForModding,
    details: {
      steamAppId: 211820,
    },
  });

  return true;
}

module.exports = {
  default: main,
};
