/**
 * Test swagger
 * testing the fastify swagger api
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { RequestFile } from './models';

export class Def2 {
    'error': Def2.ErrorEnum;
    'statusCode': Def2.StatusCodeEnum;
    'message': string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "error",
            "baseName": "error",
            "type": "Def2.ErrorEnum"
        },
        {
            "name": "statusCode",
            "baseName": "statusCode",
            "type": "Def2.StatusCodeEnum"
        },
        {
            "name": "message",
            "baseName": "message",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return Def2.attributeTypeMap;
    }
}

export namespace Def2 {
    export enum ErrorEnum {
        NotFound = <any> 'Not Found'
    }
    export enum StatusCodeEnum {
        NUMBER_404 = <any> 404
    }
}
