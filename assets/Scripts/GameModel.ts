import { _decorator, AudioSource, Button, Component, Node, Prefab, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameModel')
export class GameModel extends Component {
    @property({ type: [Prefab] })
    private fishPrefabs: Prefab[] = [];

    @property({type: Node})
    private fish2Node: Node = null;

    @property({type: AudioSource})
    private audioBackGround: AudioSource = null;

    @property({type: Label})
    private scoreText: Label = null;

    public get FishPrefabs(): Prefab[] {
        return this.fishPrefabs;
    }

    public get Fish2Contain() : Node {
        return this.fish2Node;
    }
    
    public set Fish2Contain(fish2Node : Node) {
        this.fish2Node = fish2Node;
    }
    
    public get AudioBackGround() : AudioSource {
        return this.audioBackGround;
    }
    
    public set AudioBackGround(audioBackGround : AudioSource) {
        this.audioBackGround = audioBackGround;
    }

    public set ScoreText(scoreText : Label) {
        this.scoreText = scoreText;
    }

    public get ScoreText() : Label {
        return this.scoreText;
    }
}


