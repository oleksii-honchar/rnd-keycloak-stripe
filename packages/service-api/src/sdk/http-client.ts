import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { ObjectValues } from 'src/types';
import {
  ConflictError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from 'src/utils/errors';
import { Logger } from 'src/utils/getLogger';

export const HTTP_METHODS = {
  DELETE: 'delete',
  GET: 'get',
  PATCH: 'patch',
  POST: 'post',
  PUT: 'put',
} as const;

export type HttpMethod = ObjectValues<typeof HTTP_METHODS>;

export interface AuthContext {
  username?: string;
  password?: string;
  token?: string;
}

interface HttpClientConfig {
  baseURL: string;
  authContext?: AuthContext;
  timeout?: number;
}

class HttpClient {
  private client: AxiosInstance;
  public logger: Logger;

  constructor(config: HttpClientConfig, logger: Logger) {
    this.logger = logger.child({
      module: 'HttpClient',
    });

    const axiosConfig: AxiosRequestConfig = {
      baseURL: config.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: config.timeout || 5000, // Default timeout of 5 seconds
    };

    if (config.authContext) {
      const { username, password, token } = config.authContext;
      if (username && password) {
        axiosConfig.auth = { username, password };
      } else if (token) {
        axiosConfig.headers = {
          ...axiosConfig.headers,
          Authorization: `Bearer ${token}`,
        };
      }
    }

    this.client = axios.create(axiosConfig);

    this.client.interceptors.request.use(request => {
      this.logger.info('Request:', request.method?.toUpperCase(), request.url);
      return request;
    });

    this.client.interceptors.response.use(
      response => {
        this.logger.info('Response:', response.status, response.config.url);
        return response;
      },
      error => {
        this.logger.error('Error:', error.response?.status, error.config.url);
        return Promise.reject(error);
      },
    );
  }

  private handleError(error: unknown): never {
    if (!axios.isAxiosError(error) || !error.response) {
      throw new InternalServerError((error as Error).message);
    }

    const { status, data } = error.response;

    switch (status) {
      case 401:
        throw new UnauthorizedError(data.message, data.type);
      case 404:
        throw new NotFoundError(data.message, data.type);
      case 409:
        throw new ConflictError(data.message, data.type);
      case 500:
        throw new InternalServerError(data.message, data.type);
      default:
        throw new InternalServerError(data.message);
    }
  }

  async request<ResponsePayload = unknown>(
    method: HttpMethod,
    path: string,
    payload?: Record<string, unknown>,
    config?: AxiosRequestConfig,
  ): Promise<ResponsePayload> {
    try {
      const response = await this.client.request<ResponsePayload>({
        url: path,
        method,
        data: payload,
        ...config,
      });

      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async get<ResponsePayload = unknown>(
    path: string,
    config?: AxiosRequestConfig,
  ): Promise<ResponsePayload> {
    return this.request<ResponsePayload>(HTTP_METHODS.GET, path, undefined, config);
  }

  async post<ResponsePayload = unknown>(
    path: string,
    payload: Record<string, unknown>,
    config?: AxiosRequestConfig,
  ): Promise<ResponsePayload> {
    return this.request<ResponsePayload>(HTTP_METHODS.POST, path, payload, config);
  }

  async put<ResponsePayload = unknown>(
    path: string,
    payload: Record<string, unknown>,
    config?: AxiosRequestConfig,
  ): Promise<ResponsePayload> {
    return this.request<ResponsePayload>(HTTP_METHODS.PUT, path, payload, config);
  }

  async patch<ResponsePayload = unknown>(
    path: string,
    payload: Record<string, unknown>,
    config?: AxiosRequestConfig,
  ): Promise<ResponsePayload> {
    return this.request<ResponsePayload>(HTTP_METHODS.PATCH, path, payload, config);
  }

  async delete<ResponsePayload = unknown>(
    path: string,
    config?: AxiosRequestConfig,
  ): Promise<ResponsePayload> {
    return this.request<ResponsePayload>(HTTP_METHODS.DELETE, path, undefined, config);
  }
}

export { HttpClient };
