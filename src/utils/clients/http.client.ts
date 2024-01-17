/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { ServerError } from '../errors/errors';

export class HttpClient {
  static async get<T>(url: string, query?: Record<string, unknown> | null): Promise<T> {
    return (
      
      await axios({
        method: 'get',
        url,
        params: query,
      }).catch((error) => {
        if (error?.response?.data) {
          throw new ServerError(error.response.data.status, error.response.data.message);
        }

        throw error;
      })
    ).data;
  }
}