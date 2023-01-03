import { _decorator, Component, Prefab, Vec2, Size, Label, NodePool, instantiate, find } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('NodePool')
export class NodePoolEx extends Component {
	@property(Prefab)
	public test: Prefab | null = null;
	@property(Vec2)
	public regionOrigin: Vec2 = new Vec2();
	@property(Size)
	public regionSize: Size = new Size();
	@property(Label)
	public countLbl: Label | null = null;
	@property(Label)
	timeLab: Label = null;
	_pool: NodePool;

	start() {
		//初始化节点池
		this._pool = new NodePool('Test');
	}

	createNode() {
		var oldTime = performance.now();
		var content = find("Mask/content", this.node);
		for (let i = 0; i < 100; i++) {
			//尝试从节点池获取缓存的节点，如果没有缓存节点，则从预制体中实例化节点
			var monster = this._pool.get();
			if (!monster) {
				monster = instantiate(this.test);
			}
			var x = this.regionOrigin.x + Math.floor(Math.random() * this.regionSize.width);
			var y = this.regionOrigin.y + Math.floor(Math.random() * this.regionSize.height);
			monster.setPosition(x, y, 0);
			//@ts-ignore
			monster.getComponent('MonsterPrefab').init();

			content.addChild(monster);
			if (i === 99) {
				var now = performance.now();
				this.countLbl.string = `count: ${content.children.length.toString()}`;
				this.timeLab.string = `loadHasTime ${(now - oldTime).toFixed(2)}ms`;
			}
		}
	}

	onDestroyBtnClicked() {
		var oldTime = performance.now();
		var content = find("Mask/content", this.node);
		var countLength = content.children.length;
		for (let i = countLength - 1; i >= 0; i--) {
			//使用 put 将节点从父节点上移除，停止节点的渲染、动画、逻辑执行，之后缓存到节点池中。
			this._pool.put(content.children[i]);
			if (i === 0) {
				var now = performance.now();
				this.countLbl.string = `count: 0`;
				this.timeLab.string = `loadHasTime ${(now - oldTime).toFixed(2)}ms`;
			}
		}
	}

	onCreateBtnClicked() {
		this.createNode();
	}

}


/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// cc.Class({
//     extends: cc.Component,
// 
//     properties: {
//         test: cc.Prefab,
//         regionOrigin: cc.Vec2,
//         regionSize: cc.Size,
//         countLbl: cc.Label,
//     },
// 
//     // use this for initialization
//     onEnable: function () {
//         this._pool = new cc.NodePool('');
//         this.createNode();
//         this.countLbl.string = 'Node Created: ' + this.node.getChildByName('content').childrenCount;
//     },
// 
//     createNode () {
//         console.time('createNod_nodePool');
//         for (let i = 0; i < 100; i++) {
//             var monster = this._pool.get();
//             if (!monster) {
//                 monster = cc.instantiate(this.test);
//             }
//             monster.x = this.regionOrigin.x + Math.floor(Math.random() * this.regionSize.width);
//             monster.y = this.regionOrigin.y + Math.floor(Math.random() * this.regionSize.height);
//             monster.getComponent('MonsterPrefab').init();
//             this.node.getChildByName('content').addChild(monster);
//         }
//         console.timeEnd("createNod_nodePool");
//     },
//     
//     onDisable () {
//         this._pool.clear();
//     },
// 
//     onDestroyBtnClicked () {
//         for (let i =0; i < this.node.getChildByName('content').childrenCount; i++) {
//             this._pool.put(this.node.getChildByName('content').children[i]);
//         }
//         this.onLog('destroy');
//     },
// 
//     onCreateBtnClicked () {
//         this.createNode();
//         this.onLog('create');
//     },
// 
//     onLog (logType) {
//         this.countLbl.string = 'Node Created: ' + this.node.getChildByName('content').childrenCount;
//         console.log(logType + '当前对象池中有'  + this._pool.size() + '对象');
//     },
// });
