import {
    delAsync,
    getAsync,
    setAsync,
} from '../../utils/storage'
import IOrder from './orders.interface'
import OrderBuilder from './orders.builder'

export default class OrderService {
    // la classe orderservice contient des fonctions de traitement

    /*
    orderBuilder = new OrderBuilder()

    const builderCarrier = this.orderBuilder.addCarrier()
    const builderContact = this.orderBuilder.addContact()
    const builderPackage = this.orderBuilder.addPackage()

    const getBuilder = this.orderBuilder.getOrder()
    */
    public parseJSON(str: string) {
        return JSON.parse(str)
    }

    /** -------------------------------------------------------------------------
     *                                 GET ALL
     *  -------------------------------------------------------------------------
     */
    public getAll = async () => {
        const res: string = await getAsync('orders')
        const orders: IOrder[] | [] = this.parseJSON(res) || []
        return orders
    }

    /** -------------------------------------------------------------------------
     *                                 CREATE
     *  -------------------------------------------------------------------------
     */
    public create = async (orderInformation: any) => {
        const currentOrder: any = orderInformation
        const rawOrders: string = await getAsync('orders')
        const orders: IOrder[] | [] = this.parseJSON(rawOrders) || []

        const sortedOrders: IOrder[] | [] = orders.sort((previous: IOrder, current: IOrder) => {
            return current.id - previous.id
        })

        // tslint:disable-next-line: radix
        const lastId: number = sortedOrders.length > 0 ? sortedOrders[0].id : 0
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
        return newOrders
    }

    public deleteAll = async () => {
        await delAsync('orders')
        return 'All has been deleted'
    }

    /** -------------------------------------------------------------------------
     *                                 GET ID
     *  -------------------------------------------------------------------------
     */
    public getID = async (idOrder: number) => {
        const id = Number(idOrder)
        const rawOrders: string = await getAsync('orders')
        const orders: IOrder[] | [] = this.parseJSON(rawOrders) || []

        // tslint:disable-next-line: triple-equals
        const foundOrder: IOrder = orders.find((order) => order.id == id)

        if (!foundOrder) {
            return false
        }

        return foundOrder
    }

    /** -------------------------------------------------------------------------
     *                                 UPDATE ID
     *  -------------------------------------------------------------------------
     */
    public updateID = async (orderInformation: any) => {
        const updateInformations: any = orderInformation.body
        const id = Number(orderInformation.params.id)

        const rawOrders: string = await getAsync('orders')
        const orders = this.parseJSON(rawOrders) || []
        // tslint:disable-next-line: triple-equals
        const orderToUpdate = orders.find((order: any) => order.id == id)

        if (!orderToUpdate) {
            return false
        }

        const updated = {
        ...orderToUpdate,
        ...updateInformations,
        }

        // tslint:disable-next-line: triple-equals
        const newOrders = orders.map((order: any) => order.id == updated.id ? updated : order)

        await setAsync('orders', JSON.stringify(newOrders))

        return 'id updated'
    }

    /** -------------------------------------------------------------------------
     *                                 DELETE ID
     *  -------------------------------------------------------------------------
     */
    public deleteID = async (idOrder: number) => {
        const id = Number(idOrder)
        const rawOrders: string = await getAsync('orders')
        const orders: IOrder[] | [] = this.parseJSON(rawOrders) || []
        // tslint:disable-next-line: triple-equals
        const orderToDelete: IOrder | null = orders.find((order) => order.id == id)

        if (!orderToDelete) {
            return false
        }

        const newOrders: IOrder[] = orders.filter((order) => order.id !== orderToDelete.id)
        await setAsync('orders', JSON.stringify(newOrders))

        return 'id deleted'
  }
}
