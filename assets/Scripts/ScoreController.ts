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

    addScore1() {
        this.updateScore(this.curScore + 1);
    }

    addScore2() {
        this.updateScore(this.curScore + 2);
    }

    addScore3() {
        this.updateScore(this.curScore + 3);
    }

    addScore4() {
        this.updateScore(this.curScore + 4);
    }

    addScore5() {
        this.updateScore(this.curScore + 5);
    }

    addScore6() {
        this.updateScore(this.curScore + 6);
    }

    addScore7() {
        this.updateScore(this.curScore + 7);
    }

    addScore8() {
        this.updateScore(this.curScore + 8);
    }

    hideScore() {
        this.node.getComponent(LabelComponent).string = '';
    }
}


