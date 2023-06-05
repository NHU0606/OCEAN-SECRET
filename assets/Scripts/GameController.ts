import { _decorator, AudioSource, Button, Component, instantiate, Node, Sprite, sys, math, randomRangeInt, director, UIOpacity, Collider2D, Contact2DType, IPhysics2DContact, PolygonCollider2D } from 'cc';
import { MariaController } from './MariaController';
import { GameModel } from './GameModel';
import { PauseController } from './PauseController';
import { FishPrefabController } from './FishPrefabController';
import { AudioController } from './AudioController';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    private isIconShown: boolean = false;
    private isMuted: boolean = false;
    private variableVolume: number;
    private variableVolumeArray: number[] = [];
    private convertVolume: number;
    private fishArray: FishPrefabController[] = [];

    @property({type: AudioController})
    private audioController: AudioController;

    @property({type: Button})
    private iconShow: Button = null;    

    @property({type: Button})
    private iconOff: Button = null;  
  
    @property({type:GameModel})
    private GameModel: GameModel;

    @property({type: PauseController})
    private pause: PauseController;

    @property({type: Sprite})
    private listSea: Sprite[] = [null, null];

    protected onLoad() : void  {
        const audioSrc = this.node.getComponent(AudioSource)
        this.GameModel.AudioBackGround = audioSrc;
    }

    protected start(): void {
        this.schedule(function(){
            this.spawnFish();
        }, math.randomRangeInt(2, 3))  

        var getVolumne = sys.localStorage.getItem('volume')

        if(getVolumne){
            this.variableVolumeArray = JSON.parse(getVolumne)
            localStorage.setItem('volume', JSON.stringify(this.variableVolumeArray))
        
        }
        else {
            this.audioController.playAudio();
            this.iconShow.node.active = true;
            this.iconOff.node.active = false;
        }
        
        this.convertVolume = this.variableVolumeArray[this.variableVolumeArray.length - 1]
        if(this.convertVolume === 1){
            this.iconShow.node.active = true;
            this.iconOff.node.active = false;
            this.audioController.playAudio();
        }
        else if(this.convertVolume === 0) {
            this.iconShow.node.active = false;
            this.iconOff.node.active = true;
            this.audioController.pauseAudio();
        }
    }

    onClickIconPause(){
        let opacityBtnOff = this.iconOff.getComponent(UIOpacity)
        let opacityBtnOn = this.iconShow.getComponent(UIOpacity)
        
        this.pause.IsPause = !this.pause.IsPause;
        if(this.pause.IsPause){
            this.iconOff.interactable = false;
            this.iconShow.interactable = false;
            opacityBtnOff.opacity = 0;
            opacityBtnOn.opacity = 0;
            director.pause();
        } else {
            director.resume();
            this.iconOff.interactable = true;
            this.iconShow.interactable = true;
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
        this.variableVolume = 1;
        this.variableVolumeArray.push(this.variableVolume)
        sys.localStorage.setItem('volume', JSON.stringify(this.variableVolumeArray))

        this.iconShow.node.active = true;
        this.iconOff.node.active = false;
        this.audioController.playAudio();
    }

    protected offAudio(): void {
        this.variableVolume = 0;
        this.variableVolumeArray.push(this.variableVolume)
        sys.localStorage.setItem('volume', JSON.stringify(this.variableVolumeArray))

        this.iconShow.node.active = false;
        this.iconOff.node.active = true;
        this.audioController.pauseAudio();
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


