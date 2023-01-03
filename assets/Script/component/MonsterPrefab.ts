import { _decorator, Component, SpriteFrame, Sprite, random } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MonsterPrefab')
export class MonsterPrefab extends Component {
    @property(SpriteFrame)
    public spriteList: SpriteFrame[] = [];

    init () {
        var randomIdex = Math.floor(Math.random() * this.spriteList.length);
        var sprite = this.getComponent(Sprite);
        sprite.spriteFrame = this.spriteList[randomIdex];
    }
}