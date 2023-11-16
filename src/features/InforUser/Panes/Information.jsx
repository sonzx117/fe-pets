import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getMale } from "../../../function";
import "../../../sass/InforUser/Information.scss";
export default function Information() {
    const [data, setData] = useState(null);
    const userInfor = useSelector((state) => state.user.userInfor);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    console.log(userInfor)
    const avatarAfter =
        "https://cdn.pixabay.com/photo/2016/11/22/23/18/kingfisher-1851127_960_720.jpg";
    return (
        <div className="tab-pane">
            <div className="information">
                <div className="avatar">
                    <img loading="lazy" src={userInfor?.avatar === null ? avatarAfter : userInfor?.avatar  } alt="" />
                </div>
                <div className="title">
                    <div className="name">
                        {userInfor?.firstName} {userInfor?.lastName}
                    </div>
                    <div className="line"></div>
                    <div className="title-content">
                        <div className="left">
                            <div className="text">Địa chỉ: {userInfor?.address}</div>
                            <div className="text">Email: {userInfor?.email}</div>
                        </div>
                        <div className="right">
                            <div className="text">Số điện thoại: {userInfor?.phone}</div>
                            <div className="text">Giới tính: {getMale(userInfor?.male)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
