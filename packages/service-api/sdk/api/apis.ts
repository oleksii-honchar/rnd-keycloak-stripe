export * from './chatCompletionApi';
import { ChatCompletionApi } from './chatCompletionApi';
export * from './indexApi';
import { IndexApi } from './indexApi';
export * from './pingApi';
import { PingApi } from './pingApi';
import * as http from 'http';

export class HttpError extends Error {
    constructor (public response: http.IncomingMessage, public body: any, public statusCode?: number) {
        super('HTTP request failed');
        this.name = 'HttpError';
    }
}

export { RequestFile } from '../model/models';

export const APIS = [ChatCompletionApi, IndexApi, PingApi];
