import jwt from 'jsonwebtoken';
import { UnauthenticatedError } from '../errors/index.js';

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError('Authentication Invalid')
    }
    
    const token = authHeader.split(' ')[1];

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