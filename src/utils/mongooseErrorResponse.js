import genericErrorResponse from "./genericErrorResponse.js";

/**
 * Create http error response when mongoose error
 * @param {e.Response} response
 * @param {Error.ValidationError } e error caught from mongoose
 */
export default function mongooseErrorResponse(response, e) {
    if(e.code && e.code === 11000) {
        if(e.keyValue) {
            const [key, value] = Object.entries(e.keyValue)[0];
            return genericErrorResponse(response, `Entry with key "${key}" and value "${value}" exists`, 409);
        } else {
            return genericErrorResponse(response, "Conflict", 409);
        }

    }
    const errors = [];

    for(const error in e.errors) {
        errors.push(e.errors[error].properties.message);
    }

    return genericErrorResponse(response, errors, 400);
}