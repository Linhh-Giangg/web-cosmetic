class request {
  constructor() {
    this.maNhom = "001";
    this.token = localStorage.getItem("admin")
      ? JSON.parse(localStorage.getItem("admin")).accessToken
      : null;
  }
  login(data) {
    return axios({
      method: "POST",
      url: "http://localhost:3000/api/v1/auth/login",
      data,
    });
  }
  // getUser() {
  //   return axios({
  //     method: "GET",
  //     url:
  //       "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=" +
  //       this.maNhom,
  //   });
  // }
  addUser(user) {
    return axios({
      method: "POST",
      url: "http://localhost:3000/api/v1/auth/register",
      data: user,
      headers: {
        Authorization: "Bearer " + this.token,
      },
    });
  }
}

export default request;
