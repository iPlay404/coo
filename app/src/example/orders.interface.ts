export default interface Order {
    id: string;
    packages: Package[]
    contact: Contact[]
    carrier: Carrier[]
}

interface Package {
    length: Measure[]
    width: Measure[]
    height: Measure[]
    weight: Measure[]
    products: Products[]
}

interface Measure {
    unit: string
    value: number
}
interface Products {
    quantity: number
    label: string
    ean: string
}

interface Contact {
    firstname: string
    lastname: string
    phone: string
    mail: string
    billingAddress?: Address[] // ? ce paramètre signifie "optionnel"
    deliveryAdress?: Address[]
    headOfficeAddress?: Address[]
}

interface Address {
    postalCode: string
    city: string
    addressLine1: string
    addressLine2: string
}
interface Carrier {
    name: string
    contact: Contact[]
}
