export interface ICheckoutForm {
    name: string;
    phoneNumber: string;
    city: AllCitiesEnum;
    address: string;
    notes?: string;
}


export const AllCitiesEnum = {
    CAIRO: "Cairo",
    GIZA: "Giza",
    MINIA: "Minia",
    SOHAG: "Sohag"
} as const;

export const AllCitiesCost = {
    Cairo: 120,
    Giza: 100,
    Minia: 50,
    Sohag: 60
} as const;


export type AllCitiesEnum = typeof AllCitiesEnum[keyof typeof AllCitiesEnum];
export const AllCities: AllCitiesEnum[] = Object.values(AllCitiesEnum);

export class CheckoutClass {

    static checkout(data: ICheckoutForm) { 
        const orderId = this.generateUnigeId();
        console.log("Order created: \n", orderId, data)
    }

    static generateUnigeId() {
        const date = new Date();
        const year = new Date(date).getFullYear()
        const month = new Date(date).getMonth()
        const day = new Date(date).getDay()
        return `ORD-${year}-${month}-${day}-${(Math.random() * 1000000).toFixed(0)}`
    }
}