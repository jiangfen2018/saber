// import request from '../../router/axios'
import request from 'axios'

export function getResponse () {
  return request({
    url: '/api/platform-device/customer/response/list',
    method: 'get',
    params: {
      code_equal: 'mold'
    }
  })
}
