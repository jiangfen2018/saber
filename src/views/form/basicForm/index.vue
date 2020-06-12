<template>
  <page-header-wrapper>
    <div class="page-header-index-wide page-header-wrapper-grid-content-main">
      <div class="list">
        <div class="item-name">筛选</div>
        <div class="item-list">
          <span class="item-box" style="margin-left: 20px">
            <label>客戶：</label>
            <!-- <el-input v-model="customerName" clearable class="my-input" size="mini"></el-input> -->
            <a-input style="width:200px"/>
          </span>
          <span class="item-box" style="float:left">
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

      <searchStyle01 :data="searchItem.area" @searchFather="searchFather" name="dictValue"></searchStyle01>
      <searchStyle01 :data="searchItem.response" @searchFather="searchFather" name="username"></searchStyle01>

      <div class="main">
        <cbutton title="新增客户" @clickButton="editFormVisible = true"></cbutton>
        <table03 :data="data" @goToProject="goToProject"></table03>
        <!-- <cpagination v-bind:child-msg="page" @callFather="callFather"></cpagination> -->
      </div>
    </div>
  </page-header-wrapper>
</template>

<script>
import { getResponse } from '@/api/customer/customer'
import searchStyle01 from '@/components/searchStyle01'
import cbutton from '@/components/button'
import table03 from '@/components/table03'
export default {
  name: 'BaseForm',
  data () {
    return {
      data: [],
      editFormVisible: false,
      searchItem: {
        area: {
          label: '区域',
          res: []
        },
        sideDetail: { res: [] },
        response: {
          label: '负责人',
          res: []
        }
      }
    }
  },
  components: {
    table03,
    cbutton,
    searchStyle01
  },
  created () {
    if (this.$route.query.customerName) {
      this.query['customerName'] = this.$route.query.customerName
      this.customerName = this.$route.query.customerName
    }
    this.onLoad(this.page)
    this.getSelect('area')
    this.getSelect('response')
    this.getSelect('sale')
  },
  methods: {
    getSelect (item) {
      if (item === 'response') {
        getResponse().then(res => {
          this.searchItem[item].res = res.data.data
        })
      } else if (item === 'sale') {
        // selectSaleList('sale').then(res => {
        //   this.chargeList = res.data.data
        // })
      } else {
        // getListItem('area').then(res => {
        //   this.searchItem[item].res = res.data.data
        // })
      }
    },
    goToProject (item) {
      // this.$router.push({
      //   name: "项目列表",
      //   path: "/dashboard/analysis",
      //   params: {
      //     customerName: item.customerName,
      //     customerId: item.id
      //   },
      //   query: {
      //     customerName: item.customerName,
      //     customerId: item.id
      //   }
      // });
    },
     searchFather (label, item) {
      switch (label) {
        case '区域':
          this.query['side_equal'] = item.dictKey
          break
        case '负责人':
          this.query['a.chargeId_equal'] = item.id
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
