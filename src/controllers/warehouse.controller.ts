import { PaginationParams, ValidatedRequestBody, ValidatedRequestQuery, WarehouseModel } from '../models';
import { ValidatedRequest } from 'express-joi-validation';
import { ErrorService, getPaginationResponse } from '../utils';
import { WarehouseRepository } from '../repository';


export class WarehouseController {
    static async getAll(req: ValidatedRequest<ValidatedRequestQuery<PaginationParams>>, res) {
        try {
            let data = await WarehouseRepository.getAll(req.query);
            if (!data[0]) return res.send(null);

            if (req.query.limit && !isNaN(req.query.page))
                return res.send(await getPaginationResponse<WarehouseModel>(data, req.query.page, req.query.limit, Number(data[0].count)))


            return res.send(data);
        } catch (error) {
            return ErrorService.error(res, error);
        }
    }
    static async getById(req: ValidatedRequest<any>, res) {
        try {

            let data = await WarehouseRepository.getById(req.params.id);
            return res.send(data);
        } catch (error) {
            return ErrorService.error(res, error);
        }
    }
    static async create(req: ValidatedRequest<ValidatedRequestBody<WarehouseModel>>, res) {
        try {

            const data = await WarehouseRepository.create(req.body)

            return res.send(data);

        } catch (error) {
            return ErrorService.error(res, error);
        }
    }
    static async update(req: ValidatedRequest<ValidatedRequestBody<WarehouseModel>>, res) {
        try {
            req.body.id = req.params.id;

            let checkId = await WarehouseRepository.getById(req.params.id);
            let data = await WarehouseRepository.update(req.body);

            return res.send(data);
        } catch (error) {
            return ErrorService.error(res, error);
        }
    }

    static async delete(req: ValidatedRequest<any>, res) {
        try {

            await WarehouseRepository.delete(req.params.id);

            return res.send({ success: true });

        } catch (error) {
            return ErrorService.error(res, error);
        }
    }
}
