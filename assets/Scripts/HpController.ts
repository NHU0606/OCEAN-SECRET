import { _decorator, Component, director, LabelComponent, Node } from 'cc';
import { ResultController } from './ResultController';
import { GameModel } from './GameModel';
const { ccclass, property } = _decorator;

@ccclass('HpController')
export class HpController extends Component {
    @property({type: GameModel})
    private gameModel: GameModel = null;

    @property({type: ResultController})
    private resultController: ResultController = null;

    public hp: number = 2;

    updateHP(hp: number) {
        this.hp = hp;
        this.node.getComponent(LabelComponent).string = `HP: ` + String(this.hp);
    }

    minusHp() {
        this.updateHP(this.hp - 1);
    }

    protected hideHP(): void {
        this.node.getComponent(LabelComponent).string = '';
    }

    checkDie() {
        if(this.hp <= 0 ) {
            this.resultController.node.active = true;
            // this.gameModel.node.active = false; 
            director.pause();
        }
    }
}


