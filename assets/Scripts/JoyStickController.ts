import { _decorator, Component, Node, Vec2, EventTouch, CCInteger, UIOpacity, EventHandler, UITransform, Vec3 } from 'cc';
import { MariaController } from './MariaController';
const { ccclass, property } = _decorator;

@ccclass('JoyStickController')
export class JoyStickController extends Component {
    @property({ type: Node })
    private stickBall: Node = null;

    @property({type: MariaController})
    private maria: MariaController;

    @property({type: [EventHandler]})
	private axisEvents : EventHandler[] = [];

    private size : number;
    arrowsNode: any;

    protected onLoad(): void {
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    
		this.size = this.getComponent(UITransform).contentSize.width/3.0;
    }

    protected onTouchStart(event: EventTouch): void {
        this.onBegin(event.getLocation());
    }

    protected onTouchMove(event: EventTouch): void {
        this.onBegin(event.getLocation());
    }

    private onTouchEnd(event: EventTouch) : void {
		this.onEnd();
	}

    private onBegin(screenPosition: Vec2) : void {
		let position = new Vec3();
		position = this.node.inverseTransformPoint(position, new Vec3(screenPosition.x, screenPosition.y, 0.0));
		const length = position.length();
		if (length > this.size) {
			position.x = position.x*this.size/length;
			position.y = position.y*this.size/length;
		}
		this.stickBall.setPosition(position);

		const axis = new Vec2(position.x/this.size, position.y/this.size);
		EventHandler.emitEvents(this.axisEvents, this, axis);
    }

	private onEnd() : void {
		this.stickBall.setPosition(Vec3.ZERO);
		EventHandler.emitEvents(this.axisEvents, this, Vec2.ZERO);
	}

    hideStick() {
        this.node.active = false; 
    }

    protected update(dt: number): void {
        if(this.stickBall.position.x < 0) {
            this.maria.onLeft();
        } else if (this.stickBall.position.x > 0) {
            this.maria.onRight();
        } 
    }
}
