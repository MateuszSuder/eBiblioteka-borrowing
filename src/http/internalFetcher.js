/**
 * @typedef FetchError
 * @type {object}
 * @property {Array<string>} errors errors which occurred
 * @property {number} status http status
 */

export const services = {
    auth: {
        name: process.env.AUTH_NAME,
        port: process.env.AUTH_PORT
    },
    user: {
        name: process.env.USER_NAME,
        port: process.env.USER_PORT
    },
    book: {
        name: process.env.BOOK_NAME,
        port: process.env.BOOK_PORT
    },
    reservation: {
        name: process.env.RESERVATION_NAME,
        port: process.env.RESERVATION_PORT
    },
    borrowing: {
        name: process.env.BORROWING_NAME,
        port: process.env.BORROWING_PORT
    },
    notification: {
        name: process.env.NOTIFICATION_NAME,
        port: process.env.NOTIFICATION_PORT
    },
}

/**
 * Parse content to json or text
 * @param {Response} response
 * @return {*}
 */
async function parseResponseContent(response) {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        return await response.json();
    } else {
        return await response.text();
    }
}

/**
 * Fetcher to create http request to other services
 * @param {"auth" | "user" | "book" | "reservation" | "borrowing" | "notification"} service service to which create request
 * @param {"POST" | "GET" | "PUT" | "DELETE"} method
 * @param {string} path endpoint path
 * @param [options] options for request
 * @param {object} [options.body]
 * @param {HeadersInit} [options.headers]
 * @param {boolean} [options.key]
 * @param {object} [options.query] query parameters
 * @throws {FetchError} on fetch error
 * @return {Promise<*>}
 */
export default async function internalFetcher(service, method, path, options) {
    let query = "";
    let optionsInit = {
        headers: {
            "Content-type": "application/json"
        }
    };

    if(options?.key) {
        optionsInit.headers["X-API-KEY"] = process.env.API_KEY;
    }

    if(options?.body) {
        optionsInit.body = JSON.stringify(options.body);
    }

    if(options?.headers) {
        optionsInit.headers = {
            ...optionsInit.headers,
            ...options.headers
        }
    }

    if(options?.query) {
        query = `?${new URLSearchParams(options.query).toString()}`
    }

    const response = await fetch(`http://${services[service].name}:${services[service].port}/${path}${query}`, {
        method,
        ...optionsInit
    });

    if(!response.ok) {
        throw {
            ...(await parseResponseContent(response)),
            status: response.status
        };
    }

    return await parseResponseContent(response);
}