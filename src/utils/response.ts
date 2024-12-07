import { Response } from "express";
import { ErrorObject } from "./types";

export const successResponse = (res:Response,statusCode:number,messge:string,data:any):void =>{
    res.status(statusCode).json({
        status:'success',
        message:messge,
        data

    })
}
export const errorResponse = (res:Response,statusCode:number,messge:string,error:ErrorObject):void =>{
    res.status(statusCode).json({
        status:'error',
        message:messge,
        error
    })
}