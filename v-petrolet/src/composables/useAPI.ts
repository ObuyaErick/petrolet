import { AxiosError, type AxiosResponse } from "axios";

// Types for the parameters
interface HandleRequestParams<T> {
  func: (...args: any[]) => Promise<AxiosResponse<T>>;
  // First argument is a url string followed by any other arguments depending on the 'func'
  args?: [string, ...any];
  headers?: Record<string, string>;
  successCallback?: (response: AxiosResponse<T>) => void;
  errorCallback?: (error: AxiosError) => void;
}

export interface RequestMessages {
  status: RequestStatus;
  statusCode: number | string;
  statusText: string | undefined;
  message: string;
}

export type RequestStatus = "ok" | "error";

export interface RequestSuccess<T> extends RequestMessages {
  status: "ok";
  result: T;
  errors?: undefined;
}

export interface RequestError extends RequestMessages {
  status: "error";
  errors: any;
  result?: undefined;
}

// Combine success and error result types
export type RequestResult<T> = RequestSuccess<T> | RequestError;

export default function useAPI() {
  const handleRequest = async <T>({
    func,
    args,
    headers = {},
    successCallback,
    errorCallback,
  }: HandleRequestParams<T>): Promise<RequestResult<T>> => {
    try {
      const response = await func(
        ...[
          args,
          {
            headers,
          },
        ].flat()
      );

      // Call a provided success callback if defined
      // and has a call signature
      if (typeof successCallback === "function") {
        successCallback(response);
      }

      return {
        status: "ok",
        statusCode: response.status,
        statusText: response.statusText,
        result: response.data,
        message: "Success",
      };
    } catch (error) {
      // Call a provided error callback if defined
      // and has a call signature
      if (typeof errorCallback === "function") {
        errorCallback(error as AxiosError);
      }

      const axiosError = error as AxiosError;
      if (axiosError.response?.status) {
        const statusCode = axiosError.response.status;
        // Server responded with an error code >= 400
        return {
          status: "error",
          statusCode: statusCode,
          statusText: axiosError.response.statusText,
          message: axiosError.message,
          errors: axiosError.response.data,
        };
      } else {
        // Request or Connection refused
        return {
          status: "error",
          statusCode: "unexpected",
          statusText: axiosError.response?.statusText,
          message: axiosError.message,
          errors: axiosError.message,
        };
      }
    }
  };

  return handleRequest;
}
