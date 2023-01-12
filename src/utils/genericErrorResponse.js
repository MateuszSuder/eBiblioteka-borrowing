/**
 * Create http error response
 * @param {e.Response} response
 * @param {Array<string> | string | null} message
 * @param {number} status
 */
export default function genericErrorResponse(response, message, status) {
    if(!message) return response.status(status).send(null);

    if(!Array.isArray(message)) message = [message];

    return response.status(status).send({
        errors: message
    });
}