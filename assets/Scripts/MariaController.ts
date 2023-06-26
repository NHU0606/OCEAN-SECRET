import { _decorator, Collider2D, Component, EventKeyboard, input, Input, KeyCode, Vec3, Node, CCFloat, Vec2, v3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MariaController')
export class MariaController extends Component {
    private direction: Vec3 = new Vec3(0, 0, 0);
    @property({type: CCFloat})
	private speed: number = 1000.0;
	private speedStick: number = 250.0;

	private axis: Vec2 = new Vec2();
    
    protected onLoad(): void {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }
    
    protected onDestroy(): void {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    protected update(dt: number): void {
        const displacement = this.direction.multiplyScalar(this.speed * dt);
        this.node.position = this.node.position.add(displacement);  
        this.spaceGotMaria();

		var offset = this.speedStick*dt;
		this.node.setPosition(this.node.position.add(v3(this.axis.x*offset, this.axis.y*offset, 0.0)));
    }
    
    protected onKeyDown(event: EventKeyboard): void {
        switch (event.keyCode){
            case KeyCode.ARROW_LEFT:
                this.direction.x = -5;
                this.direction.y = 0;
                this.node.angle = 0;
                this.node.scale = new Vec3(-Math.abs(this.node.scale.x), this.node.scale.y, 0.5);
                break;
            case KeyCode.ARROW_RIGHT:
                this.direction.x = 5;
                this.direction.y = 0;
                this.node.angle = 0;
                this.node.scale = new Vec3(Math.abs(this.node.scale.x), this.node.scale.y, 0.5);
                break;
            case KeyCode.ARROW_UP:
                this.direction.x = 0;
                this.direction.y = 5;
                // this.node.angle = 90;
                // this.node.scale = new Vec3(Math.abs(this.node.scale.x), this.node.scale.y, 0.5);
                break;
            case KeyCode.ARROW_DOWN:
                this.direction.x = 0;
                this.direction.y = -5;
                // this.node.angle = -90;
                // this.node.scale = new Vec3(Math.abs(this.node.scale.x), this.node.scale.y, 0.5);
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

    protected spaceGotMaria(): void {
        if(this.node.position.x < -440) {
            this.node.position = new Vec3(-440, this.node.position.y, 0)
        } else if(this.node.position.x > 440) {
            this.node.position = new Vec3(440, this.node.position.y, 0)
        } else if(this.node.position.y > 200) {
            this.node.position = new Vec3(this.node.position.x, 200, 0)
        } else if(this.node.position.y < -280) {
            this.node.position = new Vec3(this.node.position.x, -280, 0)
        }
    }

    public OnMove(event: Event, customEventData: Vec2) {
		this.axis = customEventData;
	}

    onLeft() {
        this.node.angle = 0;
        this.node.scale = new Vec3(-Math.abs(this.node.scale.x), this.node.scale.y, 0.5);
    }

    onRight() {
        this.node.angle = 0;
        this.node.scale = new Vec3(Math.abs(this.node.scale.x), this.node.scale.y, 0.5);
    }
}



