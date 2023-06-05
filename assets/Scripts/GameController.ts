import { _decorator, AudioSource, Button, Component, instantiate, Node, Sprite, sys, math, randomRangeInt, director, UIOpacity, Collider2D, Contact2DType, IPhysics2DContact, PolygonCollider2D, Vec3, input, Input, EventKeyboard } from 'cc';
import { GameModel } from './GameModel';
import { MariaController } from './MariaController';
import { PauseController } from './PauseController';
import { FishPrefabController } from './FishPrefabController';
import { AudioController } from './AudioController';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    private variableVolume: number;
    private variableVolumeArray: number[] = [];
    private convertVolume: number;
    private fishArray: FishPrefabController[] = [];

    @property({type: MariaController})
    private mariaController: MariaController;

    @property({type: AudioController})
    private audioController: AudioController;

    private mariaNode : MariaController;

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

        this.mariaNode = this.mariaController.getComponent(MariaController);

        const mariaCollider = this.mariaNode.getComponent(Collider2D);
        if (mariaCollider) {
            mariaCollider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            mariaCollider.node.position = new Vec3(0, 0, 0);
            mariaCollider.apply();
            console.log("had maria collider")
        }
    }
    
    protected onBeginContact(
        selfCollider: Collider2D,
        otherCollider: Collider2D,
        contact: IPhysics2DContact | null
    ) : void {
        console.log('aaaaaaaa')
    }

    protected onClickIconPause(): void {
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


