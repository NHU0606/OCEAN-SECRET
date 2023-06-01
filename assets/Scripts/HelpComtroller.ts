import { _decorator, Button, Component, Label, Node, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('HelpComtroller')
export class HelpComtroller extends Component {
    @property({type: Sprite})
    private overLay: Sprite = null;

    @property({type: Sprite})
    private boardHelp: Sprite = null;

    @property({type: Label})
    private helpText: Label = null;

    @property({type: Button})
    private closeBtn: Button = null;

    showHelp(){
        this.node.active = true;
    }
}


