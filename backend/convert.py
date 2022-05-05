import pymysql
from opencc import OpenCC


OLD_db_settings = {
    "host": "127.0.0.1",
    "port": 3306,
    "user": "root",
    "password": "password",
    "db": "eldenRingMap",
    "charset": "utf8"
}

NEW_db_settings = {
    "host": "127.0.0.1",
    "port": 3306,
    "user": "root",
    "password": "password",
    "db": "EldenRingMap_zhTW",
    "charset": "utf8"
}


try:
    # 建立Connection物件
    OLD_conn = pymysql.connect(**OLD_db_settings)
    NEW_conn = pymysql.connect(**NEW_db_settings)
except Exception as ex:
    print(ex)

converter = OpenCC('s2t') 

    



def changeType(Pointname, Pointtype):
    TypeMap = {
        "":"Other",
        'cifu':"GraceOfSite",
        "pass":"shortPath",
        "portal":"wayGates",
        "soulsite":"RuneFarm",
        "place":"Location",
        "lianji":"SummoningPool",
        "cave":"Cave",
        "wind":"HorseTorrent",
        "temple":"WalkingMausoleum",
        "redsoul":"NPCInvaders",
        "jingying":"GreatEnemy",
        "cemetery":"Cartacombs",
        "goldseed":"GoldenSeed",
        "ludi":"CrystalTears",
        "impoitem":"KeyItems",
        "key":"StoneSwordKey",
        "sigen":"DeathRoot",
        "bead":"MinersBellBearing",
        "orchid":"PickersBellBearing",
        "sbludi":"SacredTear",
        "tear":"LarvalTear",
        "paint":"Painting",
        "magic":"Sorceries",
        "daogao":"Incantation",
        "ring":"Tailsman",
        "zhanhui":"AshOfWar",
        "guhui":"SpiritAsh",
        "clothes":"Armor",
        "wayGates":"Waygates",
        "weapon":"Weapon",
        "littboss":"LittleBoss",
        "text":"Text",
        "npc":"NPC",
        "map":"MAP",
        "sword":"Evergaol",
        "boss":"Boss",
        "bigboss":"BigBoss",
        "item":"Item",
        "shop":"Shop",
        "warn":"Warn",
        "question":"Question",
        "taoke":"Taoke",
        "gesture":"Gesture",
        "material":"Material",
        "stone":"Stone"
    }
    
    if ("砥石刀" in Pointname) or ("砥石小刀" in Pointname):
        Pointtype = "Whetblade"
    
    if ("製作筆記" in Pointname) or ("制作笔记" in Pointname):
        Pointtype= "Cookbook"
    
    if ("鍛造" in Pointname):
        Pointtype= "SmithingStone"
    if ("失色" in Pointname):
        Pointtype= "SomberSmithingStone"

    Pointtype = TypeMap.get(Pointtype, Pointtype)
    
    return Pointtype
    
        
    
    
with OLD_conn.cursor() as cursor:
    # 查詢資料SQL語法
    command = "SELECT * FROM map WHERE type='GraceOfSite'"
    cursor.execute(command)
    
    result = cursor.fetchall()
    for each in result:
        Pointid = each[0] #id
        # Pointtype = each[1]
        # Pointname = converter.convert(each[2]) #name
        # Pointtype = changeType(Pointname=Pointname, Pointtype=Pointtype)
        # Pointname = Pointname.replace("?","")
        # Pointdesc = converter.convert(each[3]) #des
        sql = """UPDATE `map` SET `type`=%s WHERE `id`=%s"""
        # sql = """UPDATE `map` SET `type`=%s, `name`=%s, `desc`=%s WHERE `id`=%s"""

        cursor.execute(sql,("SiteOfGrace",int(Pointid)))
        # cursor.execute(sql,(str(Pointtype),str(Pointname), str(Pointdesc),int(Pointid)))
OLD_conn.commit()