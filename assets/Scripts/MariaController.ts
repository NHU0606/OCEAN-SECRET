import { _decorator, Collider2D, Component, EventKeyboard, input, Input, KeyCode, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MariaController')
export class MariaController extends Component {
    @property
    private speed: number = 1000;
    private direction: Vec3 = new Vec3(0, 0, 0);
    left: boolean = false;
    up: boolean = false;
    
    protected onLoad(): void {
        this.left = false;
        this.up = false;
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
                this.left = true;
                this.direction.x = -3;
                this.direction.y = 0;
                this.node.angle = 0;
                this.node.scale = new Vec3(-Math.abs(this.node.scale.x), this.node.scale.y, 0.5);
                break;
            case KeyCode.ARROW_RIGHT:
                this.left = false;
                this.direction.x = 3;
                this.direction.y = 0;
                this.node.angle = 0;
                this.node.scale = new Vec3(Math.abs(this.node.scale.x), this.node.scale.y, 0.5);
                break;
            case KeyCode.ARROW_UP:
                this.up = true;
                this.direction.x = 0;
                this.direction.y = 3;
                this.node.angle = 90;
                this.node.scale = new Vec3(Math.abs(this.node.scale.x), this.node.scale.y, 0.5);
                break;
            case KeyCode.ARROW_DOWN:
                this.up = false;
                this.direction.x = 0;
                this.direction.y = -3;
                this.node.angle = -90;
                this.node.scale = new Vec3(Math.abs(this.node.scale.x), this.node.scale.y, 0.5);
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

    protected update(dt: number): void {
        const displacement = this.direction.multiplyScalar(this.speed * dt);
        this.node.position = this.node.position.add(displacement);  
    }
}



