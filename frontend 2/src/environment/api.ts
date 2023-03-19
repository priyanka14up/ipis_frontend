import { APIEnvironment } from "./apienvironment";
import * as environment from "./environment.json";

export const apiEnv: APIEnvironment = APIEnvironment.DEV;
export const getAPIBaseUrl = (module: string): string => {
    // const baseUri = eval(`environment.baseAPIUrls.modules.${module}`);
    // return "https://ce98-139-5-18-82.in.ngrok.io/api/v1";
    return "http://localhost:8054/api/v1";

};

export const socketAPI = () => {
    return "http://localhost:8000";
};

