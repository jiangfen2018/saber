<template>
  <div>
    <div class="list">
      <div class="item-name">筛选</div>
      <div class="item-list">
        <span class="item-box">
          <label>客戶：</label>
          <!-- <el-input v-model="customerName" clearable class="my-input" size="mini"></el-input> -->
          <a-input style="width:200px"/>
        </span>
        <span class="item-box" style="margin-left: 20px">
          <label>项目：</label>
          <!-- <el-input v-model="customerName" clearable class="my-input" size="mini"></el-input> -->
          <a-input style="width:200px"/>
        </span>
        <span class="item-box" style="margin-left: 20px">
          <label>时间：</label>
          <!-- <el-date-picker
            v-model="createTime"
            class="my-input"
            type="daterange"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至" @change="changeTime"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
          ></el-date-picker> -->
          <a-range-picker
            :placeholder="['开始日期', '结束日期']"
          />
        </span>
        <span class="search-btn" >查询</span>
      </div>
    </div>

    <searchStyle01 :data="searchItem.mold" @searchFather="searchFather" name="dictValue"></searchStyle01>
    <searchStyle01 :data="searchItem.area" @searchFather="searchFather" name="dictValue"></searchStyle01>
    <searchStyle01 :data="searchItem.flow" @searchFather="searchFather" name="dictValue"></searchStyle01>
    <searchStyle01 :data="searchItem.progress" @searchFather="searchFather" name="dictValue"></searchStyle01>
    <searchStyle01 :data="searchItem.response" @searchFather="searchFather" name="username"></searchStyle01>

    <div class="main">
      <cbutton title="新增项目" @clickButton="editFormVisible = true"></cbutton>
      <table04 :data="data" @goDetail="goDetail" @createDesign="createDesign"></table04>
      <!--  <cpagination v-bind:child-msg="page" @callFather="callFather"></cpagination> -->
    </div>
  </div>
</template>

<script>
import table04 from '@/components/table04'
import searchStyle01 from '@/components/searchStyle01'
import cbutton from '@/components/button'
export default {
  data () {
    return {
        data: [],
        searchItem: {
        mold: {
          label: '类型',
          res: []
        },
        area: {
          label: '区域',
          res: []
        },
        flow: {
          label: '流数',
          res: []
        },
        response: {
          label: '负责人',
          res: []
        },
        progress: {
          label: '状态',
          res: []
        }
      }
    }
  },
  components: {
    table04,
    searchStyle01,
    cbutton
  },
  methods: {
    createDesign (item) {
      // createDesign(item.id).then(res => {
      //   this.$message({
      //     message: "生成成功",
      //     type: "success"
      //   });
      // });
    },
    goDetail (item) {
      // this.$router.push({
      //   name: "项目详情",
      //   path: "/customer/projectDetail",
      //   query: {
      //     id: item.id
      //   }
      // });
    },
     searchFather (label, item) {
      switch (label) {
        case '区域':
          this.query['side'] = item.dictKey
          break
        case '类型':
          this.query['a.type'] = item.dictKey
          break
        case '流数':
          this.query['flow'] = item.dictKey
          break
        case '状态':
          this.query['progress'] = item.dictKey
          break
        case '负责人':
          this.query['b.chargeId_equal'] = item.id
          break
        default:
          break
      }
      this.onLoad(this.page)
    },
    onLoad (page, params = {}) {
      // getList(
      //   page.currentPage,
      //   page.pageSize,
      //   Object.assign(params, this.query)
      // ).then(res => {
      //   const data = res.data.data;
      //   this.page.pages = data.pages;
      //   this.data = data.records;
      // });
    }
  }
}
</script>
<style lang="less" scoped>
.list {
  border-bottom: 1px dashed #DCDFE6;
  padding: 10px 0;
  display: flex;
  align-items: center;

  .item-name {
    width: 80px;
    color: #303133;

    &:after {
      content: ':';
      margin-left: 4px;
    }
  }
    .search-btn {
      background-color: #8693f3;
      padding: 2px 22px;
      border-radius: 4px;
      color: #fff;
      margin-left: 20px;
      cursor: pointer;
      position: relative;
    }
  }
  .main {
    margin-top: 20px;
  }
</style>
