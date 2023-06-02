import { _decorator, AudioSource, Button, Component, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameModel')
export class GameModel extends Component {
    @property({ type: [Prefab] })
    private fishPrefabs: Prefab[] = [];

    @property({type: Node})
    private fish2Node: Node = null;

    @property({type: AudioSource})
    private audioBackGround: AudioSource = null;

    @property({type: Button})
    private audioOff: Button = null;

    @property({type: Button})
    private audioOn: Button = null;

    public get FishPrefabs(): Prefab[] {
        return this.fishPrefabs;
    }

    public get BirdContain() : Node {
        return this.fish2Node;
    }
    
    public set Fish2Node(fish2Node : Node) {
        this.fish2Node = fish2Node;
    }
    
    public get AudioBackGround() : AudioSource {
        return this.audioBackGround;
    }
    
    public set AudioBackGround(audioBackGround : AudioSource) {
        this.audioBackGround = audioBackGround;
    }

    public get AudioOffBtn() : Button {
        return this.audioOff;
    }
    
    public set AudioOffBtn(audioOff : Button) {
        this.audioOff = audioOff;
    }

    public get AudioOnBtn() : Button {
        return this.audioOn;
    }
    
    public set AudioOnBtn(audioOn : Button) {
        this.audioOn = audioOn;
    }
}


