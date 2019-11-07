// tslint:disable
import IOrder from './orders.interface'
import {
    IAddress,
    ICarrier,
    IContact,
    IMeasure,
    IPackage,
    IProducts,
} from './orders.interface'

export default class OrderBuilder {
    public order: IOrder

    // tslint:disable-next-line: max-line-length
    public addPackages(lengthUnit: string, lengthValue: number, widthUnit: string, widthValue: number, heightUnit: string, heightValue: number, weightUnit: string, weightValue: number, productsQuantity: number, productsLabel: string, productsEan: string){
		let packages: IPackage
		
		packages = {
			length: this.addMeasure(lengthUnit, lengthValue),
			width: this.addMeasure(widthUnit, widthValue),
			height: this.addMeasure(heightUnit, heightValue),
			weight: this.addMeasure(weightUnit, weightValue),
			products: this.addProduct(productsQuantity, productsLabel, productsEan)
		}

		this.order = {
            id: this.order.id,
			contact: this.order.contact,
			packages: packages,
			carrier : this.order.carrier
		}
	}
    
    
	// tslint:disable-next-line: max-line-length
    public addContact(firstname: string,  lastname: string, phone: string, mail: string, 
        billingAddressPostalCode: string, billingAddressCity: string, billingAddressLine1: string, billingAddressLine2: string,
        deliveryAdressPostalCode: string, deliveryAdressCity: string, deliveryAdressLine1: string, deliveryAdressLine2: string,
        headOfficeAddressPostalCode: string, headOfficeAddressCity: string, headOfficeAddressLine1: string, headOfficeAddressLine2: string,){
        
        let contacts: IContact

		contacts = { 
			firstname: firstname,
			lastname: lastname,
			phone: phone,
			mail: mail,
			billingAddress: this.addAddress(billingAddressPostalCode, billingAddressCity, billingAddressLine1, billingAddressLine2),
            deliveryAddress: this.addAddress(deliveryAdressPostalCode, deliveryAdressCity, deliveryAdressLine1, deliveryAdressLine2),
            headOfficeAddress: this.addAddress(headOfficeAddressPostalCode, headOfficeAddressCity, headOfficeAddressLine1, headOfficeAddressLine2)
		}

		this.order = {
            id: this.order.id,
			contact: contacts,
			packages: this.order.packages,
			carrier: this.order.carrier
		}
	}


	// tslint:disable-next-line: max-line-length
	public addCarrier(firstname: string,  lastname: string, phone: string, mail: string, 
        billingAddressPostalCode: string, billingAddressCity: string, billingAddressLine1: string, billingAddressLine2: string,
        deliveryAdressPostalCode: string, deliveryAdressCity: string, deliveryAdressLine1: string, deliveryAdressLine2: string,
        headOfficeAddressPostalCode: string, headOfficeAddressCity: string, headOfficeAddressLine1: string, headOfficeAddressLine2: string,){
        
        let carriers: ICarrier

		carriers = {
			name: name,	
            contact: this.addContact(firstname, lastname, phone, mail,
                billingAddressPostalCode, billingAddressCity, billingAddressLine1, billingAddressLine2,
                deliveryAdressPostalCode, deliveryAdressCity, deliveryAdressLine1, deliveryAdressLine2,
                headOfficeAddressPostalCode, headOfficeAddressCity, headOfficeAddressLine1, headOfficeAddressLine2)
		}

		this.order = {
            id: this.order.id,
			contact: this.order.contact,
			packages: this.order.packages,
			carrier: carriers
		}
    }
    
    private addMeasure(unit: string, value: number): IMeasure {
		let measure: IMeasure

		measure = {
			unit: unit,
			value: value
		}

		return measure
	}

	private addAddress(postalCode: string, city: string, addressLine1: string, addressLine2: string): IAddress {
		let address: IAddress
		
		address = {
		    postalCode: postalCode,
			city: city,
			addressLine1: addressLine1,
			addressLine2: addressLine2
		}

		return address
	}

	private addProduct(quantity: number, label: string, ean: string): IProducts {
		let products: IProducts
		
		products = {
			quantity: quantity,
			label: label,
			ean: ean
		}

		return products
	}

	public getOrder(): IOrder {
		return this.order
	}

	
}
