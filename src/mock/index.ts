const Mock = require('mockjs')

// 登录信息
Mock.mock('/api/mock/login', 'post', (option: any) => {
  const params = JSON.parse(option.body)

  if (params.name === 'jiachuanxi' && params.password === '123456') {
    return require('./data/login1.json')
  } else if (params.name === 'zhangsan' && params.password === '123456') {
    return require('./data/login2.json')
  } else {
    // 弹出提示框
    console.log('用户名或密码错误')
  }
})
// 通过用户ID获取用户数据
Mock.mock('/api/mock/user/1', 'get', require('./data/userInfo1.json'))
Mock.mock('/api/mock/user/2', 'get', require('./data/userInfo2.json'))
// 通过用户ID判断用户权限，返回菜单列表以及按钮权限
Mock.mock('/api/mock/role/1/menu', 'get', require('./data/usermenu1.json'))
Mock.mock('/api/mock/role/2/menu', 'get', require('./data/usermenu2.json'))
//返回创建的所有用户数据
Mock.mock('/api/mock/user/list', 'post', (option: any) => {
  const params = JSON.parse(option.body)
  const users = require('./data/users.json')
  // params.row是要被删除的用户信息
  // 没有点击删除，params.row是undefined，需要进行判断
  if (params.row) {
    const newUsers = users.data.list.filter((item: any) => item.id != params.row.id)
    users.data.list = newUsers
  }
  if (params.newUser) {
    users.data.list.push(params.newUser)
  }
  return users
})

// Echarts数据
Mock.mock('/api/mock/goods/category/count', 'get', require('./data/categoryCount.json'))
Mock.mock('/api/mock/goods/category/sale', 'get', require('./data/categorySale.json'))
Mock.mock('/api/mock/goods/category/favor', 'get', require('./data/categoryFavor.json'))
Mock.mock('/api/mock/goods/address/sale', 'get', require('./data/addressSale.json'))
