import { _decorator, Collider2D, Component, math, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

enum FishDirection {
    Left,
    Right
}

@ccclass('FishPrefabController')
export class FishPrefabController extends Component {
   
    private fishSpeed: number = math.randomRangeInt(50, 150);
    private curDirection: FishDirection = FishDirection.Left;
    private directionChangeDelay: number = 8;
    private randomSize: number = math.randomRange(0.3, 1.0);
    private directionChangeTime: number = 0;

    public Init(parent: Node): void {
        this.node.scale = new Vec3(this.randomSize, this.randomSize, 1);
        
        parent.addChild(this.node);
        this.node.setPosition(math.randomRangeInt(-500, 0), math.randomRangeInt(-270, 100), 0);
    }
    
    protected start(): void {      
        const fishCollider = this.node.getComponent(Collider2D);
        if (fishCollider) {
            fishCollider.apply();
            console.log("had fish collider")
        }
    }
    

    protected moveFish(dt: number): void {
        const movement = new Vec3(0,0,0);
        if (this.curDirection == FishDirection.Left) {
            movement.x -= this.fishSpeed * dt;
            this.node.angle = 0;
            this.node.scale = new Vec3(this.randomSize, this.randomSize, 1);
        } else if (this.curDirection == FishDirection.Right){
            movement.x += this.fishSpeed * dt;
            this.node.angle = 180;
            this.node.scale = new Vec3(this.randomSize, this.randomSize*-1, 1);
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


