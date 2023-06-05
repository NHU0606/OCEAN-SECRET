import { _decorator, AudioSource, Button, Component, director, Node, sys, UIOpacity } from 'cc';
import { HelpComtroller } from './HelpComtroller';
const { ccclass, property } = _decorator;

@ccclass('EntryController')
export class EntryController extends Component {
    private isIconShown: boolean = false;
    private isMuted: boolean = false;
    private variableVolume: number;
    private variableVolumeArray: number[] = [];
    private convertVolume: number;

    @property({type: Button})
    private playBtn: Button = null;

    @property({type: Button})
    private helpBtn: Button = null;

    @property({type: AudioSource})
    private audioBackGround: AudioSource = null;

    @property({type: Button})
    private audioOff: Button = null;

    @property({type: Button})
    private audioOn: Button = null;

    protected onClickPlayBtn(): void{
        director.loadScene('Play');
    }

    protected onClickHelpBtn(): void {
        director.loadScene('Help')
    }

    protected start(): void {
        var getVolumne = sys.localStorage.getItem('volume')

        if(getVolumne){
            this.variableVolumeArray = JSON.parse(getVolumne)
            localStorage.setItem('volume', JSON.stringify(this.variableVolumeArray))
        }
        else {
            this.audioBackGround.volume = 1;
            this.audioOn.node.active = true;
            this.audioOff.node.active = false;
        }
        
        this.convertVolume = this.variableVolumeArray[this.variableVolumeArray.length - 1]
        if(this.convertVolume === 1){
            this.audioOn.node.active = true;
            this.audioOff.node.active = false;
            this.audioBackGround.volume = 1;
        }
        else if(this.convertVolume === 0) {
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
        this.variableVolume = 1;
        this.variableVolumeArray.push(this.variableVolume)
        sys.localStorage.setItem('volume', JSON.stringify(this.variableVolumeArray))

        this.audioOn.node.active = true;
        this.audioOff.node.active = false;
        this.audioBackGround.volume = 1;
    }

    protected offAudio(): void {
        this.variableVolume = 0;
        this.variableVolumeArray.push(this.variableVolume)
        sys.localStorage.setItem('volume', JSON.stringify(this.variableVolumeArray))
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
}


