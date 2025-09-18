import { ShoppingCart, Store } from "lucide-react";
import { useState } from "react";
import Cart from "./Cart";
import Checkout from "./Checkout";

interface ICartProps {
    cartProductsCnt: number;
    updateCartProductsCnt: (cnt: number) => void
}

const Header = ({ updateCartProductsCnt, cartProductsCnt }: ICartProps) => {

    const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
    const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState<boolean>(false)


    return (
        <header
            className="sticky top-0 z-100 p-2 md:p-6 w-full flex gap-1 items-center justify-between"
        >
            <div
                className="flex items-center gap-1"
            >
                <Store className="text-[#116D6E] w-8 h-8"/>
                <h2 className="text-2xl font-bold text-[#116D6E]">Ahmed's Store</h2>
            </div>
            <div 
                className="flex items-center gap-1 relative"
            >
                <ShoppingCart 
                    className="cursor-pointer w-8 h-8"
                    onClick={() => setIsCartOpen(!isCartOpen)}
                />
                <span className="py-1 px-3 rounded-full bg-[#116D6E] absolute -top-6 -right-3">{cartProductsCnt}</span>
            </div>

            {isCartOpen && (
                <div
                    className="fixed inset-0 bg-transparent bg-opacity-50 z-40"
                    onClick={() => setIsCartOpen(false)}
                />
            )}

            {/* Cart */}
            { isCartOpen && <Cart 
                isCartOpen={isCartOpen}
                closeCart={() => setIsCartOpen(false)}
                cartProductsCnt={cartProductsCnt}
                updateCartProductsCnt={updateCartProductsCnt}
                isCheckoutModalOpen={isCheckoutModalOpen}
                setIsCheckoutModalOpen={setIsCheckoutModalOpen}
            />}

            { isCheckoutModalOpen && <Checkout setIsCheckoutModalOpen={setIsCheckoutModalOpen}/>}
        </header>
    )
}

export default Header;