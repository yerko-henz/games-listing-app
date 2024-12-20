"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(cart.length);
    };

    updateCartCount();

    window.addEventListener("cartUpdated", updateCartCount);

    return () => window.removeEventListener("cartUpdated", updateCartCount);
  }, []);

  return (
    <nav className="bg-page-bgPrimary p-4 flex justify-between items-center">
      <Link href="/" className="text-text-primary text-xl font-medium">
        GamerShop
      </Link>
      <div className="relative">
        <Link href="/cart" className="text-text-primary">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.9709 15.9883H6.99233C6.72752 15.9883 6.47356 15.8829 6.28631 15.6954C6.09906 15.5079 5.99387 15.2535 5.99387 14.9883C5.99387 14.7231 6.09906 14.4687 6.28631 14.2812C6.47356 14.0936 6.72752 13.9883 6.99233 13.9883H17.4163C18.0839 13.9883 18.7324 13.765 19.2589 13.3537C19.7853 12.9424 20.1594 12.3668 20.3219 11.7183L21.9693 5.22828C22.0067 5.08069 22.01 4.92649 21.9788 4.77745C21.9477 4.62841 21.883 4.48846 21.7896 4.36828C21.6925 4.24501 21.5678 4.14638 21.4255 4.08036C21.2833 4.01434 21.1275 3.9828 20.9709 3.98828H6.7527C6.5467 3.40473 6.16553 2.89928 5.66144 2.54122C5.15735 2.18316 4.55502 1.99002 3.93702 1.98828H2.99847C2.73366 1.98828 2.47969 2.09364 2.29244 2.28117C2.1052 2.46871 2 2.72306 2 2.98828C2 3.2535 2.1052 3.50785 2.29244 3.69539C2.47969 3.88292 2.73366 3.98828 2.99847 3.98828H3.93702C4.16511 3.98163 4.38859 4.05341 4.57026 4.19169C4.75193 4.32998 4.88082 4.52641 4.93549 4.74828L4.9954 5.22828L6.72275 11.9883C5.92832 12.0241 5.18063 12.3745 4.64416 12.9624C4.10769 13.5503 3.82639 14.3276 3.86214 15.1233C3.89789 15.9189 4.24776 16.6678 4.83478 17.2051C5.42181 17.7424 6.1979 18.0241 6.99233 17.9883H7.17206C7.00784 18.4414 6.95508 18.9275 7.01822 19.4054C7.08137 19.8833 7.25857 20.3389 7.53482 20.7336C7.81106 21.1284 8.17823 21.4507 8.60521 21.6731C9.03219 21.8956 9.50642 22.0118 9.98773 22.0118C10.469 22.0118 10.9433 21.8956 11.3703 21.6731C11.7972 21.4507 12.1644 21.1284 12.4406 20.7336C12.7169 20.3389 12.8941 19.8833 12.9572 19.4054C13.0204 18.9275 12.9676 18.4414 12.8034 17.9883H15.1598C14.9956 18.4414 14.9428 18.9275 15.006 19.4054C15.0691 19.8833 15.2463 20.3389 15.5225 20.7336C15.7988 21.1284 16.166 21.4507 16.5929 21.6731C17.0199 21.8956 17.4941 22.0118 17.9755 22.0118C18.4568 22.0118 18.931 21.8956 19.358 21.6731C19.785 21.4507 20.1521 21.1284 20.4284 20.7336C20.7046 20.3389 20.8818 19.8833 20.945 19.4054C21.0081 18.9275 20.9553 18.4414 20.7911 17.9883H20.9709C21.2357 17.9883 21.4896 17.8829 21.6769 17.6954C21.8641 17.5079 21.9693 17.2535 21.9693 16.9883C21.9693 16.7231 21.8641 16.4687 21.6769 16.2812C21.4896 16.0936 21.2357 15.9883 20.9709 15.9883ZM19.6928 5.98828L18.3848 11.2283C18.3302 11.4502 18.2013 11.6466 18.0196 11.7849C17.8379 11.9231 17.6144 11.9949 17.3864 11.9883H8.7696L7.2719 5.98828H19.6928ZM9.98773 19.9883C9.79025 19.9883 9.59721 19.9296 9.43301 19.8198C9.26881 19.7099 9.14084 19.5537 9.06527 19.371C8.9897 19.1882 8.96992 18.9872 9.00845 18.7932C9.04698 18.5992 9.14207 18.421 9.28171 18.2812C9.42135 18.1413 9.59926 18.0461 9.79294 18.0075C9.98662 17.9689 10.1874 17.9887 10.3698 18.0644C10.5523 18.1401 10.7082 18.2683 10.8179 18.4327C10.9276 18.5972 10.9862 18.7905 10.9862 18.9883C10.9862 19.2535 10.881 19.5079 10.6938 19.6954C10.5065 19.8829 10.2525 19.9883 9.98773 19.9883ZM17.9755 19.9883C17.778 19.9883 17.5849 19.9296 17.4207 19.8198C17.2565 19.7099 17.1286 19.5537 17.053 19.371C16.9774 19.1882 16.9577 18.9872 16.9962 18.7932C17.0347 18.5992 17.1298 18.421 17.2694 18.2812C17.4091 18.1413 17.587 18.0461 17.7807 18.0075C17.9744 17.9689 18.1751 17.9887 18.3576 18.0644C18.54 18.1401 18.6959 18.2683 18.8057 18.4327C18.9154 18.5972 18.9739 18.7905 18.9739 18.9883C18.9739 19.2535 18.8687 19.5079 18.6815 19.6954C18.4942 19.8829 18.2403 19.9883 17.9755 19.9883Z"
              fill="#585660"
            />
          </svg>
        </Link>
        {cartCount > 0 && (
          <span className="absolute bottom-0 left-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
