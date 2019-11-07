import {
    Request,
    Response,
    Router,
  } from 'express'
import {
    delAsync,
    getAsync,
    setAsync,
} from '../../utils/storage'

import IOrder from './orders.interface' // import depuis le répertoire courant
import OrderService from './orders.service'

export default class OrdersController {
    public path = '/orders'
    public pathID = '/orders/:id'
    public router = Router()
    public orderService = new OrderService()

    constructor() {
        this.intializeRoutes()
    }

    public intializeRoutes() {
        this.router.get(this.path, this.getAll)
        this.router.delete(this.path, this.deleteAll)
        this.router.post(this.path, this.create)
        this.router.get(this.pathID, this.getID)
        this.router.put(this.pathID, this.updateID)
        this.router.delete(this.pathID, this.deleteID)
    }

    /** -------------------------------------------------------------------------
     *                                 GET ALL
     *  -------------------------------------------------------------------------
     */

    public getAll = async (request: Request, response: Response) => {
        response.json(await this.orderService.getAll())
    }

    /** -------------------------------------------------------------------------
     *                                 DELETE ALL
     *  -------------------------------------------------------------------------
     */

    public deleteAll = async (request: Request, response: Response) => {
        response.json(await this.orderService.deleteAll())
    }

    /** -------------------------------------------------------------------------
     *                                 CREATE
     *  -------------------------------------------------------------------------
     */

    public create = async (request: Request, response: Response) => {
        response.json(await this.orderService.create(request.body))
    }

    /** -------------------------------------------------------------------------
     *                                 GET ID
     *  -------------------------------------------------------------------------
     */

    public getID = async (request: Request, response: Response) => {
        response.json(await this.orderService.getID(Number(request.params.id)))
    }

    /** -------------------------------------------------------------------------
     *                                 UPDATE ID
     *  -------------------------------------------------------------------------
     */

    public updateID = async (request: Request, response: Response) => {
        const tmp = await this.orderService.updateID(Number(request))
        if (tmp === false) {
            response.sendStatus(404)
        } else {
            response.sendStatus(204)
        }
    }

    /** -------------------------------------------------------------------------
     *                                 DELETE ID
     *  -------------------------------------------------------------------------
     */
    public deleteID = async (request: Request, response: Response) => {
        const tmp = await this.orderService.deleteID(Number(request.params.id))
        if (tmp === false) {
            response.sendStatus(404)
        } else {
            response.sendStatus(204)
        }
  }
}
