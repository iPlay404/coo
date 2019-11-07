import {
    Request,
    Response,
    Router,
  } from 'express'
import {
    getAsync,
    setAsync,
    delAsync,
} from '../../utils/storage'

export default class OrdersController {
    public path = '/orders'
    public pathID = '/orders/:id'
    public router = Router()

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
        const res = await getAsync('orders')
        response.json([JSON.parse(res)])
    }

    /** -------------------------------------------------------------------------
     *                                 DELETE ALL
     *  -------------------------------------------------------------------------
     */

    public deleteAll = async (request: Request, response: Response) => {
        response.json([await delAsync('orders')])
    }

    /** -------------------------------------------------------------------------
     *                                 CREATE
     *  -------------------------------------------------------------------------
     */

    public create = async (request: Request, response: Response) => {
            let currentOrder = request.body
            const rawOrders = await getAsync('orders')
            const orders: any[] = JSON.parse(rawOrders) || []

            const sortedOrders = orders.sort((previous: any, current: any) => {
                return current.id - previous.id
            })
            const lastId = sortedOrders.length > 0 ? sortedOrders[0].id : 0
            // condition ? valeurSiConditionVraie : valeurSiConditionFausse

            // Generate automatic data
            currentOrder = {
                ...currentOrder,
                id: lastId + 1,
                createAt: new Date(),
            }

            // On le push dans le tableau d'orders
            orders.push(currentOrder)
            await setAsync('orders', JSON.stringify(orders))
            response.status(201).json(currentOrder)
    }

    /** -------------------------------------------------------------------------
     *                                 GET ID
     *  -------------------------------------------------------------------------
     */

    public getID = async (request: Request, response: Response) => {
        const rawOrders = await getAsync('orders')
        const orders: any[] = JSON.parse(rawOrders) || []
        let ID = request.params.id
        // tslint:disable-next-line: only-arrow-functions
        orders.forEach(function(element) {
            if (element.id == ID) {
                response.json(element)
            }
          })
    }

    /** -------------------------------------------------------------------------
     *                                 UPDATE ID
     *  -------------------------------------------------------------------------
     */

    public updateID = async (request: Request, response: Response) => {
        const updateInformations: any = request.body
        const ID = request.params.id
        const rawOrders = await getAsync('orders')
        const orders: any[] = JSON.parse(rawOrders) || []
        const orderToUpdate: any = orders.find((order) => order.id == ID)
        let result = orders.filter(order => order.id != ID)

        if (!orderToUpdate) {
            return response.sendStatus(404)
        }

        const newOrders: any[] = orders.map((order: any) => {
            if (order.id === orderToUpdate.id) {
                return {
                    ...order,
                    ...updateInformations,
                }
            } else {
                return order
            }
        })
        await setAsync('orders', JSON.stringify(newOrders))
        response.sendStatus(204)
    }

    /** -------------------------------------------------------------------------
     *                                 DELETE ID
     *  -------------------------------------------------------------------------
     */
    public deleteID = async (request: Request, response: Response) => {
        let ID = request.params.id
        const rawOrders = await getAsync('orders')
        const orders: any[] = JSON.parse(rawOrders) || []
        // tslint:disable-next-line: only-arrow-functions
        let result = orders.filter(order => order.id != ID)
        await setAsync('orders', JSON.stringify(result))
        response.status(201).json('Element ' + ID + ' deleted')
    }
}
