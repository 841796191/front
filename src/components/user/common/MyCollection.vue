<template>
    <div>
      <table class="layui-table">
        <thead>
          <tr>
            <th class="title"><div class="layui-table-cell" style="padding-left:0;"><span>帖子标题</span></div></th>
            <th><div class="layui-table-cell" style="text-align:right;padding-right:0;"><span>收藏时间</span></div></th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>收藏的帖子</td>
            <td style="text-align:right;">2019-10-10</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
export default {
  name: 'mycollection'
}
</script>

<style lang='scss' scoped>
.title {
  width: 70%;
}
</style>
