import { _decorator, Collider2D, Component, math, Node, PolygonCollider2D, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

enum FishDirection {
    Left,
    Right
}

@ccclass('FishPrefabController')
export class FishPrefabController extends Component {
    private fishSpeed: number = math.randomRangeInt(100, 200);
    private curDirection: FishDirection = FishDirection.Left;
    private directionChangeDelay: number = 8;
    private randomSizeBig: number;
    // private randomSizeSmall: number = math.randomRange(Math.abs(0.25), Math.abs(0.5));
    
    private directionChangeTime: number = 0;

    public Init(parent: Node): void {
        // this.node.scale = new Vec3(this.randomSizeSmall, this.randomSizeSmall*-1, 1);
        parent.addChild(this.node);
    }
    
    protected start(): void {      
        const fishCollider = this.node.getComponent(Collider2D);
        if (fishCollider) {
            fishCollider.node.position = new Vec3(math.randomRangeInt(-500, -490),math.randomRangeInt(-300, 180),0);
            fishCollider.apply();
        }
    }

    protected moveFish(dt: number): void {
        const movement = new Vec3(0,0,0);
        if (this.curDirection == FishDirection.Left) {
            movement.x -= this.fishSpeed * dt;
            this.node.angle = 180;
            this.node.scale = new Vec3(-Math.abs(this.node.scale.x), -Math.abs(this.node.scale.y), 0.5);
        } else if (this.curDirection == FishDirection.Right){
            movement.x += this.fishSpeed * dt;
            this.node.angle = 0;
            this.node.scale = new Vec3(-Math.abs(this.node.scale.x), Math.abs(this.node.scale.y), 0.5);

        }
        this.node.position = this.node.position.add(movement);  
        this.node.getComponent(Collider2D);
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

    checkDestroy() {
        this.node.active = false;
    }

    protected update(dt: number): void {
        this.moveFish(dt);
        this.updateDirection(dt);
    }
}


