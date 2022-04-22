<template>
  <div class="pagination">
    <!-- 上部分 -->
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button v-if="Continue.start > 1" @click="$emit('getPageNo', 1)" :class="{active:pageNo==1}">1</button>
    <button v-if="Continue.start > 2">···</button>

    <!-- 中间部分 -->
    <!-- v-for不仅可以遍历数组，还可以遍历数字 -->
    <button
      v-for="(page, index) in Continue.end"
      :key="index"
      v-if="page >= Continue.start"
      @click="$emit('getPageNo', page)"
      :class="{active:pageNo==page}"
    >
      {{ page }}
    </button>

    <!-- 下部分 -->
    <button v-if="Continue.end < totalPage - 1">···</button>
    <button
      v-if="Continue.end < totalPage"
      @click="$emit('getPageNo', totalPage)"
      :class="{active:pageNo==totalPage}"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo == totalPage"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>
    <span>{{ Continue }}</span>
    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    // 总的页数
    totalPage() {
      // Math.ceil就是向上取整
      return Math.ceil(this.total / this.pageSize);
    },
    // 计算出连续页码中的起始数字和结束数字
    Continue() {
      const { continues, pageNo, totalPage } = this;
      let start = 0;
      let end = 0;
      if (totalPage < continues) {
        start = 1;
        end = totalPage;
      } else {
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
        if (start < 1) {
          start = 1;
          end = continues;
        }
        if (end > totalPage) {
          (end = totalPage), (start = totalPage - continues + 1);
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active {
  background: skyblue;
}
</style>