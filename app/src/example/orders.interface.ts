export default interface IOrder {
    id: number
    packages: IPackage[]
    contact: IContact[]
    carrier: ICarrier[]
}

interface IPackage {
    length: IMeasure[]
    width: IMeasure[]
    height: IMeasure[]
    weight: IMeasure[]
    products: IProducts[]
}

interface IMeasure {
    unit: string
    value: number
}
interface IProducts {
    quantity: number
    label: string
    ean: string
}

interface IContact {
    firstname: string
    lastname: string
    phone: string
    mail: string
    billingAddress?: IAddress[] // ? ce paramètre signifie "optionnel"
    deliveryAdress?: IAddress[]
    headOfficeAddress?: IAddress[]
}

interface IAddress {
    postalCode: string
    city: string
    addressLine1: string
    addressLine2: string
}
interface ICarrier {
    name: string
    contact: IContact[]
}
