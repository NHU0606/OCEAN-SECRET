import { _decorator, Component, math, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

enum FishDirection {
    Left,
    Right
}

@ccclass('FishPrefabController')
export class FishPrefabController extends Component {
    private fishSpeed: number = math.randomRangeInt(50, 150);
    private curDirection: FishDirection = FishDirection.Left;
    private directionChangeDelay: number = 20;
    private directionChangeTime: number = 0;

    public Init(parent: Node): void {
        parent.addChild(this.node);
        this.node.setPosition(math.randomRangeInt(-250, 400), math.randomRangeInt(-250, 100), 0);
    }

    protected moveFish(dt: number): void {
        const movement = new Vec3(0,0,0);
        if (this.curDirection == FishDirection.Left) {
            movement.x -= this.fishSpeed * dt;
            this.node.angle = 0;
            this.node.scale = new Vec3(1, 1, 0)
        } else if (this.curDirection == FishDirection.Right){
            movement.x += this.fishSpeed * dt;
            this.node.angle = 180;
            this.node.scale = new Vec3(1, -1, 0)
        }
        this.node.position = this.node.position.add(movement);
    }

    protected updateDirection(dt: number): void {
        this.directionChangeTime -= dt;
        if (this.directionChangeTime <= 0) {
            this.setDirection();
            this.directionChangeTime = this.directionChangeDelay;
        }
    }
            
    protected setDirection(): void {
        const directionCount = Object.keys(FishDirection).length / 2;
        const nextDirection = (this.curDirection + 1) % directionCount;
        this.curDirection = nextDirection;
    }

    protected update(dt: number): void {
        this.moveFish(dt);
        this.updateDirection(dt);
    }
}


