
const rules = {
  username: [{
    required: true,
    validator: (rule, val, cb) => {
      if (!val) {
        cb(new Error('不能为空'))
      } else {
        cb();
      }
    },
    trigger: 'blur'
  }],
  account: [{
    required: true,
    validator: (rule, val, cb) => {
      if (!val) {
        cb(new Error('不能为空'))
      } else {
        cb();
      }
    },
    trigger: 'blur'
  }],
  password: [{
    required: true,
    validator: (rule, val, cb) => {
      if (!val) {
        cb(new Error('不能为空'))
      } else {
        cb();
      }
    },
    trigger: 'blur'
  }]
}

export default rules