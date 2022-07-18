<template>
  <div>
    <table class="table table-bordered">
      <thead>
        <tr>
          <slot name="header"></slot>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in goodsList" :key="item.id">
          <!-- 给插槽绑定值 -->
             <slot name="body" :row="item" :index="index"></slot>
        </tr>   
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'MyTable',
  props: {
    goodsList: {
      type: Array,
      required: true,
      default: []
    }
  }
}
</script>

<style lang="less" scoped></style>
