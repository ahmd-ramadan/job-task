import { useState } from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";

const HomePage = () => {

    const [cartProductsCnt, setCartProductsCnt] = useState<number>(JSON.parse(localStorage.getItem('cartProductsCnt') || '0'));
    const updateCartProductsCnt = (cnt: number) => {
        const newCnt = cartProductsCnt + cnt;
        setCartProductsCnt(newCnt);
        localStorage.setItem('cartProductsCnt', newCnt.toString())
    }
    return (
        <div className="w-full min-h-100vh">
            <Header cartProductsCnt={cartProductsCnt} updateCartProductsCnt={updateCartProductsCnt}/>

            <HeroSection cartProductCnt={cartProductsCnt} updateCartProductsCnt={updateCartProductsCnt}/>
        </div>
    )
}

export default HomePage;