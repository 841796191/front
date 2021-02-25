<template>
    <div>
      <!-- H5不支持cellspacing&cellpadding CSS等价border-collapse:collapse border-spacing:0 -->
      <table class="layui-table" border="0">
        <thead>
          <tr>
            <th>
              <div class="layui-table-cell" style="padding-left:0;">
                <span>帖子标题</span>
              </div>
            </th>
            <th style="text-align:center;">
              <div class="layui-table-cell">
                <span>状态</span>
              </div>
            </th>
            <th style="text-align:center;">
              <div class="layui-table-cell">
                <span>结帖</span>
              </div>
            </th>
            <th style="text-align:center;">
              <div class="layui-table-cell">
                <span>发表时间</span>
              </div>
            </th>
            <th style="text-align:center;">
              <div class="layui-table-cell">
                <span>数据</span>
              </div>
            </th>
            <th style="text-align:center;">
              <div class="layui-table-cell">
                <span>操作</span>
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>文章测试标题</td>
            <td style="text-align:center;">打开</td>
            <td style="text-align:center;">未结</td>
            <td style="text-align:center;">2019-10-1</td>
            <td style="text-align:center;">10阅/2答</td>
            <td style="text-align:center;">
              <div class="layui-btn layui-btn-xs">编辑</div>
              <div class="layui-btn layui-btn-xs layui-btn-danger">删除</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
export default {
  name: 'mypost'
}
</script>

<style lang='scss' scoped>

</style>
