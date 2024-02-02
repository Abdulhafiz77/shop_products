/* import { UNAUTHORIZED } from 'http-status-codes';
import {
     ValidatedRequest, ErrorEnum, ProductModel
} from '../models/index';
import redisService from './redis.service';
import { ErrorService } from './error.service';

export const checkToken = async (req: ValidatedRequest<any>, res, next) => {
    try {
        let authorization = null;
        if (req.headers && req.headers.authorization) {
            authorization = req.headers.authorization.split(' ')[1];
        }

        if (!authorization) return ErrorService.error(res, ErrorEnum.token, UNAUTHORIZED);

        const decode = await JwtService.verify(authorization);
        if (!decode) return ErrorService.error(res, ErrorEnum.Unauthorized, UNAUTHORIZED);

        const product = await redisService.get<ProductModel>(String(decode.id), authorization);
        if (!product) return ErrorService.error(res, ErrorEnum.Unauthorized, UNAUTHORIZED);
        else {
            req.product = product!;
            next();
        }

    } catch (error) {
        ErrorService.error(res, ErrorEnum.Unauthorized, UNAUTHORIZED)
    }
}
 */