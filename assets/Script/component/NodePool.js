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
        this._pool = new cc.NodePool('');
        this.createNode();
        this.countLbl.string = 'Node Created: ' + this.node.getChildByName('content').childrenCount;
    },

    createNode () {
        console.time('createNod_nodePool');
        for (let i = 0; i < 100; i++) {
            var monster = this._pool.get();
            if (!monster) {
                monster = cc.instantiate(this.test);
            }
            monster.x = this.regionOrigin.x + Math.floor(Math.random() * this.regionSize.width);
            monster.y = this.regionOrigin.y + Math.floor(Math.random() * this.regionSize.height);
            monster.getComponent('MonsterPrefab').init();
            this.node.getChildByName('content').addChild(monster);
        }
        console.timeEnd("createNod_nodePool");
    },
    
    onDisable () {
        this._pool.clear();
    },

    onDestroyBtnClicked () {
        for (let i =0; i < this.node.getChildByName('content').childrenCount; i++) {
            this._pool.put(this.node.getChildByName('content').children[i]);
        }
        this.onLog('destroy');
    },

    onCreateBtnClicked () {
        this.createNode();
        this.onLog('create');
    },

    onLog (logType) {
        this.countLbl.string = 'Node Created: ' + this.node.getChildByName('content').childrenCount;
        console.log(logType + '当前对象池中有'  + this._pool.size() + '对象');
    },
});
