class Responder {
    constructor() {}

    successResponse = (res, data, status = 200) => {
        res.status(status).send({ status: 'Success', payload: data });
    };
    
    errorResponse = (res, error, status = 500) => {
        res.status(status).send({ status: 'Error', error: error });
    };
}

export const responder = new Responder();