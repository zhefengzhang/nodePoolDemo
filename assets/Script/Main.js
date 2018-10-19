cc.Class({
    extends: cc.Component,

    properties: {
        nodePool: cc.Node,
        noNodePool: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },


    // update (dt) {},
    onSwitchBtnClicked () {
        this.noNodePool.active = this.nodePool.active;
        this.nodePool.active = !this.nodePool.active;
        // if (this.nodePool.active) {
        //     this.nodePool.getComponent('NodePool').init();
        // }
        // if (this.noNodePool.active) {
        //     this.noNodePool.getComponent('NoNodePool').init();
        // }
    },
});
