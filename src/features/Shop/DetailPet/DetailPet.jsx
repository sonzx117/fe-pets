import { Grid } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import renderHtml from "react-render-html";
import { useParams } from "react-router-dom";
import petApi from "../../../api/petApi";
import productApi from "../../../api/productApi";
import "../../../sass/Shop/DetailPet.scss";
import Banner from "../../Banner/Banner";
import Breadcrumbs from "../../Breadcrumbs/Breadcrumbs";
import Related from "../Related/Related";
import "./DetailPetJs";
import { ClickImg } from "./DetailPetJs";
import { cartplus, staricon } from "../../Admin/svg/IconSvg";
import Cart from "../../Home/Cart/Cart";
import {
  addListCart,
  updateListCart,
  resetCart,
} from "../../../app/Slice/CartSlide";
import { messageShowErr, messageShowSuccess } from "../../../function";
import LabTabs from "../Tabs/Tabs";
import { currencyFormatter } from "../../Utils/fotmat";

export default function DetailPet() {
  const [data, setData] = useState(null);
  const [load, setLoad] = useState(false);
  const [quantityNumber, setQuantityNumber] = useState(1);
  const listCart = useSelector((state) => state.cart.listCart);
  const [activeImage, setActiveImage] = useState(data?.avatar);



  function add() {
    setQuantityNumber((quantityNumber) => quantityNumber + 1);
    if (quantityNumber >= data?.quantity) {
      messageShowErr("Số lượng không đủ ");
      setQuantityNumber(quantityNumber)
    }
    
  }
  function sub() {
    if (quantityNumber > 1) {
      setQuantityNumber((quantityNumber) => quantityNumber - 1);
    }
  }
  const hangdleQuantityNumber = (e) => {
    let number = e.target.value;
    if (Number(number) !== isNaN && number > 0 && number <= data.quantity) {
      setQuantityNumber(Number(number));
    } else {
      messageShowErr("Lỗi nhập số lượng ");
      setQuantityNumber(0);
    }
  };
  const dispatch = useDispatch();

  const listBread = [
    { name: "Trang chủ", link: "/" },
    { name: "Cửa hàng", link: "/Shop" },
    { name: data?.name },
  ];

  const { id, type } = useParams();
  const imgActiveEl = useRef(null);
  const listImgEl = useRef(null);

  useEffect(() => {
    if (type === "pet") {
      petApi.getOne(id).then((ok) => {
        setData(ok);
      });
    } else {
      productApi.getOne(id).then((ok) => {
        setData(ok);
      });
    }
    window.scrollTo(0, 0);
  }, [load]);

  // useEffect(() => {
  //   ClickImg(imgActiveEl.current, listImgEl.current);
  // }, [data]);

  const handleAddCart = (infor) => {
    let isExist = listCart.find(
      (x) => x.id === infor.id && x.name === infor.name
    );
    infor = { ...infor, quantityCurrent: quantityNumber };

    if (isExist) {
      if (isExist.quantityCurrent !== quantityNumber) {
        dispatch(updateListCart(infor));
        messageShowSuccess("Cập nhật số lượng thành công!");
      } else {
        messageShowErr("Sản phẩm đã có trong giỏ hàng!");
      }
    } else {
      if (data.quantity > 0) {
        if (quantityNumber !== 0) {
          dispatch(addListCart(infor));
          messageShowSuccess("Thêm giỏ hàng thành công!");
        } else {
          messageShowErr("Thêm giỏ hàng thất bại!! Nhập lại");
        }
      } else {
        messageShowErr("Sản phẩm đã hết hàng");
      }     
    }
  };
 // Ban đầu hiển thị hình ảnh chính
 
  const handleImageHover = (imageSrc) => {
    setActiveImage(imageSrc);
  };
  console.log(data)


  return (
    <div className="DetailPet">
      <Banner />
      <Breadcrumbs breadCrumbList={listBread} />
      <div className="container">
        <Grid
          container
          spacing={3}
          style={{ backgroundColor: "white", borderRadius: "5px" }}
        >
          <Grid item lg={5} md={5} sm={5} xs={12}>
            <div className="product-img">
              <div className="img-active">
                <img
                  loading="lazy"
                  src={activeImage ? activeImage : data?.avatar}
                  alt=""
                  ref={imgActiveEl}
                />
              </div>
              <div className="list-img" >
                <div className="img" onMouseEnter={() => handleImageHover(data?.avatar)}>
                  <img loading="lazy" src={data?.avatar} alt="" />
                </div>
                {type === "pet"
                  ? data?.imgpet?.map((ok, index) => (
                      <div className="img" key={index} onMouseEnter={() => handleImageHover(ok.link)}>
                        <img loading="lazy" src={ok?.link} alt="" />
                      </div>
                    ))
                  : data?.imgproduct?.map((ok, index) => (
                      <div className="img" key={index} onMouseEnter={() => handleImageHover(ok.link)}>
                        <img loading="lazy" src={ok?.link} alt="" />
                      </div>
                    ))}
              </div>
            </div>
      
          </Grid>
          <Grid item lg={7} md={7} sm={7} xs={12}>
            <div className="item-content">
              <div className="name">{data?.name}</div>
              <div>
              <span className="icon-star">{staricon}</span>
              <span className="icon-star">{staricon}</span>
              <span className="icon-star">{staricon}</span>
              <span className="icon-star">{staricon}</span>
              <span className="icon-star">{staricon}</span>
             
              </div>
              <div className="price">
                <div className="price2">
                  {currencyFormatter.format(data?.price)}
                </div>
              </div>
              
              <div className="high-light">
                <div className="title">Điểm nổi bật</div>
                <div className="content">
                  {renderHtml(data ? data.text : "")}
                </div>
              </div>
              <div className="quantity">
                
                <div className="title">
                  Tags: 
                
                
                {data?.Tags ?  
                  data?.Tags?.map((ok, index) => (
                 <span className="tags" key={index}>{ok?.name }</span>
                  ))
                    :<span className="tags">{data?.type}</span>}
                </div>
              
                <div className="title">Số lượng: {data?.quantity ? data?.quantity : <p className="sold-out">Cháy hàng</p>}</div>
                <div className="soluong">
                <div className="title">
                  Nhập số lượng muốn mua:
                  
                </div>
                <div class="input-number-group">
                    <div class="input-group-button">
                      <span class="input-number-decrement" onClick={() => sub()} >-</span>
                    </div>
                    <input
                      class="input-number"
                      type="number"
                      value={quantityNumber}
                      onChange={hangdleQuantityNumber}
                    />
                    <div class="input-group-button">
                      <span class="input-number-increment" onClick={() => add()}  >+</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="button">
              
                <div className="add-cart" onClick={() => handleAddCart(data)}>
                  <span className="icon-cart">{ cartplus}</span>Thêm vào giỏ
                </div>
                <div className="buy"  >Mua ngay</div>
              </div>
             
            </div>
          
          </Grid>
        </Grid>
        <Grid
          container
          spacing={3}
          style={{
            backgroundColor: "white",
            borderRadius: "5px",
            marginTop: "3rem",
          }}
        >
          <LabTabs description={data?.description}/>
        </Grid>
        <Grid
          container
          spacing={3}
          style={{
            backgroundColor: "white",
            borderRadius: "5px",
            marginTop: "3rem",
          }}
        >
          <Related
            type={data?.type}
            id={id}
            load={load}
            onLoad={() => {
              setLoad(!load);
            }}
          ></Related>
        </Grid>
      </div>
    </div>
  );
}
