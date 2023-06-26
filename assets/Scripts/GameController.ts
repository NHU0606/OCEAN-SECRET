import { _decorator, AudioSource, Button, Component, instantiate, Node, Sprite, sys, math, randomRangeInt, director, UIOpacity, Collider2D, Contact2DType, IPhysics2DContact, PolygonCollider2D, Vec3, input, Input, EventKeyboard, Label, CCInteger, PhysicsSystem2D, EPhysics2DDrawFlags } from 'cc';
import { GameModel } from './GameModel';
import { MariaController } from './MariaController';
import { PauseController } from './PauseController';
import { FishPrefabController } from './FishPrefabController';
import { AudioController } from './AudioController';
import { ScoreController } from './ScoreController';
import { ResultController } from './ResultController';
import { JoyStickController } from './JoyStickController';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    private variableVolume: number;
    private variableVolumeArray: number[] = [];
    private convertVolume: number;
    private time: number;

    @property({type:CCInteger})
    private totalTime: number = 30;

    @property({type: JoyStickController})
    private joyStick: JoyStickController;

    @property({type: ResultController})
    private result: ResultController;

    @property({type: ScoreController})
    private score: ScoreController;

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

    @property({type: Sprite})
    private listGround: Sprite[] = [null, null];
    
    @property({type: Label})
    private timeLabel: Label;

    private spawnInterval: number = 20;
    private smallSizeRange: number[] = [0.3, 0.5];
    private largeSizeRange: number[] = [0.3, 1];

    protected onLoad() : void  {
        director.resume();
        const audioSrc = this.node.getComponent(AudioSource)
        this.GameModel.AudioBackGround = audioSrc;
    }

    protected spawnFish(): void {
        const elapsedTime = this.totalTime - this.time;
        let sizeRange: number[];
    
        if (elapsedTime < this.spawnInterval) {
            sizeRange = this.smallSizeRange;
        } else {
            sizeRange = this.largeSizeRange;
        }
    
        if (this.GameModel.Fish2Contain.children.length < 30) {
            const randomFishIndex = randomRangeInt(0, this.GameModel.FishPrefabs.length);
            const fishPrefab = this.GameModel.FishPrefabs[randomFishIndex];
            const fishNode = instantiate(fishPrefab).getComponent(FishPrefabController);
            const randomSize = math.randomRange(sizeRange[0], sizeRange[1]);
            fishNode.node.scale = new Vec3(randomSize, -randomSize, 1);
            fishNode.Init(this.GameModel.Fish2Contain);
        }

        // if (this.GameModel.Fish2Contain.children.length < 30) {
        //     const randomFishIndex = randomRangeInt(0,this.GameModel.FishPrefabs.length);
        //     const fishPrefab = this.GameModel.FishPrefabs[randomFishIndex];
        //     const fishNode = instantiate(fishPrefab).getComponent(FishPrefabController);
        //     fishNode.Init(this.GameModel.Fish2Contain);
        // }
    }

    protected start(): void {
        this.GameModel.AudioEat.pause();
        director.resume();

        setTimeout(() => {
            this.time = this.totalTime;
            this.updateTimeLabel();
            this.schedule(function(){
                this.updateTime();
            }, 1)  
        },0); 

        this.schedule(function(){
            this.spawnFish();
        }, math.randomRangeInt(3, 7));

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
        }
    }

    protected updateTime(): void{
        this.time--;

        if(this.time >= 0){
            this.updateTimeLabel();
            if(this.time == 0) {
                this.onTimeUp();
            }
        }
    }

    protected updateTimeLabel(): void{
        this.timeLabel.string = `Time: ` + this.time.toString();
    }

    protected onTimeUp() : void {
        this.result.node.active = true;
        this.iconShow.node.active = false;
        this.iconOff.node.active = false;
        this.pause.node.active = false;
        this.score.node.active = false;
        this.GameModel.Fish2Contain.active = false;
        this.timeLabel.node.active = false;
        this.result.showResult();
        this.joyStick.hideStick();
    }
    
    protected onBeginContact(
        selfCollider: Collider2D,
        otherCollider: Collider2D,
        contact: IPhysics2DContact | null
    ) : void {
        const mariaNode = selfCollider.node;
        const otherNode = otherCollider.node;
        let mariaSize = mariaNode.scale.x
        const otherFishSize = Math.abs(otherNode.scale.x);
        if (Math.abs(mariaSize) < otherFishSize) {
            this.result.node.active = true;
            this.iconShow.node.active = false;
            this.iconOff.node.active = false;
            this.pause.node.active = false;
            this.score.node.active = false;
            this.timeLabel.node.active = false;
            this.mariaController.node.active = false;
            this.joyStick.hideStick();
            this.result.showResult();
            this.GameModel.Fish2Contain.active = false;
        } else if (Math.abs(mariaSize) > otherFishSize){
            this.GameModel.AudioEat.play();
            otherNode.destroy();
            //make size of maria bigger
            let scaleFactor = 0.001;
            if (mariaSize > 0) {
                mariaSize += scaleFactor;
                mariaNode.setScale(mariaSize, Math.abs(mariaNode.scale.y + scaleFactor), 0);
                selfCollider.apply();
            }
            else if (mariaSize < 0) {
                mariaSize -= scaleFactor;
                mariaNode.setScale(mariaSize, Math.abs(mariaNode.scale.y + scaleFactor), 0);
                selfCollider.apply();
            }
           
            let scoreIncrement = 0;
            if (otherFishSize >= 0.1 && otherFishSize < 0.2) {
                scoreIncrement = 1;
            } else if (otherFishSize >= 0.2 && otherFishSize < 0.3) {
                scoreIncrement = 2;
            } else if (otherFishSize >= 0.3 && otherFishSize < 0.4) {
                scoreIncrement = 3;
            } else if (otherFishSize >= 0.4 && otherFishSize < 0.5) {
                scoreIncrement = 4;
            } else if (otherFishSize >= 0.5 && otherFishSize < 0.6) {
                scoreIncrement = 5;
            } else if (otherFishSize >= 0.6 && otherFishSize < 0.7) {
                scoreIncrement = 6;
            } else if (otherFishSize >= 0.7 && otherFishSize < 0.8) {
                scoreIncrement = 7;
            } else if (otherFishSize >= 0.8) {
                scoreIncrement = 8;
            }
            this.score.addScore(scoreIncrement);
        }
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

    protected moveListGround(): void{
        for(let i = 0; i < this.listGround.length; i++){
            const sea = this.listGround[i].node.getPosition();
            sea.x -= 2;
            if(sea.x <= -965){
                sea.x = 965;
            }
            this.listGround[i].node.setPosition(sea);
        }
    }

    protected onClickAgainBtn(): void {
        director.loadScene('Play');
    }

    protected onClickMenuBtn(): void {
        director.loadScene('Entry');
    }

    protected update(dt: number): void {
        this.moveListSea();
        this.moveListGround();
    }
}


