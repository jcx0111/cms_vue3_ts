const Mock = require('mockjs')

Mock.mock('/api/mock/login', 'post', require('../store/login/login.json'))
Mock.mock('/api/mock/user/1', 'get', require('../store/login/userInfo.json'))
Mock.mock('/api/mock/role/1/menu', 'get', require('../store/login/usermenu.json'))
Mock.mock('/api/mock/user/list', 'post', require('../store/login/users.json'))
