
  const rules = {
    username: [{
      required: true,
      validator: (rule, val, cb) => {
        if (!val) {
          cb(new Error('请输入用户名'))
        } else if (val.length < 3) {
          cb(new Error('用户名不能小于3位数'))
        } else {
          cb()
        }
      },
      trigger: 'blur'
    }],
    accountNumber: [{
      required: true,
      validator: (rule, val, cb) => {
        if (!val) {
          cb(new Error('请输入账号'))
        } else if (val.length < 3) {
          cb(new Error('账号不能小于3位数'))
        } else {
          cb()
        }
      },
      trigger: 'blur'
    }],
    password: [{
      required: true,
      validator: (rule, val, cb) => {
        if (!val) {
          cb(new Error('请输入密码'))
        } else if (val.length < 6) {
          cb(new Error('密码不能小于6位数'))
        } else {
          cb()
        }
      },
      trigger: 'blur'
    }]
  }
export default rules