export interface ICart {
    products: ICartProduct[];
    subtotal: number
}

export interface ICartProduct {
    id: string;
    title: string;
    price: number;
    image: string;
    quantity: number
}

class Cart {
    
    constructor(){
        const localStorageCart = JSON.parse(localStorage.getItem("cart") as any);
        if(!localStorageCart) {
            localStorage.setItem("cart", JSON.stringify({
                products: [],
                subtotal: 0
            }))
            localStorage.setItem("cartProductsCnt", '0')
        };
    }

    getCart(){
        return JSON.parse(localStorage.getItem("cart") as any)
    }

    addProductToCart(product: ICartProduct){
        const cart: ICart = this.getCart();

        const products = cart?.products || [];

        let productFound = false;
        const newProducts = products.map((p: ICartProduct) => {
            if(p.id === product.id) {
                productFound = true;
                cart.subtotal += p.price * (product.quantity - p.quantity);
                return product;
            }
            else return p;
        })
        if(!productFound) {
            newProducts.push(product)
            cart.subtotal += product.price * product.quantity;
        }

        
        cart.subtotal = Number(cart.subtotal.toFixed(2))
        cart.products = newProducts;

        localStorage.setItem('cart', JSON.stringify(cart))

    }

    removeProductFromCart(product: ICartProduct){
        const cart: ICart = this.getCart();

        const products = cart?.products || [];

        const newProducts = products.filter((p: ICartProduct) => {
            if (p.id === product.id) {
                cart.subtotal -= (p.quantity * p.price);
                cart.subtotal = Number(cart.subtotal.toFixed(2))
                return false;
            } 
            else return true;
        })

        cart.products = newProducts;

        localStorage.setItem('cart', JSON.stringify(cart))

    }

    isProductExist(productId: string){
        const cart: ICart = this.getCart();
        return cart.products.some(p => p.id === productId)
    }

    getProductfromCart(productId: string){
        const cart: ICart = this.getCart();
        return cart.products.find(p => p.id === productId)
    }

    clear(){
        localStorage.setItem("cart", JSON.stringify({
            products: [],
            subtotal: 0
        }))
        localStorage.setItem("cartProductsCnt", '0')
    }
}

export const cartObject = new Cart();