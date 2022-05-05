import ApiController from "../controllers/ApiController"
import Route from "./route";
import * as Auth from "./../api/middlewares/auth.middleware";

class ApiRoute extends Route{
    private apiController = new ApiController();

    constructor() {
        super();
        this.setMiddleWare();
        this.setRoutes();
    }

    protected setMiddleWare(): void {
        this.router.use(Auth.authorize(['getAlldata']))
    }

    protected setRoutes() {
        this.router.get('/all', this.apiController.all); //全部
        this.router.get('/siteofgrace', this.apiController.siteofgrace); //賜福
        this.router.get('/shortpath', this.apiController.shortpath); //捷徑
        this.router.get('/waygates', this.apiController.waygates); //傳送門
        this.router.get('/runefarm', this.apiController.runefarm); //刷魂點
        this.router.get('/shop', this.apiController.shop); //商人
        this.router.get('/npc', this.apiController.npc); //npc
        this.router.get('/location', this.apiController.location); //地點
        this.router.get('/summoningpool', this.apiController.summoningpool); //多人連線點
        this.router.get('/cave', this.apiController.cave); //洞窟
        this.router.get('/horsetorrent', this.apiController.horsetorrent); //靈魂氣流
        this.router.get('/walkingmausoleum', this.apiController.walkingmausoleum); //漫步靈廟
        this.router.get('/bigboss', this.apiController.bigboss); //大Boss
        this.router.get('/boss', this.apiController.boss); //一般boss
        this.router.get('/littleboss', this.apiController.littleboss); //小boss
        this.router.get('/npcinvaders', this.apiController.npcinvaders); //紅靈入侵
        this.router.get('/greatenemy', this.apiController.greatenemy); //菁英怪
        this.router.get('/item', this.apiController.item); //物品
        this.router.get('/cartacombs', this.apiController.cartacombs); //地下墓地
        this.router.get('/evergaol', this.apiController.evergaol); //封印監牢
        this.router.get('/goldenseed', this.apiController.goldenseed); //黃金種子
        this.router.get('/crystaltears', this.apiController.crystaltears); //露滴
        this.router.get('/keyitems', this.apiController.keyitems); //重要物品
        this.router.get('/stonewordkey', this.apiController.stonewordkey); //石劍鑰匙
        this.router.get('/deathroot', this.apiController.deathroot); //死根
        this.router.get('/dragonheart', this.apiController.dragonheart); //龍心臟
        this.router.get('/larvaltear', this.apiController.larvaltear); //淚滴幼體
        this.router.get('/pickersbellbearing', this.apiController.pickersbellbearing); //墓地鈴蘭
        this.router.get('/sacredtear', this.apiController.sacredtear); //聖杯露滴
        this.router.get('/minersbellbearing', this.apiController.minersbellbearing); //礦工玲珠
        this.router.get('/painting', this.apiController.painting); //畫
        this.router.get('/gesture', this.apiController.gesture); //動作
        this.router.get('/material', this.apiController.material); //資源
        this.router.get('/sorceries', this.apiController.sorceries); //魔法
        this.router.get('/weapon', this.apiController.weapon); //武器
        this.router.get('/cookbook', this.apiController.cookbook); //製作筆記
        this.router.get('/whetblade', this.apiController.whetblade); //砥石刀
        this.router.get('/incantation', this.apiController.incantation); //禱告
        this.router.get('/tailsman', this.apiController.tailsman); //護符
        this.router.get('/ashofwar', this.apiController.ashofwar); //戰灰
        this.router.get('/spiritash', this.apiController.spiritash); //骨灰
        this.router.get('/armor', this.apiController.armor); //裝備
    }
}

export default ApiRoute;

