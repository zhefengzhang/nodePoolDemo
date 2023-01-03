import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends Component {
    @property(Node)
    public nodePool: Node | null = null;
    @property(Node)
    public noNodePool: Node | null = null;

    start () {
    }

    onSwitchBtnClicked () {
            // this.noNodePool.active = this.nodePool.active; 
            // this.nodePool.active = !this.nodePool.active; 
    }

}


/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// cc.Class({
//     extends: cc.Component,
// 
//     properties: {
//         nodePool: cc.Node,
//         noNodePool: cc.Node,
//     },
// 
//     // LIFE-CYCLE CALLBACKS:
// 
//     // onLoad () {},
// 
//     start () {
// 
//     },
// 
// 
//     // update (dt) {},
//     onSwitchBtnClicked () {
//         this.noNodePool.active = this.nodePool.active;
//         this.nodePool.active = !this.nodePool.active;
//         // if (this.nodePool.active) {
//         //     this.nodePool.getComponent('NodePool').init();
//         // }
//         // if (this.noNodePool.active) {
//         //     this.noNodePool.getComponent('NoNodePool').init();
//         // }
//     },
// });
