import { _decorator, AudioSource, Button, Component, Node, Sprite, sys } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    private isIconShown: boolean = false;
    private isMuted: boolean = false;
    private varVolume: number;
    private varVolumeArray: number[] = [];
    private convertVolume: number;

    @property({type: Sprite})
    private listSea: Sprite[] = [null, null];

    @property({type: AudioSource})
    private audioBackGround: AudioSource = null;

    @property({type: Button})
    private audioOff: Button = null;

    @property({type: Button})
    private audioOn: Button = null;

    protected start(): void {
        var getVolume = sys.localStorage.getItem('volume');

        if(getVolume){
            this.varVolumeArray = JSON.parse(getVolume)
            localStorage.setItem('volume', JSON.stringify(this.varVolumeArray))
        } else {
            this.audioBackGround.volume = 1;
            this.audioOn.node.active = true;
            this.audioOff.node.active = false;
        }

        this.convertVolume = this.varVolumeArray[this.varVolumeArray.length - 1]
        if(this.convertVolume === 1) {
            this.audioOn.node.active = true;
            this.audioOff.node.active = false;
            this.audioBackGround.volume = 1;
        } else if(this.convertVolume === 0) {
            this.audioOn.node.active = false;
            this.audioOff.node.active = true;
            this.audioBackGround.volume = 0;
        }
    }

    protected onLoad(): void {
        this.audioOn.node.active = false;
        this.audioOff.node.active = true;
        
    }

    protected onAudio(): void {
        this.varVolume = 1;
        this.varVolumeArray.push(this.varVolume)
        localStorage.setItem('volume', JSON.stringify(this.varVolumeArray))

        this.audioOn.node.active = true;
        this.audioOff.node.active = false;
        this.audioBackGround.volume = 1;
    }

    protected offAudio(): void {
        this.varVolume = 0;
        this.varVolumeArray.push(this.varVolume)
        localStorage.setItem('volume', JSON.stringify(this.varVolumeArray))
        
        this.audioOn.node.active = false;
        this.audioOff.node.active = true;
        this.audioBackGround.volume = 0;
    }

    protected onClickAudioNode(): void{
        this.isMuted = !this.isMuted;
        if (this.isMuted) {
            this.audioBackGround.volume = 0;
        } else {
            this.audioBackGround.volume = 1;
        } 
    }

    protected onToggleButtonClicked(): void  {
        this.isIconShown = !this.isIconShown;
        this.updateIconsVisibility();
    }

    protected updateIconsVisibility(): void {
        this.audioOn.node.active = this.isIconShown;
        this.audioOff.node.active = !this.isIconShown;
    }

    protected moveListSea(): void{
        for(let i = 0; i < this.listSea.length; i++){
            const sea = this.listSea[i].node.getPosition();
            sea.x -= 1;
            if(sea.x <= -970){
                sea.x = 970;
            }
            this.listSea[i].node.setPosition(sea);
        }
    }

    protected update(dt: number): void {
        this.moveListSea();
    }
}


