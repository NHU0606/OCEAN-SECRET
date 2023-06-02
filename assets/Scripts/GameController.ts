import { _decorator, AudioSource, Button, Component, instantiate, Node, Sprite, sys, math, randomRangeInt, director, UIOpacity, Collider2D, Contact2DType, IPhysics2DContact, PolygonCollider2D } from 'cc';
import { MariaController } from './MariaController';
import { GameModel } from './GameModel';
import { PauseController } from './PauseController';
import { FishPrefabController } from './FishPrefabController';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    private isIconShown: boolean = false;
    private isMuted: boolean = false;
    private varVolume: number;
    private varVolumeArray: number[] = [];
    private convertVolume: number;
    private fishArray: FishPrefabController[] = [];

  
    @property({type:GameModel})
    private GameModel: GameModel;

    @property({type: PauseController})
    private pause: PauseController;

    @property({type: Sprite})
    private listSea: Sprite[] = [null, null];

    protected start(): void {
        this.schedule(function(){
            this.spawnFish();
        }, math.randomRangeInt(2, 3))  

        var getVolume = sys.localStorage.getItem('volume');

        if(getVolume){
            this.varVolumeArray = JSON.parse(getVolume)
            localStorage.setItem('volume', JSON.stringify(this.varVolumeArray))
        } else {
            this.GameModel.AudioBackGround.volume = 1;
            this.GameModel.AudioOnBtn.node.active = true;
            this.GameModel.AudioOffBtn.node.active = false;
        }

        this.convertVolume = this.varVolumeArray[this.varVolumeArray.length - 1]
        if(this.convertVolume === 1) {
            this.GameModel.AudioOnBtn.node.active = true;
            this.GameModel.AudioOffBtn.node.active = false;
            this.GameModel.AudioBackGround.volume = 1;
        } else if(this.convertVolume === 0) {
            this.GameModel.AudioOnBtn.node.active = false;
            this.GameModel.AudioOffBtn.node.active = true;
            this.GameModel.AudioBackGround.volume = 0;
        }
    }

    protected onLoad(): void {
        this.GameModel.AudioOnBtn.node.active = true;
        this.GameModel.AudioOffBtn.node.active = false;
    }

    onClickIconPause(){
        let opacityBtnOff = this.GameModel.AudioOffBtn.getComponent(UIOpacity)
        let opacityBtnOn = this.GameModel.AudioOnBtn.getComponent(UIOpacity)
        
        this.pause.IsPause = !this.pause.IsPause;
        if(this.pause.IsPause){
            this.GameModel.AudioOffBtn.interactable = false;
            this.GameModel.AudioOnBtn.interactable = false;
            opacityBtnOff.opacity = 0;
            opacityBtnOn.opacity = 0;
            this.GameModel.AudioOffBtn.node.active = false;
            this.GameModel.AudioOnBtn.node.active = false;
            this.GameModel.AudioBackGround.pause();
            director.pause();
        } else {
            director.resume();
            this.GameModel.AudioOffBtn.node.active = true;
            this.GameModel.AudioOnBtn.node.active = true;
            this.GameModel.AudioOffBtn.interactable = true;
            this.GameModel.AudioOnBtn.interactable = true;
            this.GameModel.AudioBackGround.play();
            opacityBtnOff.opacity = 255;
            opacityBtnOn.opacity = 255;
        }
    }

    protected spawnFish(): void {
        const randomFishIndex = randomRangeInt(0,this.GameModel.FishPrefabs.length);
        const fishPrefab = this.GameModel.FishPrefabs[randomFishIndex];
        const fishNode = instantiate(fishPrefab).getComponent(FishPrefabController);
        fishNode.Init(this.GameModel.BirdContain);
        this.fishArray.push(fishNode);
    }

    protected onAudio(): void {
        this.varVolume = 1;
        this.varVolumeArray.push(this.varVolume)
        localStorage.setItem('volume', JSON.stringify(this.varVolumeArray))

        this.GameModel.AudioOnBtn.node.active = true;
        this.GameModel.AudioOffBtn.node.active = false;
        this.GameModel.AudioBackGround.volume = 1;
    }

    protected offAudio(): void {
        this.varVolume = 0;
        this.varVolumeArray.push(this.varVolume)
        localStorage.setItem('volume', JSON.stringify(this.varVolumeArray))
        
        this.GameModel.AudioOnBtn.node.active = false;
        this.GameModel.AudioOffBtn.node.active = true;
        this.GameModel.AudioBackGround.volume = 0;
    }

    protected onClickAudioNode(): void{
        this.isMuted = !this.isMuted;
        if (this.isMuted) {
            this.GameModel.AudioBackGround.volume = 0;
        } else {
            this.GameModel.AudioBackGround.volume = 1;
        } 
    }

    protected onToggleButtonClicked(): void  {
        this.isIconShown = !this.isIconShown;
        this.updateIconsVisibility();
    }

    protected updateIconsVisibility(): void {
        this.GameModel.AudioOnBtn.node.active = this.isIconShown;
        this.GameModel.AudioOffBtn.node.active = !this.isIconShown;
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


