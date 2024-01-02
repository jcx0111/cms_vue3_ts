//验证校验
export const rules = {
  name: [
    { required: true, message: '请输入输入账号', trigger: 'blur' },
    { pattern: /^[a-z0-9]{5,10}$/, message: '用户名必须是5-10个字母或数字', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'change' },
    { pattern: /^[a-z0-9]{5,}$/, message: '密码必须是5个以上字母或数字', trigger: 'blur' }
  ]
}
