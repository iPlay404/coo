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
        //const res = await getAsync('orders')
        //response.json([JSON.parse(res)])

        const res: string = await getAsync('orders')
        const orders: IOrder[] | [] = JSON.parse(res) || []
        response.json(orders)
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
            const currentOrder: any = request.body
            const rawOrders: string = await getAsync('orders')
            const orders: IOrder[] | [] = JSON.parse(rawOrders) || []

            const sortedOrders: IOrder[] | [] = orders.sort((previous: any, current: any) => {
                return current.id - previous.id
            })

            // tslint:disable-next-line: radix
            const lastId: number = sortedOrders.length > 0 ? parseInt(sortedOrders[0].id) : 0
            // condition ? valeurSiConditionVraie : valeurSiConditionFausse

            // Generate automatic data
            const orderToSave: IOrder = {
                ...currentOrder,
                id: lastId + 1,
                createdAt: new Date(),
              }

            // On le push dans le tableau d'orders
            const newOrders: IOrder[] = [...orders, orderToSave]
            await setAsync('orders', JSON.stringify(newOrders))
            response.status(201).json(orderToSave)
    }

    /** -------------------------------------------------------------------------
     *                                 GET ID
     *  -------------------------------------------------------------------------
     */

    public getID = async (request: Request, response: Response) => {
        const id = request.params.id
        const rawOrders: string = await getAsync('orders')
        const orders: IOrder[] | [] = JSON.parse(rawOrders) || []

        // tslint:disable-next-line: triple-equals
        const foundOrder: IOrder = orders.find((order) => order.id == id)

        if (!foundOrder) {
        return response.sendStatus(404)
        }

        response.json(foundOrder)
    }

    /** -------------------------------------------------------------------------
     *                                 UPDATE ID
     *  -------------------------------------------------------------------------
     */

    public updateID = async (request: Request, response: Response) => {
        const updateInformations: any = request.body
        const id = request.params.id

        const rawOrders: string = await getAsync('orders')
        const orders = JSON.parse(rawOrders) || []
        // tslint:disable-next-line: triple-equals
        const orderToUpdate = orders.find((order: any) => order.id == id)

        if (!orderToUpdate) {
        return response.sendStatus(404)
        }

        const updated = {
        ...orderToUpdate,
        ...updateInformations,
        }

        // tslint:disable-next-line: triple-equals
        const newOrders = orders.map((order: any) => order.id == updated.id ? updated : order)

        await setAsync('orders', JSON.stringify(newOrders))

        response.sendStatus(204)
    }

    /** -------------------------------------------------------------------------
     *                                 DELETE ID
     *  -------------------------------------------------------------------------
     */
    public deleteID = async (request: Request, response: Response) => {
        const id = request.params.id
        const rawOrders: string = await getAsync('orders')
        const orders: IOrder[] | [] = JSON.parse(rawOrders) || []
        // tslint:disable-next-line: triple-equals
        const orderToDelete: IOrder | null = orders.find((order) => order.id == id)

        if (!orderToDelete) {
        return response.sendStatus(404)
        }

        const newOrders: IOrder[] = orders.filter((order) => order.id !== orderToDelete.id)
        await setAsync('orders', JSON.stringify(newOrders))

        response.sendStatus(204)
  }
}
