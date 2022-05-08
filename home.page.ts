/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable prefer-const */
/* eslint-disable no-trailing-spaces */
import { Component, ViewChild } from '@angular/core';
import { IonRange } from '@ionic/angular';
import { Howl } from 'howler';
export interface Track{

  name: string;
  path: string;
}



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

playlist: Track[] = [

  {
    name: 'Malvadão' ,
    path: './assets/mp3/Xamã-Malvadão-3-_Prod.-DJ-Gustah-Neobeats_.mp3'
    
  },
  {
    name: 'Fim de semana no Rio' ,
    path: './assets/mp3/Teto-Fim-de-Semana-no-Rio-.mp3'

  },
  
  {
    name: 'Mustang preto' ,
    path: './assets/mp3/TETO-Mustang-Preto.mp3'

  },
  {
    name: 'Me Sinto Abençoado' ,
    path: './assets/mp3/MC-Poze-do-Rodo-ft.-Filipe-Ret-Me-Sinto-Abençoado-_prod.-Ajaxx_.mp3'

  },
];



activeTrack: Track = null;
player: Howl =null;
isPlaying: false;
progress='0';
@ViewChild('range' ,{static: false}) range: IonRange


  
  constructor() {}


  start(track: Track) {

  if(this.player){
    this.player.stop();
  }
    this.player =new Howl({
   src: [track.path],
   html5: true,
     onplay: () => {
       console.log('onplay');
      this.isPlaying = false;
         this.activeTrack =track;
         this.uptadeProgress();
  },
  onend: () =>{
console.log('onend');
  }
});

this.player.play();

  }

tooglePlayer(pause) {
  this.isPlaying = pause;
  if(pause){
    this.player.pause();
  }else{
    this.player.play();
  }

}


next(){
  const index =this.playlist.indexOf(this.activeTrack);
  if(index !== this.playlist.length - 1) {
    this.start(this.playlist[index+1]);
  }else{
    this.start(this.playlist[0]);
  }
}


prev(){
const index =this.playlist.indexOf(this.activeTrack);
if(index > 0) {
  this.start(this.playlist[index-1]);
}else{
  this.start(this.playlist[this.playlist.length - 1]);
}
}

seek() {
// eslint-disable-next-line prefer-const
let newValue = +this.range.value;
let duration = this.player.duration;
this.player.seek(duration * ( newValue / 100 ));
}

uptadeProgress(){
let seek =this.player.seek();
this.player.progress = (seek / this.player.duration()) * 100 || 0;
setTimeout(() => {
this.uptadeProgress();

},100)
  
}

}
