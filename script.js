import axios from "axios";

var app = new Vue({
  el: '.app',
  data: {
    message: 'Hello Vue!',
    artist: '',
    track: '',
    previewUrl: '',
    guess: '',
    guessed: false,
    count: 0,
    messageArtist: '',
    messageTrack: '',
    guessArtistAgain: true,
    guessTrackAgain: true,
  },
  mounted() {
      var randomNumber = Math.floor(Math.random()*50); //1205
      axios({ method: "GET", "url": "https://itunes.apple.com/search?country=US&media=music&term=my&entity=song&genre=14"}).then(result => {
          this.artist = result.data.results[randomNumber].artistName;
          this.track =  result.data.results[randomNumber].trackName;
          this.previewUrl = result.data.results[randomNumber].previewUrl;
      }, error => {
          console.error(error);
      });
  },
  methods: {
    checkTitle: function () {
      if ( this.guessArtistAgain )
      {
        if ( (this.guess.toLowerCase() == this.artist.toLowerCase() ) && this.artist != '' )
        {
          this.count++;
          this.messageArtist = 'Zgadłeś Wykonawcę';
          this.guessArtistAgain = false;
        }
        else
        {
          this.messageArtist = 'Błędny Wykonawca';
        }
      }


      if ( this.guessTrackAgain )
      {
        if ( (this.guess.toLowerCase() == this.track.toLowerCase() ) && this.track != '' )
        {
          this.count++;
          this.messageTrack = 'Zgadłeś Tytuł Piosenki';
          this.guessTrackAgain = false;
        }
        else
        {
          this.messageTrack = 'Błędny Tytuł';
        }
      }

      this.guess = '';

      if (this.count == 2)
      {
        this.guessed = true;
        this.message = 'Zgadłeś!';
      }
    },
    giveUp: function () {
      this.guessed = true;
      this.message = 'Poddałeś się a to było ';
      this.message = this.nobadsigns(this.message);
    },
    nobadsigns: function(asd = ''){ //eliminate polish signs
      return asd.replace(/ą/g, 'a').replace(/Ą/g, 'A')
              .replace(/ć/g, 'c').replace(/Ć/g, 'C')
              .replace(/ę/g, 'e').replace(/Ę/g, 'E')
              .replace(/ł/g, 'l').replace(/Ł/g, 'L')
              .replace(/ń/g, 'n').replace(/Ń/g, 'N')
              .replace(/ó/g, 'o').replace(/Ó/g, 'O')
              .replace(/ś/g, 's').replace(/Ś/g, 'S')
              .replace(/ż/g, 'z').replace(/Ż/g, 'Z')
              .replace(/ź/g, 'z').replace(/Ź/g, 'Z');
    },
    newSong: function(){
      var randomNumber = Math.floor(Math.random()*50); //1205
      axios({ method: "GET", "url": "https://itunes.apple.com/search?country=US&media=music&term=my&entity=song&genre=14"}).then(result => {
          this.artist = result.data.results[randomNumber].artistName;
          this.track =  result.data.results[randomNumber].trackName;
          this.previewUrl = result.data.results[randomNumber].previewUrl;
          this.guessed = false;
          this.messageArtist = '';
          this.messageTrack = '';
          this.guessArtistAgain = true;
          this.guessTrackAgain = true;
      }, error => {
          console.error(error);
      });
    }
  }
});