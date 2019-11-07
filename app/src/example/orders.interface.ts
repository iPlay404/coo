export default interface IOrder {
    id: number
    packages: IPackage
    contact: IContact
    carrier: ICarrier
}

export interface IPackage {
    length: IMeasure
    width: IMeasure
    height: IMeasure
    weight: IMeasure
    products: IProducts
}

export interface IMeasure {
    unit: string
    value: number
}
export interface IProducts {
    quantity: number
    label: string
    ean: string
}

export interface IContact {
    firstname: string
    lastname: string
    phone: string
    mail: string
    billingAddress?: IAddress // ? ce paramètre signifie "optionnel"
    deliveryAddress?: IAddress
    headOfficeAddress?: IAddress
}

export interface IAddress {
    postalCode: string
    city: string
    addressLine1: string
    addressLine2: string
}
export interface ICarrier {
    name: string
    contact: IContact
}
