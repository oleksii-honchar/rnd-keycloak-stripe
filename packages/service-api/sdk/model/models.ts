import localVarRequest from 'request';

export * from './apiChatCompletionPost200Response';
export * from './apiChatCompletionPost200ResponseChoicesInner';
export * from './apiChatCompletionPost200ResponseChoicesInnerMessage';
export * from './apiChatCompletionPost200ResponseUsage';
export * from './apiChatCompletionPost200ResponseUsageCompletionTokensDetails';
export * from './apiChatCompletionPostRequest';
export * from './apiGet200Response';
export * from './def0';
export * from './def1';
export * from './def2';
export * from './def3';
export * from './def4';
export * from './def5';

import * as fs from 'fs';

export interface RequestDetailedFile {
    value: Buffer;
    options?: {
        filename?: string;
        contentType?: string;
    }
}

export type RequestFile = string | Buffer | fs.ReadStream | RequestDetailedFile;


import { ApiChatCompletionPost200Response } from './apiChatCompletionPost200Response';
import { ApiChatCompletionPost200ResponseChoicesInner } from './apiChatCompletionPost200ResponseChoicesInner';
import { ApiChatCompletionPost200ResponseChoicesInnerMessage } from './apiChatCompletionPost200ResponseChoicesInnerMessage';
import { ApiChatCompletionPost200ResponseUsage } from './apiChatCompletionPost200ResponseUsage';
import { ApiChatCompletionPost200ResponseUsageCompletionTokensDetails } from './apiChatCompletionPost200ResponseUsageCompletionTokensDetails';
import { ApiChatCompletionPostRequest } from './apiChatCompletionPostRequest';
import { ApiGet200Response } from './apiGet200Response';
import { Def0 } from './def0';
import { Def1 } from './def1';
import { Def2 } from './def2';
import { Def3 } from './def3';
import { Def4 } from './def4';
import { Def5 } from './def5';

/* tslint:disable:no-unused-variable */
let primitives = [
                    "string",
                    "boolean",
                    "double",
                    "integer",
                    "long",
                    "float",
                    "number",
                    "any"
                 ];

let enumsMap: {[index: string]: any} = {
        "ApiChatCompletionPost200Response.ObjectEnum": ApiChatCompletionPost200Response.ObjectEnum,
        "Def2.ErrorEnum": Def2.ErrorEnum,
        "Def2.StatusCodeEnum": Def2.StatusCodeEnum,
        "Def3.ErrorEnum": Def3.ErrorEnum,
        "Def3.StatusCodeEnum": Def3.StatusCodeEnum,
        "Def4.ErrorEnum": Def4.ErrorEnum,
        "Def4.MessageEnum": Def4.MessageEnum,
        "Def4.StatusCodeEnum": Def4.StatusCodeEnum,
        "Def5.ErrorEnum": Def5.ErrorEnum,
        "Def5.MessageEnum": Def5.MessageEnum,
        "Def5.StatusCodeEnum": Def5.StatusCodeEnum,
}

let typeMap: {[index: string]: any} = {
    "ApiChatCompletionPost200Response": ApiChatCompletionPost200Response,
    "ApiChatCompletionPost200ResponseChoicesInner": ApiChatCompletionPost200ResponseChoicesInner,
    "ApiChatCompletionPost200ResponseChoicesInnerMessage": ApiChatCompletionPost200ResponseChoicesInnerMessage,
    "ApiChatCompletionPost200ResponseUsage": ApiChatCompletionPost200ResponseUsage,
    "ApiChatCompletionPost200ResponseUsageCompletionTokensDetails": ApiChatCompletionPost200ResponseUsageCompletionTokensDetails,
    "ApiChatCompletionPostRequest": ApiChatCompletionPostRequest,
    "ApiGet200Response": ApiGet200Response,
    "Def0": Def0,
    "Def1": Def1,
    "Def2": Def2,
    "Def3": Def3,
    "Def4": Def4,
    "Def5": Def5,
}

export class ObjectSerializer {
    public static findCorrectType(data: any, expectedType: string) {
        if (data == undefined) {
            return expectedType;
        } else if (primitives.indexOf(expectedType.toLowerCase()) !== -1) {
            return expectedType;
        } else if (expectedType === "Date") {
            return expectedType;
        } else {
            if (enumsMap[expectedType]) {
                return expectedType;
            }

            if (!typeMap[expectedType]) {
                return expectedType; // w/e we don't know the type
            }

            // Check the discriminator
            let discriminatorProperty = typeMap[expectedType].discriminator;
            if (discriminatorProperty == null) {
                return expectedType; // the type does not have a discriminator. use it.
            } else {
                if (data[discriminatorProperty]) {
                    var discriminatorType = data[discriminatorProperty];
                    if(typeMap[discriminatorType]){
                        return discriminatorType; // use the type given in the discriminator
                    } else {
                        return expectedType; // discriminator did not map to a type
                    }
                } else {
                    return expectedType; // discriminator was not present (or an empty string)
                }
            }
        }
    }

    public static serialize(data: any, type: string) {
        if (data == undefined) {
            return data;
        } else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        } else if (type.lastIndexOf("Array<", 0) === 0) { // string.startsWith pre es6
            let subType: string = type.replace("Array<", ""); // Array<Type> => Type>
            subType = subType.substring(0, subType.length - 1); // Type> => Type
            let transformedData: any[] = [];
            for (let index = 0; index < data.length; index++) {
                let datum = data[index];
                transformedData.push(ObjectSerializer.serialize(datum, subType));
            }
            return transformedData;
        } else if (type === "Date") {
            return data.toISOString();
        } else {
            if (enumsMap[type]) {
                return data;
            }
            if (!typeMap[type]) { // in case we dont know the type
                return data;
            }

            // Get the actual type of this object
            type = this.findCorrectType(data, type);

            // get the map for the correct type.
            let attributeTypes = typeMap[type].getAttributeTypeMap();
            let instance: {[index: string]: any} = {};
            for (let index = 0; index < attributeTypes.length; index++) {
                let attributeType = attributeTypes[index];
                instance[attributeType.baseName] = ObjectSerializer.serialize(data[attributeType.name], attributeType.type);
            }
            return instance;
        }
    }

    public static deserialize(data: any, type: string) {
        // polymorphism may change the actual type.
        type = ObjectSerializer.findCorrectType(data, type);
        if (data == undefined) {
            return data;
        } else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        } else if (type.lastIndexOf("Array<", 0) === 0) { // string.startsWith pre es6
            let subType: string = type.replace("Array<", ""); // Array<Type> => Type>
            subType = subType.substring(0, subType.length - 1); // Type> => Type
            let transformedData: any[] = [];
            for (let index = 0; index < data.length; index++) {
                let datum = data[index];
                transformedData.push(ObjectSerializer.deserialize(datum, subType));
            }
            return transformedData;
        } else if (type === "Date") {
            return new Date(data);
        } else {
            if (enumsMap[type]) {// is Enum
                return data;
            }

            if (!typeMap[type]) { // dont know the type
                return data;
            }
            let instance = new typeMap[type]();
            let attributeTypes = typeMap[type].getAttributeTypeMap();
            for (let index = 0; index < attributeTypes.length; index++) {
                let attributeType = attributeTypes[index];
                instance[attributeType.name] = ObjectSerializer.deserialize(data[attributeType.baseName], attributeType.type);
            }
            return instance;
        }
    }
}

export interface Authentication {
    /**
    * Apply authentication settings to header and query params.
    */
    applyToRequest(requestOptions: localVarRequest.Options): Promise<void> | void;
}

export class HttpBasicAuth implements Authentication {
    public username: string = '';
    public password: string = '';

    applyToRequest(requestOptions: localVarRequest.Options): void {
        requestOptions.auth = {
            username: this.username, password: this.password
        }
    }
}

export class HttpBearerAuth implements Authentication {
    public accessToken: string | (() => string) = '';

    applyToRequest(requestOptions: localVarRequest.Options): void {
        if (requestOptions && requestOptions.headers) {
            const accessToken = typeof this.accessToken === 'function'
                            ? this.accessToken()
                            : this.accessToken;
            requestOptions.headers["Authorization"] = "Bearer " + accessToken;
        }
    }
}

export class ApiKeyAuth implements Authentication {
    public apiKey: string = '';

    constructor(private location: string, private paramName: string) {
    }

    applyToRequest(requestOptions: localVarRequest.Options): void {
        if (this.location == "query") {
            (<any>requestOptions.qs)[this.paramName] = this.apiKey;
        } else if (this.location == "header" && requestOptions && requestOptions.headers) {
            requestOptions.headers[this.paramName] = this.apiKey;
        } else if (this.location == 'cookie' && requestOptions && requestOptions.headers) {
            if (requestOptions.headers['Cookie']) {
                requestOptions.headers['Cookie'] += '; ' + this.paramName + '=' + encodeURIComponent(this.apiKey);
            }
            else {
                requestOptions.headers['Cookie'] = this.paramName + '=' + encodeURIComponent(this.apiKey);
            }
        }
    }
}

export class OAuth implements Authentication {
    public accessToken: string = '';

    applyToRequest(requestOptions: localVarRequest.Options): void {
        if (requestOptions && requestOptions.headers) {
            requestOptions.headers["Authorization"] = "Bearer " + this.accessToken;
        }
    }
}

export class VoidAuth implements Authentication {
    public username: string = '';
    public password: string = '';

    applyToRequest(_: localVarRequest.Options): void {
        // Do nothing
    }
}

export type Interceptor = (requestOptions: localVarRequest.Options) => (Promise<void> | void);
