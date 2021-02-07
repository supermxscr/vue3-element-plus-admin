<template>
  <div class="m-form">
    <!-- 
      单选 Radio
      disabled        是否禁用            boolean                     默认false
      label	          Radio 的 value     string / number / boolean
      border	        是否显示边框	       boolean                     默认false
    -->
    <el-radio-group
      v-model="value"
      v-if="itemProps.type == 'radio'"
    >
      <el-radio
        v-bind="item"
        :label="item.lable"
        v-for="item in itemProps.dataArr"
        :key="item"
        :disabled="item.disabled ? item.disabled : false"
      >
        {{ item.value }}
      </el-radio>
    </el-radio-group>
    <!-- 
      输入框 input 
      属性
      placeholder     输入框占位文本
      clearable	      是否可清空          默认false
      disabled        是否禁用            默认false
      show-password   是否为密码框         默认 false
      type            输入框类型          textarea 多文本
      show-word-limit 限制输入框的字符长度  默认false 只在 type = "text" 或 type = "textarea" 时有效
      maxlength       文本最大长度    Number 
      minlength       文本最小长度    Number
      prefix-icon     头部标题       String
      suffix-icon     输入框尾部图标	String
      rows	          输入框行数     Number 默认 2  只对 type="textarea" 有效
      autosize	      自适应内容高度  boolean / object  只对 type="textarea" 有效，可传入对象，如，{ minRows: 2, maxRows: 6 }	
      validate-event	输入时是否触发表单的校验  默认 true
     -->
    <el-input
      size="mini"
      v-if="itemProps.type == 'input' || itemProps.type == 'textarea'"
      v-model="value"
      v-bind="itemProps"
      @clear="blur"
      :key="itemProps.type"
      :style="itemProps.style?itemProps.style:'width:100%'"
      :placeholder="itemProps.placeholder ? itemProps.placeholder : '请输入'"
    />
    <!-- 计数器 InputNumber -->
    <!--  
      min	设置计数器允许的最小值
      max	设置计数器允许的最大值
      step	计数器步长                       默认1
      step-strictly	是否只能输入 step 的倍数  默认 false
      disabled	是否禁用计数器
      precision	数值精度	number
      controls	是否使用控制按钮              默认true
      controls-position	控制按钮位置         默认right
    -->
    <el-input-number
      size="mini"
      v-if="itemProps.type=='input-number'"
      v-model="value"
      v-bind="itemProps"
      :style="itemProps.style?itemProps.style:'width:100%'"
      :placeholder="itemProps.placeholder ? itemProps.placeholder : '请输入'"
    />
    <!-- Select 选择器 -->
    <!-- 
      placeholder	占位符
      multiple	是否多选  默认 false
      disabled	是否禁用  默认 false
      clearable	是否可以清空选项  默认 false
      collapse-tags	多选时是否将选中值按文字的形式展示  默认 false
      multiple-limit	多选时用户最多可以选择的项目数，为 0 则不限制 默认 0
      value-key	作为 value 唯一标识的键名，绑定值为对象类型时必填 如果 Select 的绑定值为对象类型，请务必指定 value-key 作为它的唯一性标识。
      filterable	是否可搜索  默认  false
      filter-method	自定义搜索方法	function
      remote	是否为远程搜索	boolean	默认 false
      remote-method	远程搜索方法
      loading	是否正在从远程获取数据	boolean   默认 false
      loading-text	远程加载时显示的文字	string	默认	加载中
      no-match-text	搜索条件无匹配时显示的文字，也可以使用#empty设置	string	默认	无匹配数据
      no-data-text	选项为空时显示的文字，也可以使用#empty设置	string	     默认  无数据
      popper-class	Select 下拉框的类名	string
      reserve-keyword	多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词	boolean 默认 false
      default-first-option	在输入框按下回车，选择第一个匹配项。需配合 filterable 或 remote 使用	boolean 默认 false
     -->
    <el-select 
      v-model="value"
      v-if="itemProps.type == 'select'"
      size="mini"
      v-bind="itemProps"
      :style="itemProps.style?itemProps.style:'width:100%'"
      @clear="blur"
      :placeholder="itemProps.placeholder ? itemProps.placeholder : '请选择'"
    >
      <el-option
        v-for="item in itemProps.dataArr"
        v-bind="item"
        :key="item.value"
      />
    </el-select>
    <!-- 富文本 -->
    <wangeditor 
      v-if="itemProps.type == 'editor'" 
      v-model="value"
    />
    <!-- 
      上传图片 / 文件 
      type multiple 多张 single 单张
    -->
    <upload-img
      @uploadImgsUrl="getImgs"
      v-if="itemProps.type == 'multiple' || itemProps.type == 'single' || itemProps.type == 'file'" 
      v-bind="itemProps"
    />
  </div>
</template>
<script>
import UploadImg from "@/components/upload/index.vue";
export default {
  components:{ UploadImg },
  props: {
    itemProps:{
      type:  Object,
      default:()=>{}
    },
    rest:{
      type: Boolean,
      default: ()=>{
        return false
      }
    }
  },
  data() {
    return {
      value: null
    }
  },
  mounted() {
    this.value = this.itemProps.defaultValue
  },
  watch:{
    rest(val){
      if(val){
        this.value = this.itemProps.defaultValue
      }
    },
    value(val){
        this.$emit('handleChange', {
        key:this.itemProps.bindKey,
        value: val
      })
    }
  },
  methods: {
    getImgs(data){
      this.value = data
    },
    blur(){
      this.$emit('handleChange', {
        key:this.itemProps.bindKey,
        value: this.value
      })
    }
  }
}
</script>

<style lang="less">
</style>
