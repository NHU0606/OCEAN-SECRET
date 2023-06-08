import { GameModel } from './GameModel';
import { _decorator, AudioSource, Component, input, Input, Node, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioController')
export class AudioController extends Component {
    private isIconShown: boolean = false;
    private isMuted: boolean = false;

    public get IsMuted() : boolean {
        return this.isMuted;
    }
    
    public set IsMuted(isMuted : boolean) {
        this.isMuted = isMuted;
    } 
       
    @property(AudioSource)
    public audioBackground: AudioSource = null;

    @property({type: Sprite})
    private iconToShow: Sprite = null;    

    @property(AudioSource)
    public audioEat: AudioSource = null;

    public get IconToShow() : Sprite {
        return this.iconToShow;
    }
    
    public set IconToShow(iconToShow : Sprite) {
        this.iconToShow = iconToShow;
    } 

    @property({type: Sprite})
    private iconToHide: Sprite = null;

    public get IconToHide() : Sprite {
        return this.iconToHide;
    }
    
    public set IconToHide(iconToHide : Sprite) {
        this.iconToHide = iconToHide;
    } 

    start() {
        this.iconToShow.node.active = true;
        this.iconToHide.node.active = false;
    }

    protected onLoad(): void {
        this.iconToShow.node.active = false;
        this.iconToHide.node.active = true;
    }

    onClickIcon () {
        this.isMuted = !this.isMuted;
        if (this.isMuted) {
            this.audioBackground.volume = 0;
            this.audioEat.volume = 0;
        } else {
            this.audioEat.volume = 1;
            this.audioBackground.volume = 1;
        }               
    }  

    onToggleButtonClicked() {
        this.isIconShown = !this.isIconShown;
        this.updateIconsVisibility();
    }

    updateIconsVisibility() {
        this.iconToShow.node.active = this.isIconShown;
        this.iconToHide.node.active = !this.isIconShown;
    }

    playAudio() {
        this.audioEat.volume = 1;
        this.audioBackground.volume = 1;

    }

    pauseAudio() {
        this.audioEat.volume = 0;
        this.audioBackground.volume = 0;
    }    
}