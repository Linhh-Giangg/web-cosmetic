function getEle(id) {
  return document.getElementById(id);
}

const htmlGlobal = function () {
  this.products = JSON.parse(localStorage.getItem("danhSachSanPham")) || [];
  //chức năng tìm kiếm
  this.caseCart = JSON.parse(localStorage.getItem("add_cart")) || [];
  this.countCart = 0;
  this.findIndex1 = function (values) {
    // id[0] la id id[1] la name
    // let id = values.split("+");

    let a = null;
    // let finds = []

    this.products.forEach((datas) => {
      datas.lstProduct.forEach((item) => {
        if (item.id === values) a = item;
        return;
      });
    });
    return a;
  };
  window.addEventListener("click", (e) => {
    let { id } = e.target;

    let a = this.findIndex1(id);

    let index1 = -1;
    if (a) {
      let findI = -1;
      this.caseCart.forEach((item, index) => {
        findI = item.products.findIndex((data) => data.id === a.id);
        if (findI > -1) {
          index1 = index;
        }
      });
      if (findI > -1) {
        this.caseCart[index1].amount++;
      } else {
        let obProduct = { products: [], amount: 1 };

        obProduct.products.push(a);
        this.caseCart.push(obProduct);
      }

      this.countCart++;

      localStorage.setItem("add_cart", JSON.stringify(this.caseCart));

      getEle("count-cart").innerHTML = this.countCart;
    }
  });
  this.renderItem = function () {
    let content = "";
    this.products.forEach((datas) => {
      let { name, lstProduct } = datas;
      content += `
      <div class="title ">
      <div class="main-title" >
      <p class="topic" id="category">${name}</p> 
      
      <div class="slick-carousel row  " id="gia" >
      ${lstProduct.map(
        (item) =>
          `
                  <div class=" col-lg-3 col-md-4 col-xl-3 col-sm-6">
                  
                <img class="images" src="/assets/img/${item.image}" alt="">
                <div  class="items-name " >
                
                <i style="font-size:1.75rem" id=${item.id} class="ion-ios-plus">
                </i>${item.name_product}
                </div>
                <div   class="price items-name">${item.price}</div>
               
              </div>`
      )} 
             
            </div> 
       
          </div>
        </div>`;
    });
    return content;
  };
};
export default htmlGlobal;
