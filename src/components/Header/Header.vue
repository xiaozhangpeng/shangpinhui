<template>
  <!-- 头部 -->
  <div class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <!-- 没有用户名：未登录 -->
          <p v-if="!userName">
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link class="register" to="/register">免费注册</router-link>
          </p>
          <!-- 有用户名，登录了 -->
          <p v-else>
            <a>{{ userName }}</a>
            <a class="register" @click="logout()">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <a class="logo" href="/" target="_blank" title="尚品汇">
          <img alt="" src=".././images/logo.png" />
        </a>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            class="input-error input-xxlarge"
            id="autocomplete"
            type="text"
            v-model="keyword"
          />
          <button
            @click="Searchs()"
            class="sui-btn btn-xlarge btn-danger"
            type="button"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      keyword: "",
    };
  },
  computed: {
    //用户名（出错原因，仓库中的state字母写错）
    userName() {
      return this.$store.state.user.userInfo.name;
    },
  },
  methods: {
    Searchs: function () {
      //vue-router的最新版本引入了最新技术，当调用push会返回一个Promise对象
      // let result=  this.$router.push({name: 'Search', params: {keyword: this.keyword}, query: {k: this.keyword.toUpperCase()}},()=>{},()=>{});
      // this.$router.push({path:'/search'})
      // this.$router.push({name: 'Search',
      //  params: {keyword: this.keyword||undefined},
      //  query: {big: this.keyword.toUpperCase()}},()=>{},()=>{

      // //  捕获当前的错误||获取当前的$router属性
      // //  console.log(this.$router)
      // // console.log(error);
      // });
      // console.log(result);

      if (this.$route.query) {
        // 如果有query参数，同样也稍带过去
        // 如果传递的params参数是空字符串时，需要使用Undefined
        let location = {
          name: "Search",
          params: { keyword: this.keyword || undefined },
        };
        location.query = this.$route.query;
        this.$router.push(location);
      }
    },
    // 退出登录
    async logout() {
      // 退出登录需要做的事情（发请求通知服务器推出登录并且清除项目当中的数据userInfo）
      try {
        await this.$store.dispatch("userLogout");
        this.$router.push("/home");
      } catch (error) {
        alert(error.message);
      }
    },
  },
  mounted() {
    // 通过全局事件总线$bus,清除关键字
    this.$bus.$on("clear", () => {
      this.keyword = "";
    });
  },
};
</script>

<style lang="less">
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
