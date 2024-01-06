const Mock = require('mockjs')

// interface ILogin {
//   name: string
//   psaaword: string
// }

Mock.mock('/api/mock/login', 'post', (option: any) => {
  const params = JSON.parse(option.body)

  if (params.name === 'jiachuanxi' && params.password === '123456') {
    return require('./data/login1.json')
    console.log(option)
  } else if (params.name === 'zhangsan' && params.password === '123456') {
    return require('./data/login2.json')
  } else {
    console.log('用户名或密码错误')
  }
})
Mock.mock('/api/mock/user/1', 'get', require('./data/userInfo1.json'))
Mock.mock('/api/mock/user/2', 'get', require('./data/userInfo2.json'))
Mock.mock('/api/mock/role/1/menu', 'get', require('./data/usermenu1.json'))
Mock.mock('/api/mock/role/2/menu', 'get', require('./data/usermenu2.json'))
Mock.mock('/api/mock/user/list', 'post', require('./data/users.json'))
Mock.mock('/api/mock/goods/category/count', 'get', require('./data/categoryCount.json'))
Mock.mock('/api/mock/goods/category/sale', 'get', require('./data/categorySale.json'))
Mock.mock('/api/mock/goods/category/favor', 'get', require('./data/categoryFavor.json'))
Mock.mock('/api/mock/goods/address/sale', 'get', require('./data/addressSale.json'))
