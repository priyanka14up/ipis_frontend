import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { getAccessToken } from "../../utility/appUtil";

enum StatusCode {
  Unauthorized = 401,
  Forbidden = 403,
  TooManyRequests = 429,
  InternalServerError = 500,
}

const headers: Readonly<Record<any, any | boolean>> = {
  Accept: "application/json",
  "Content-Type": "application/json; charset=utf-8",
  "Access-Control-Allow-Credentials": true,
  "X-Requested-With": "XMLHttpRequest",
}; 

// We can use the following function to inject the JWT token through an interceptor
// We get the accessToken from the localStorage that we set when we authenticate
 const injectToken = (config: AxiosRequestConfig): AxiosRequestConfig => {
     const token = getAccessToken();
     if (token != null) {
       config.headers.Authorization = `Bearer ${token}`;
     }
     return config;
 };

export default abstract class BaseService {
  constructor(private baseURL: string) {
  }

  private instance: AxiosInstance | null = null;

  protected async request<T = any, R = AxiosResponse<T>>(
    config: AxiosRequestConfig
  ): Promise<R> {
    return await this.http.request(config);
  }

  protected async get<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return await this.http.get<T, R>(url, config);
  }

  protected async post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    if(config){
      return await this.http.post<T, R>(url, data, config);
    }
    else{
      return await this.http.post<T, R>(url, data, headers);
    }
  }

  protected async put<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return await this.http.put<T, R>(url, data, config);
  }

  protected async patch<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return await this.http.patch<T, R>(url, data, config);
  }

  protected async delete<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return await this.http.delete<T, R>(url, config);
  }

  private get http(): AxiosInstance {
    return this.instance != null ? this.instance : this.initHttp();
  }

  private initHttp(): AxiosInstance {
    const http = axios.create({
      baseURL: this.baseURL,
      headers,
    });

    http.interceptors.request.use(injectToken, (error) =>
      Promise.reject(error)
    );

    http.interceptors.response.use(
      (response) => response,
      (error) => {
        const { response } = error;
        return response;
      }
    );

    this.instance = http;
    return http;
  }

  // Handle global app errors
  // We can handle generic app errors depending on the status code
  private handleError(error: any) {
    const status = error;

    switch (status) {
      case StatusCode.InternalServerError: {
        // Handle InternalServerError
        break;
      }
      case StatusCode.Forbidden: {
        // Handle Forbidden
        break;
      }
      case StatusCode.Unauthorized: {
        // Handle Unauthorized
        break;
      }
      case StatusCode.TooManyRequests: {
        // Handle TooManyRequests
        break;
      }
    }

    return Promise.reject(error);
  }
}