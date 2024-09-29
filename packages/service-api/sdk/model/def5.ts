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

/**
* Response if user does not have all the requested rights
*/
export class Def5 {
    'error': Def5.ErrorEnum;
    'message': Def5.MessageEnum;
    'statusCode': Def5.StatusCodeEnum;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "error",
            "baseName": "error",
            "type": "Def5.ErrorEnum"
        },
        {
            "name": "message",
            "baseName": "message",
            "type": "Def5.MessageEnum"
        },
        {
            "name": "statusCode",
            "baseName": "statusCode",
            "type": "Def5.StatusCodeEnum"
        }    ];

    static getAttributeTypeMap() {
        return Def5.attributeTypeMap;
    }
}

export namespace Def5 {
    export enum ErrorEnum {
        Forbidden = <any> 'Forbidden'
    }
    export enum MessageEnum {
        NoSufficientRights = <any> 'no_sufficient_rights'
    }
    export enum StatusCodeEnum {
        NUMBER_403 = <any> 403
    }
}
