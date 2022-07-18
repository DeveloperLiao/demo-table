<template>
  <div>
    <h1>这是APP根组件</h1>
    <hr />
    <!-- 具名插槽 -->
    <myTable :goodsList="goodsList">
      <template #header>
        <th scope="col">序号</th>
        <th scope="col">商品名称</th>
        <th scope="col">价格</th>
        <th scope="col">标签</th>
        <th scope="col">操作</th>
      </template>
      <!-- 作用域插槽 -->
      <template #body="{ row, index }">
        <td>{{ index + 1 }}</td>
        <td>{{ row.goods_name }}</td>
        <td>{{ row.goods_price }}</td>
        <td>
          <input type="text" class="ipt" v-if="row.inputVisible" v-focus v-model.trim="row.inputValue" @blur="onInputConfirm(row)" @keyup.enter="onInputConfirm(row)" @keyup.esc="clear(row)" />
          <button type="button" class="btn btn-primary" v-else @click="row.inputVisible = true">+tag</button>
          <span class="badge badge-warning ml-2" v-for="item in row.tags" :key="item">{{ item }}</span>
        </td>
        <td>
          <button type="button" class="btn btn-danger" @click="onRemove(row.id)">删除</button>
        </td>
      </template>
    </myTable>
  </div>
</template>

<script>
import MyTable from './components/my-table/MyTable.vue'
export default {
  name: 'MyApp',
  data() {
    return {
      goodsList: []
    }
  },
  components: {
    MyTable
  },
  methods: {
    //获取后台数据
    async getGoodsList() {
      const { data: res } = await this.$http.get('api/goods')
      if (res.status === 0) {
        console.log('数据获取成功！')
        this.goodsList = res.data
      } else {
        console.log('数据获取失败！')
      }
    },
    //删除功能
    onRemove(id) {
      this.goodsList = this.goodsList.filter(x => x.id !== id)
    },
    //添加标签
    onInputConfirm(row) {
      const val = row.inputValue
      row.inputVisible = false
      row.inputValue = ''
      //如果val为空或者标签中已存在val值，则不添加
      if (!val || row.tags.indexOf(val) !== -1) return
      row.tags.push(val)
    },
    //清空文本框的值
    clear(row) {
      row.inputValue = ''
    }
  },
  //自定义指令
  directives: {
    //自动聚焦
    focus(el) {
      el.focus()
    }
  },
  created() {
    this.getGoodsList()
  }
}
</script>

<style lang="less" scoped>
.ipt {
  width: 80px;
  display: inline;
}
</style>
