import { _decorator, AudioSource, Button, sys, Component, director, Label, Node, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('HelpComtroller')
export class HelpComtroller extends Component {
    private variableVolume: number;
    private variableVolumeArray: number[] = [];
    private convertVolume: number;
    private isIconShown: boolean = false;
    private isMuted: boolean = false;

    @property({type: Sprite})
    private overLay: Sprite = null;

    @property({type: Sprite})
    private boardHelp: Sprite = null;

    @property({type: Label})
    private helpText: Label = null;

    @property({type: Button})
    private closeBtn: Button = null;

    @property({type: AudioSource})
    private audioBackground: AudioSource = null;

    @property({type: Sprite})
    private iconToShow: Sprite = null;    

    @property({type: Sprite})
    private iconToHide: Sprite = null;

    protected onClickCloseBtn(): void {
        director.loadScene('Entry')
    }

    protected start(): void {
        var getVolumne = sys.localStorage.getItem('volume')

        if(getVolumne){
            this.variableVolumeArray = JSON.parse(getVolumne)
            localStorage.setItem('volume', JSON.stringify(this.variableVolumeArray))
        }
        else {
            this.audioBackground.volume = 1;
            this.iconToShow.node.active = true;
            this.iconToHide.node.active = false;
        }
        
        this.convertVolume = this.variableVolumeArray[this.variableVolumeArray.length - 1]
        if(this.convertVolume === 1){
            this.iconToShow.node.active = true;
            this.iconToHide.node.active = false;
            this.audioBackground.volume = 1;
        }
        else if(this.convertVolume === 0) {
            this.iconToShow.node.active = false;
            this.iconToHide.node.active = true;
            this.audioBackground.volume = 0;
        }
    }

    protected onAudio(): void {
        this.variableVolume = 1;
        this.variableVolumeArray.push(this.variableVolume)
        sys.localStorage.setItem('volume', JSON.stringify(this.variableVolumeArray))

        this.iconToShow.node.active = true;
        this.iconToHide.node.active = false;
        this.audioBackground.volume = 1;
    }

    protected offAudio(): void {
        this.variableVolume = 0;
        this.variableVolumeArray.push(this.variableVolume)
        sys.localStorage.setItem('volume', JSON.stringify(this.variableVolumeArray))

        this.iconToShow.node.active = false;
        this.iconToHide.node.active = true;
        this.audioBackground.volume = 0;

    }

    protected onLoad(): void {
        this.iconToShow.node.active = false;
        this.iconToHide.node.active = true;
    }
    
    onClickIcon () {
        this.isMuted = !this.isMuted;
        if (this.isMuted) {
            this.audioBackground.volume = 0;
        } else {
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

}


