import request from "./request";
export const userinfo = () => {
  return request({
    method: 'GET',
    url: '/api/user/getuserinfo',
  })
}
///api/user/​getuserinfo
