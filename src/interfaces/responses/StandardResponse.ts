export interface StandardResponse<T> {
    standardResponse: {
        httpCode: number;
        message: string;
    };
    body: T | null;
}

export const createResponse = <T>(
    httpCode: number,
    message: string,
    body: T | null
): StandardResponse<T> => {
    return {
        standardResponse: {
            httpCode,
            message
        },
        body
    };
};