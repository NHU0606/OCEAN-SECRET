import { _decorator, Component, Node, SystemEvent, v2, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

enum MariaDirection {
    Left,
    Right,
    TopLeft,
    TopRight,
    DownLeft,
    DownRight
}

@ccclass('MariaController')
export class MariaController extends Component {
    @property
    speed: number = 100;

    private direction: Vec2 = new Vec2(0, 0);

    // protected onLoad(): void {
    //     SystemEvent.on(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
    //     SystemEvent.on(SystemEvent.EventType.KEY_UP, this.onKeyUp, this)
    // }

    // protected onDestroy(): void {
    //     SystemEvent.off(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    //     SystemEvent.off(SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    // }

    protected onKeyDown(): void {

    }

    protected onKeyUp(): void {
        
    }
}



