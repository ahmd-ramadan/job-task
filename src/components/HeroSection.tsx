import { useEffect, useState } from "react"
import Product from "./Product";
import { ProductClass, type IProduct } from "../utils/product.class";

interface IHeroSectionProps {
    cartProductCnt: number;
    updateCartProductsCnt: (cnt: number) => void;
}

const HeroSection = ({ cartProductCnt, updateCartProductsCnt }: IHeroSectionProps ) => {

    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        const getProducts = async() => {
            const products =  await ProductClass.getFakeProducts();
            setProducts(products);
        }
        getProducts();
    }, [])

    const renderProducts = products.map((product, index) => {
        return <Product key={index} product={product} cartProductCnt={cartProductCnt} updateCartProductsCnt={updateCartProductsCnt}/>
    })
    
    return (
        <section
            className="flex flex-col gap-4"
        >
            {/* Welcome */}
            {/* <div
                className="w-full"
            >
                <p className="mx-auto text-2xl font-semibold text-green-600">Welcome here in my store 👋</p>
            </div> */}

            {/* Products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
                { renderProducts }
            </div>
        </section>
    )
}

export default HeroSection