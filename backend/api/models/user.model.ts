import { Request } from 'express';

export interface IUser {
    id: number;
    username: string;
    email: string;
    password: string;
    last_login: string;
    create_time: string;
    is_active:number;
  };

export interface IUserGetReq extends Request<{id:IUser['id']}>{}
export interface IUserLoginEmailReq extends Request<{email:IUser['email'], password:IUser['password']}>{}
export interface IUserLoginUserNameReq extends Request<{username:IUser['username'], password:IUser['password']}>{}
export interface IUserRegisterReq extends Request<{username:IUser['username'],email:IUser['email'],password:IUser['password']}>{}


