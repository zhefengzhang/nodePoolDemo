cc.Class({
    extends: cc.Component,

    properties: {
        test: cc.Prefab,
        regionOrigin: cc.Vec2,
        regionSize: cc.Size,
        countLbl: cc.Label,
        loadTimeLbl: cc.Label
    },

    // use this for initialization
    onEnable: function () {
        this.createNode();
        this.countLbl.string = 'Node Created: ' + this.node.getChildByName('content').childrenCount;
    },

    createNode () {
        console.time('createNod_nodeNodePool');
        for (let i = 0; i < 100; i++) {
            var monster = cc.instantiate(this.test);
            monster.x = this.regionOrigin.x + Math.floor(Math.random() * this.regionSize.width);
            monster.y = this.regionOrigin.y + Math.floor(Math.random() * this.regionSize.height);
            monster.getComponent('MonsterPrefab').init();
            this.node.getChildByName('content').addChild(monster);
        }
        console.timeEnd('createNod_nodeNodePool');
    },
    
    onDisable () {
        this.node.getChildByName('content').destroyAllChildren();
    },

    onDestroyBtnClicked () {
        this.node.getChildByName('content').destroyAllChildren();
        this.onLog('destroy');
    },

    onCreateBtnClicked () {
        this.createNode();
        this.onLog('create');
    },

    onLog (logType) {
        this.countLbl.string = 'Node Created: ' + this.node.getChildByName('content').childrenCount;
    },
});
