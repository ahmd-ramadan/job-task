
export interface IProduct {
    id: string;
    title: string;
    price: number;
    images: string[]
}

export class ProductClass {
    static async getFakeProducts(){
        try {
            const result = await fetch('https://dummyjson.com/products')
            const products = (await result.json()).products;
            return products.slice(0, 12);
        } catch(err) {
            console.log("Error ocuured when retrieved products", err)
        }
    }
}