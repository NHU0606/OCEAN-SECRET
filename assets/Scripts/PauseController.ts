import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PauseController')
export class PauseController extends Component {
    private isIconPause: boolean = false;
    private isPause: boolean = false;

    public get IsPause() : boolean {
        return this.isPause;
    }

    public set IsPause(value : boolean) {
        this.isPause = value;
    }

    @property(Node)
    public pauseIcon: Node = null;

    @property(Node)
    public playIcon: Node = null;

    protected onLoad(): void {
        this.playIcon.active = false;
        this.pauseIcon.active = true;
    }

    onToggleButtonClicked() {
        this.isIconPause = !this.isIconPause;
        this.updateIcon();
    }

    updateIcon(){
        this.playIcon.active = this.isIconPause;
        this.pauseIcon.active = !this.isIconPause;
    }
}


