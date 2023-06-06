import { _decorator, Component, LabelComponent, Node, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ScoreController')
export class ScoreController extends Component {
    public curScore: number = 0;

    updateScore(num: number) {
        this.curScore = num;
        this.node.getComponent(LabelComponent).string = `Score: ` + String(this.curScore);
        let maxScore = parseInt(localStorage.getItem('highscore'));

        if(maxScore < num) {
            localStorage.setItem('highscore', num.toString());
        }
    }

    addScore() {
        this.updateScore(this.curScore + 1);
    }

    hideScore() {
        this.node.getComponent(LabelComponent).string = '';
    }
}


