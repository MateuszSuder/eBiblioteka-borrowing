import internalFetcher from "../../http/internalFetcher.js";
import genericErrorResponse from "../../utils/genericErrorResponse.js";
import ROLES from "../../utils/roles.js";

/**
 * @typedef {'ADMIN' | 'LIBRARIAN' | 'USER'} Role
 */

/**
 * Middleware to authorize api route
 * @param {object} options
 * @param {null | Role} [options.role=null] Role to be required to be possible to access resource
 * @return {(function(e.Request, e.Response, e.NextFunction): void)|*}
 */
const withAuth = (options= {
    role: null
}) => {
    return async (req, res, next) => {
        const apiKey = req.header("X-API-KEY");
        if(apiKey === process.env.API_KEY) {
            req.apiKey = true;
            return next();
        } else {
            try {
                let cookies = "";
                for(const cookie in req.cookies) {
                    cookies += `${cookie}=${req.cookies[cookie]};`
                }

                const { payload } = await internalFetcher("auth", "POST", "authorize", {
                    headers: {
                        Cookie: cookies
                    }
                })

                const user = await internalFetcher("user", "GET", "", {
                    headers: {
                        Cookie: cookies
                    },
                    query: {
                        id: payload._id
                    },
                    key: true
                })

                if(options?.role) {
                    if(!user.role) return genericErrorResponse(res, null, 403);

                    if(ROLES[user.role] < ROLES[options.role]) return genericErrorResponse(res, null, 403);
                }

                if(user) {
                    if(user.isBanned) return genericErrorResponse(res, `Użytkownik zbanowany`, 403);
                    if(user.isDeleted) return genericErrorResponse(res, `Użytkownik usunięty`, 403);
                }

                req.user = user;
            } catch (e) {
                console.log(e);
                return genericErrorResponse(res, null, e.status || 500);
            }
        }

        next();
    }
}

export default withAuth;