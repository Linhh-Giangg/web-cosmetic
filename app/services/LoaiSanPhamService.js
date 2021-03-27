function LoaiSanPhamService() {
  this.themLoaiSanPham = function (themLoaiSanPham) {
    return axios({
      method: "POST",
      url: "http://localhost:3000/api/v1/category/",
      data: themLoaiSanPham,
    });
  };

  this.layDanhSachLoaiSanPham = function () {
    return axios({
      method: "GET",
      url: "http://localhost:3000/api/v1/category/",
    });
  };

  this.xoaLoaiSanPham = function (id) {
    return axios({
      method: "DELETE",
      url: `http://localhost:3000/api/v1/category/${id}`,
    });
  };

  this.layThongTinLoaiSanPham = function (id) {
    return axios({
      method: "GET",
      url: `http://localhost:3000/api/v1/category/${id}`,
    });
  };

  this.layTenLoaiSanPham = function (name) {
    return axios({
      method: "GET",
      url: `http://localhost:3000/api/v1/category/name`,
    });
  };

  this.capNhatLoaiSanPham = function (id, sanPham) {
    return axios({
      method: "PATCH",
      url: `http://localhost:3000/api/v1/category/${id}`,
      data: sanPham,
    });
  };

  this.timKiemSanPham = function (chuoiTimKiem, mangLoaiSanPham) {
    /**
     * 1. tao mang rong mangTimKiem
     * 2. duyet mangNguoiDung
     * 3. sd hàm indexOf so sánh
     * 4. thêm người dùng tìm thấy vào mảng mangTimKiem
     */
    //Cach 1
    // var mangTimKiem = [];

    // mangNguoiDung.map(function(item) {
    //   if (item.hoTen.toLowerCase().indexOf(chuoiTimKiem.toLowerCase()) > -1) {
    //     mangTimKiem.push(item);
    //   }
    // });

    // return mangTimKiem;

    //Cach 2 dung filter
    return mangLoaiSanPham.filter(function (item) {
      return item.name.toLowerCase().indexOf(chuoiTimKiem.toLowerCase()) > -1;
    });
  };
}
