import { _decorator, Component, Prefab, Vec2, Size, Label, instantiate, find } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('NoNodePool')
export class NoNodePool extends Component {
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

        createNode() {
                var oldTime = performance.now();
                var content = find("Mask/content", this.node);
                for (var i = 0; i < 100; i++) {
                        
                        var monster = instantiate(this.test);
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
                content.destroyAllChildren();
                this.countLbl.string = `count: 0`;
                var now = performance.now();
                this.timeLab.string = `loadHasTime ${(now - oldTime).toFixed(2)}ms`;
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
//         this.createNode();
//         this.countLbl.string = 'Node Created: ' + this.node.getChildByName('content').childrenCount;
//     },
// 
//     createNode () {
//         console.time('createNod_nodeNodePool');
//         for (let i = 0; i < 100; i++) {
//             var monster = cc.instantiate(this.test);
//             monster.x = this.regionOrigin.x + Math.floor(Math.random() * this.regionSize.width);
//             monster.y = this.regionOrigin.y + Math.floor(Math.random() * this.regionSize.height);
//             monster.getComponent('MonsterPrefab').init();
//             this.node.getChildByName('content').addChild(monster);
//         }
//         console.timeEnd('createNod_nodeNodePool');
//     },
//     
//     onDisable () {
//         this.node.getChildByName('content').destroyAllChildren();
//     },
// 
//     onDestroyBtnClicked () {
//         this.node.getChildByName('content').destroyAllChildren();
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
//     },
// });
