import { PaginationParams, ValidatedRequestBody, ValidatedRequestQuery, BoxofficeModel } from '../models';
import { ValidatedRequest } from 'express-joi-validation';
import { ErrorService, getPaginationResponse } from '../utils';
import { BoxofficeRepository } from '../repository';


export class BoxofficeController {
    static async getAll(req: ValidatedRequest<ValidatedRequestQuery<PaginationParams>>, res) {
        try {
            let data = await BoxofficeRepository.getAll(req.query);
            if (!data[0]) return res.send(null);

            if (req.query.limit && !isNaN(req.query.page))
                return res.send(await getPaginationResponse<BoxofficeModel>(data, req.query.page, req.query.limit, Number(data[0].sales_count)))


            return res.send(data);
        } catch (error) {
            return ErrorService.error(res, error);
        }
    }
    static async getById(req: ValidatedRequest<any>, res) {
        try {

            let data = await BoxofficeRepository.getById(req.params.id);
            return res.send(data);
        } catch (error) {
            return ErrorService.error(res, error);
        }
    }
    static async create(req: ValidatedRequest<ValidatedRequestBody<BoxofficeModel>>, res) {
        try {

            const data = await BoxofficeRepository.create(req.body)

            return res.send(data);

        } catch (error) {
            return ErrorService.error(res, error);
        }
    }
    static async update(req: ValidatedRequest<ValidatedRequestBody<BoxofficeModel>>, res) {
        try {
            req.body.id = req.params.id;

            let checkId = await BoxofficeRepository.getById(req.params.id);
            let data = await BoxofficeRepository.update(req.body);

            return res.send(data);
        } catch (error) {
            return ErrorService.error(res, error);
        }
    }

    static async delete(req: ValidatedRequest<any>, res) {
        try {

            await BoxofficeRepository.delete(req.params.id);

            return res.send({ success: true });

        } catch (error) {
            return ErrorService.error(res, error);
        }
    }
}
