import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../../sass/Home/Menu.scss";
import {
    bar,
    iconLogin,
    iconLogout,
    search,
    userHome,
} from "../../Admin/svg/IconSvg";
import Cart from "../Cart/Cart";
import logono from '../../../images/lognobg.png'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function Menu({ user, setUserMenu }) {
    console.log("user", user);
    const [openSelect, setOpenSelect] = useState("hident");
    const [initSelect, setinitSelect] = useState("none");
    const MenuEl = useRef(null);
    const MenuHidentEl = useRef(null);
    const MenuBarEl = useRef(null);
    const history = useHistory();

    const ClickAvatar = () => {
        setinitSelect("flex");
        setOpenSelect(openSelect === "hident" ? "" : "hident");
    };

    const selectEL = useRef(null);

    useEffect(() => {
        // menuJs(MenuEl.current, MenuHidentEl.current, MenuBarEl.current);
        let menuHide = MenuHidentEl.current;
        let menuBar = MenuBarEl.current;
        let Menu = MenuEl.current;
        let indexShowMenu = "khong";

        const resizeMenu = (n) => {
            if (n <= 937) {
                menuHide.style.height = "0px";
                indexShowMenu = "khong";
            } else {
                menuHide.style.height = "auto";
                indexShowMenu = "co";
            }
        };
        menuBar.onclick = () => {
            clickBar();
        };
        const clickBar = () => {
            if (indexShowMenu === "khong") {
                menuHide.style.height = "350px";
                indexShowMenu = "co";
            } else {
                menuHide.style.height = "0";
                indexShowMenu = "khong";
            }
        };
        const scrollDestop = () => {
            if (window.pageYOffset >= 16) {
                Menu.classList.add("menu-scroll");
            } else {
                Menu.classList.remove("menu-scroll");
            }
        };
        const resizeDestop = () => {
            var widthScreen = window.innerWidth;
            resizeMenu(widthScreen);
        };
        window.addEventListener("scroll", scrollDestop);
        window.addEventListener("resize", resizeDestop);
        return () => {
            window.removeEventListener("resize", resizeDestop);
            window.removeEventListener("scroll", scrollDestop);
        };
    }, []);

    const handleLogout = () => {
        setUserMenu();
        history.push("/login");
    };
 
    const avatarDefault =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWalCQZajCWwnxKEE86RcbGh2i1XxEQ9Jkxt6ijNjm1CrvdnYilpInfHHVeriUng58IBo&usqp=CAU";
        const avatarAfter =
        "https://cdn.pixabay.com/photo/2016/11/22/23/18/kingfisher-1851127_960_720.jpg";

    return (
        <div className="Menu" ref={MenuEl}>
            <div className="menu-logo">
                <div className="logo">
                    <Link to="/">Pets Shop</Link>
                </div>
            </div>
            <div className="menu-bar" ref={MenuBarEl}>
                <div className="icon-bar">{bar}</div>
            </div>
            <div id="menu-hide" ref={MenuHidentEl} style={{ display: "flex" }}>
                <div className="menu-item">
                    <div className="list-item">
                        <ul>
                            <li className="item">
                                <Link to="">Trang chủ</Link>
                            </li>
                            <li className="item">
                                <Link to="/Shop">Cửa hàng</Link>
                            </li>
                            <li className="item">
                                <Link to="/Services">Dịch vụ</Link>
                            </li>
                            <li className="item">
                                <Link to="/ListNews">Tin tức</Link>
                            </li>
                            {user?.role === "admin" && (
                                <li className="item">
                                    <Link to="/Admin">Admin</Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
                <div className="menu-account">
                    {/* <div className="search">
                        <input type="text" name="" placeholder="Tìm kiếm" id="" />
                        <div className="icon">{search}</div>
                    </div> */}
                    <div className="avatar" onClick={ClickAvatar}>
                        <img loading="lazy" src={user.length === 0 ? avatarDefault : user.avatar === null ? avatarAfter : user.avatar} alt="" />
                    </div>
                    <Cart />
                    {openSelect === "" && (
                        <div className="blur" onClick={ClickAvatar}></div>
                    )}
                    <div
                        className={`select ${openSelect}`}
                        style={{ display: `${initSelect}` }}
                        ref={selectEL}
                    >
                        {user.length === 0 ? (
                            <ul>
                                <li>
                                    <Link to="/login" onClick={ClickAvatar}>
                                        <div className="icon">{iconLogin}</div>
                                        <div className="text">Đăng nhập</div>
                                    </Link>
                                </li>
                            </ul>
                        ) : (
                            <ul>
                                <li>
                                    <Link to={`/InforUser/${user.id}`} onClick={ClickAvatar}>
                                        <div className="icon">{userHome}</div>
                                        <div className="text">Thông tin </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="#"
                                        onClick={() => {
                                            localStorage.removeItem("tokenPet");
                                            handleLogout();
                                            ClickAvatar();
                                        }}
                                    >
                                        <div className="icon">{iconLogout}</div>
                                        <div className="text">Đăng xuất</div>
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
