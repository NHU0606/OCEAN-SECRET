import { _decorator, Component, Contact2DType, EventKeyboard, input, Input, IPhysics2DContact, KeyCode, macro, Node, PolygonCollider2D, v2, Vec2, Vec3 } from 'cc';
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
    private mariaEat: boolean = false;
    @property
    private speed: number = 1000;

    private direction: Vec3 = new Vec3(0, 0, 0);

    protected onLoad(): void {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    protected onDestroy(): void {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    protected onKeyDown(event: EventKeyboard): void {
        switch (event.keyCode){
            case KeyCode.ARROW_LEFT:
                this.direction.x = -2;
                this.direction.y = 0;
                this.node.angle = 180;
                // this.node.scale = new Vec3 (1, -1, 0);
                break;
            case KeyCode.ARROW_RIGHT:
                this.direction.x = 2;
                this.direction.y = 0;
                this.node.angle = 0;
                // this.node.scale = new Vec3 (1, 1, 0);
                break;
            case KeyCode.ARROW_UP:
                this.direction.x = 0;
                this.direction.y = 2;
                this.node.angle = 90;
                // this.node.scale = new Vec3 (1, 1, 0);
                break;
            case KeyCode.ARROW_DOWN:
                this.direction.x = 0;
                this.direction.y = -2;
                this.node.angle = 270;
                // this.node.scale = new Vec3 (1, -1, 0);
                break;
        }
    }

    protected onKeyUp(event: EventKeyboard): void {
        switch (event.keyCode){
            case KeyCode.ARROW_LEFT:
                this.direction.x = 0;
                break;
            case KeyCode.ARROW_RIGHT:
                this.direction.x = 0;
                break;
            case KeyCode.ARROW_UP:
                this.direction.y = 0;
                break;
            case KeyCode.ARROW_DOWN:
                this.direction.y = 0;
                break;
        }
    }

    protected onCollisionEnter(otherCollider: PolygonCollider2D): void {
        console.log('aaa');
    }
    
    protected update(dt: number): void {
        const displacement = this.direction.multiplyScalar(this.speed * dt);
        this.node.position = this.node.position.add(displacement);  
    }
}



