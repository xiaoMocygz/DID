import request from '@/utils/request'

// 获取所有的Role
export function getAll() {
  return request({
    url: 'api/role/all',
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: 'api/role/create',
    method: 'post',
    data
  })
}

export function get(id) {
  return request({
    url: 'api/role/' + id,
    method: 'get'
  })
}

export function getLevel() {
  return request({
    url: 'api/role/level',
    method: 'get'
  })
}

export function del(ids) {
  return request({
    url: 'api/role/delete',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/role/edit',
    method: 'put',
    data
  })
}

export function editMenu(data) {
  return request({
    url: 'api/role/menu/edit',
    method: 'put',
    data
  })
}

export default { add, edit, del, get, editMenu, getLevel }
