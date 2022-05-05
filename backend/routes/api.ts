var express = require('express');
import {Request, Response, Router} from "express";
var router = express.Router();


var SQLquerys = require('../sql/querys');
var connection = require('../database/MapDB')



/* GET page. */
router.get('/all', (req:Request, res:Response) => {
    res.json({
        "data": {},
        "type": 'all'
    })
})

router.get('/siteofgrace', (req:Request, res:Response) => {
    connection.connect(function(err:any) {
        if (err) {
            console.log(err)
            console.log('connecting error');
            return;
        }
        console.log('connecting success');
      });
    
    function test(){
        return new Promise((resolve,reject)=>{
            console.log(SQLquerys.SiteOfGrace)
            connection.query(SQLquerys.SiteOfGrace, (err:any, rows:any) =>  {
                if (err){
                    reject(err)
                }
                else{
                    resolve(rows)
                }
            }); 
        })
    }

    test().then((data)=>{
        data = JSON.parse(JSON.stringify(data))
        res.json({
            "data": {"siteofgrace":data},
            "type": "siteofgrace"
        })}
        
    )
})

router.get('/shortpath', (req, res) => {
    res.json({
        "data": {"shortpath":""},
        "type": "shortpath"
    })
})

router.get('/waygates', (req, res) => {
    res.json({
        "data": {"waygates":""},
        "type": "waygates"
    })
})

router.get('/runefarm', (req, res) => {
    res.json({
        "data": {"runefarm":""},
        "type": "runefarm"
    })
})

router.get('/shop', (req, res) => {
    res.json({
        "data": {"shop":""},
        "type": "shop"
    })
})

router.get('/npc', (req, res) => {
    res.json({
        "data": {"npc":""},
        "type": "npc"
    })
})

router.get('/location', (req, res) => {
    res.json({
        "data": {"location":""},
        "type": "location"
    })
})

router.get('/summoningpool', (req, res) => {
    res.json({
        "data": {"summoningpool":""},
        "type": "summoningpool"
    })
})

router.get('/cave', (req, res) => {
    res.json({
        "data": {"cave":""},
        "type": "cave"
    })
})

router.get('/horsetorrent', (req, res) => {
    res.json({
        "data": {"horsetorrent":""},
        "type": "horsetorrent"
    })
})

router.get('/walkingmausoleum', (req, res) => {
    res.json({
        "data": {"walkingmausoleum":""},
        "type": "walkingmausoleum"
    })
})

router.get('/bigboss', (req, res) => {
    res.json({
        "data": {"bigboss":""},
        "type": "bigboss"
    })
})

router.get('/boss', (req, res) => {
    res.json({
        "data": {"boss":""},
        "type": "boss"
    })
})

router.get('/littleboss', (req, res) => {
    res.json({
        "data": {"littleboss":""},
        "type": 'littleboss'
    })
})

router.get('/npcinvaders', (req, res) => {
    res.json({
        "data": {"npcinvaders":""},
        "type": 'npcinvader'
    })
})

module.exports = router