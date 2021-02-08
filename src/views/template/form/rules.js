
const rules = {
  number: [{
    required: true,
    message: '请输入',
    trigger: 'blur'
  }],
  type: [{
    required: true,
    validator: (rule, val, cb) => {
      if (!val) {
        cb(new Error('不能为空'))
      } else {
        cb();
      }
    },
    trigger: 'change'
  }],
  title: [{
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
  select: [{
    required: true,
    validator: (rule, val, cb) => {
      if (val.length == 0) {
        cb(new Error('不能为空'))
      } else {
        cb();
      }
    },
    trigger: 'change'
  }],
  pwd: [{
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