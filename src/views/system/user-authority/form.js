
import rules from './rules'
import _ from 'lodash'

const ruleForm = {
  username: null,
  password: null,
  id: null,
  account: null,
  authority: null
}
const formCopy = _.cloneDeep(ruleForm)

const formInit = [
  {
    label:'用户昵称',
    prop:'username',
    rules: rules.username,
    view: {
      bindKey:'username',
      defaultValue: ruleForm.username,
      placeholder:'请输入用户昵称',
      clearable: true,
      type:'input',
    }
  }, 
  {
    label:'登录账号',
    prop:'account',
    rules: rules.account,
    view: {
      bindKey:'account',
      defaultValue: ruleForm.account,
      placeholder:'请输入登录账号',
      clearable: true,
      type:'input',
    }
  }, 
  {
    label:'登录密码',
    prop:'password',
    rules: rules.password,
    view: {
      bindKey:'password',
      defaultValue: ruleForm.password,
      placeholder:'请输入登录密码',
      showPassword: true,
      clearable: true,
      type:'input',
    }
  },
  {
    label:'菜单权限',
    prop:'authority',
    rules: rules.authority,
    view: {
      bindKey: 'authority',
      defaultValue: ruleForm.authority,
      clearable: true,
      type: 'cascader',
      // 'collapse-tags': true,
      options: [],
      props: {multiple: true}
    }
  }
]

export {ruleForm, formInit, formCopy}