import { _decorator, AudioSource, Button, Component, director, Node, sys, UIOpacity } from 'cc';
import { HelpComtroller } from './HelpComtroller';
const { ccclass, property } = _decorator;

@ccclass('EntryController')
export class EntryController extends Component {
    private isIconShown: boolean = false;
    private isMuted: boolean = false;
    private varVolume: number;
    private varVolumeArray: number[] = [];
    private convertVolume: number;

    @property(HelpComtroller)
    private help: HelpComtroller;

    @property({type: Button})
    private playBtn: Button = null;

    @property({type: AudioSource})
    private audioBackGround: AudioSource = null;

    @property({type: Button})
    private audioOff: Button = null;

    @property({type: Button})
    private audioOn: Button = null;

    @property({type: Button})
    private helpBtn: Button = null;

    protected onClickPlayBtn(): void{
        director.loadScene('Play');
    }

    protected onClickHelpBtn(): void {
        let opacityBtnOff = this.audioOff.getComponent(UIOpacity)
        let opacityBtnOn = this.audioOn.getComponent(UIOpacity)
        this.help.showHelp();
        this.helpBtn.node.active = false;
        this.playBtn.node.active = false;
        opacityBtnOff.opacity = 0;
        opacityBtnOn.opacity = 0;
    }

    protected onClickCloseBtn(): void {
        let opacityBtnOff = this.audioOff.getComponent(UIOpacity)
        let opacityBtnOn = this.audioOn.getComponent(UIOpacity)
        this.help.node.active = false;
        this.helpBtn.node.active = true;
        this.playBtn.node.active = true;
        opacityBtnOff.opacity = 255;
        opacityBtnOn.opacity = 255;
    }

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
}


