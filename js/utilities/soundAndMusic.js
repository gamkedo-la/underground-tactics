//sounds
var footstepsSound = new SoundOverlapsClass("footsteps");
var itemPickUpSound = new SoundOverlapsClass("pickUpItem");
var feetPlayer001SFX = new SoundOverlapsClass("sfx_feet_player_a-001");
var feetPlayer002SFX = new SoundOverlapsClass("sfx_feet_player_a-002");
var feetPlayer003SFX = new SoundOverlapsClass("sfx_feet_player_a-003");
var feetPlayer004SFX = new SoundOverlapsClass("sfx_feet_player_a-004");
var feetPlayer005SFX = new SoundOverlapsClass("sfx_feet_player_a-005");
var feetPlayer006SFX = new SoundOverlapsClass("sfx_feet_player_a-006");
var feetPlayer007SFX = new SoundOverlapsClass("sfx_feet_player_a-007");
var feetPlayer008SFX = new SoundOverlapsClass("sfx_feet_player_a-008");
var healthPickSFX = new SoundOverlapsClass("sfx_pickup_health");
var bowShotSFX = new SoundOverlapsClass("sfx_weapon_bow_shot")

function setFormat() {
    var audio = new Audio();
    if (audio.canPlayType("audio/mp3")) { 
        // fully supported by all browsers and platforms
        // see https://caniuse.com/?search=mp3
        audioFormat = ".mp3";
    } else {
		audioFormat = ".ogg"; // never used
    }
}

var mainBackgroundMusic = new BackgroundMusicClass();

function SoundOverlapsClass(filenameWithPath) {
    setFormat();
    var altSoundTurn = false;
    var mainSound = new Audio("sound/" + filenameWithPath + audioFormat);
    var altSound = new Audio("sound/" + filenameWithPath + audioFormat);
    
    this.play = function() {
		if (altSoundTurn) {
			altSound.currentTime = 0;
			altSound.play();
		} else {
			mainSound.currentTime = 0;
			mainSound.play();
		}
		altSoundTurn = !altSoundTurn;
    }
}  

function BackgroundMusicClass() {
    var musicSound = null;
    this.loopSong = function(filenameWithPath) {
		setFormat();

		if (musicSound != null) {
			musicSound.pause();
			musicSound = null;
		}
		musicSound = new Audio("sound/" + filenameWithPath + audioFormat);

		musicSound.loop = true;
		musicSound.play();
    }

    this.startOrStopMusic = function() {
        if (!musicSound) {
            console.error("ERROR: musicSound not initialized before startOrStopMusic was run!");
            return; 
        }
		if (isMuted == false) {
			musicSound.play();
		} else {
			musicSound.pause();
		}
    }
}
