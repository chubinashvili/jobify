import jwt from 'jsonwebtoken';
import { UnauthenticatedError } from '../errors/index.js';

const auth = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        throw new UnauthenticatedError('Authentication Invalid');
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        
        const testUser = payload.userId === '6394a57e04071c7ed84c7218';

        req.user = { userId: payload.userId, testUser };
        next();
    } catch (err) {
        throw new UnauthenticatedError('Authentication Invalid')
    }
}

export default auth;