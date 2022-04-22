<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <!-- <h1>{{categoryList}}</h1> -->
    <div class="container">
      <!-- 将两者归为新的div目录下，新的div里面写入leaveIndex()方法 -->
      <div @mouseleave="leaveIndex()" @mouseenter="enterShow()">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="show">
            <!-- 一级目录 -->
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex == index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <!-- 自定义属性data-categoryName和data-category1Id data-category2Id data-category3Id-->
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}--{{ currentIndex }}</a
                  >
                </h3>

                <!-- 二级目录 -->
                <!-- 利用Js控制二三级目录的显示与隐藏 -->
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="(c2, index) in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      ++
                      <!-- 三级目录 -->
                      <dd>
                        <em
                          v-for="(c3, index) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
// 在使用mapState之前，要导入这个辅助函数
import { mapState } from "vuex";

// 引入lodash中的throttle节流函数（按需引入）
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      show: true,
    };
  },
  methods: {
    // 鼠标略过TypeNav的时候，改变currentIndex的值
    // changeIndex(index) {
    //   this.currentIndex = index;
    // },

    // 利用节流，在时间间隔为50ms内不会再次请求服务器
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
      // console.log("执行一次");
    }, 50),

    // 鼠标移出的时候，调用函数
    leaveIndex() {
      this.currentIndex = -1;
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
    // 划过的时候显示三级联动
    enterShow() {
      this.show = true;
    },
    // 进行路由跳转的方法
    goSearch(event) {
      let element = event.target;
      // console.log(element.dataset)
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      if (categoryname) {
        let location = { name: "Search" };
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        // 整理参数
        console.log(location, query);

        // 路由跳转
        // location.query = query;
        // this.$router.push(location);

        // 如果路由跳转的时候，带有params参数,捎带脚传递过去
        if(this.$route.params)
        {
          location.params=this.$route.params;
          // 动态给location配置对象添加query属性
          location.query=query;
          this.$router.push(location);
        }
      }
    },
  },

  //生命周期函数mouunted（）
  // 组件挂在完毕：可以向服务器发送请求
  mounted() {
    // // 通知vuex发送请求，获取数据，存储与home仓库当中
    // // 派发action
    // this.$store.dispatch("categoryList");

    // 当组件挂在完毕后，如果不是Home路由组件，将TypeNav组件进行隐藏
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    // mapState是state的辅助函数，也可以说是state的语法糖
    ...mapState({
      // 意思是将vuex中的数据映射到组件的computed属性中
      // 右侧需要的是一个函数，当使用这个计算属性的时候，右侧的函数会立即执行一次
      // 注入一个参数state，其实即为大仓库中的数据
      categoryList: (state) => {
        // console.log(state);
        return state.home.categoryList;
      },
    }),
  },
};
</script>


<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        // 利用JS手段cur来改变TypeNav背景颜色
        .cur {
          background: skyblue;
        }
        // .item:hover{
        //   background:skyblue;
        // }
      }
    }
    // 鼠标进入过渡效果
    .sort-enter {
      height: 0px;
    }
    // 鼠标移出过渡效果
    .sort-enter-to {
      height: 501px;
    }

    .sort-enter-active {
      transition: all 0.1s linear;
    }
  }
}
</style>