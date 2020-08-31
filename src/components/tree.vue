<template>
  <div class="tree">
    <div class="left">
      <el-tree :data="data"
             :props="defaultProps"
             :render-content="renderContent"
             default-expand-all
             @node-click="nodeClick"></el-tree>
    </div>
    <div class="right"></div>
    <ul class="menu" v-if="showMenu">
      <li>新增</li>
      <li>删除</li>
      <li>移动</li>
      <li>粘贴</li>
    </ul>
  </div>
</template>

<script>
// import { directive } from 'vue/types/umd'
export default {
  data() {
    return {
      data: [
        {
          label: '测试部',
          type: 1,
          children: []
        }, {
          label: 'AUTO部',
          type: 1,
          children: []
        }, {
          label: '云平台部',
          type: 1,
        }, {
          label: '采购部',
          type: 1,
        }, {
          label: '行政部',
          type: 1,
        }
      ],
      data0: [
        {
          label: '软件测试部',
          type: 2,
          children: []
        }, {
          label: '硬件测试部',
          type: 2,
          children: []
        }, {
          label: '算法测试部',
          type: 2,
          children: []
        }, {
          label: '测试平台开发部',
          type: 2,
          children: []
        }
      ],
      // 软件测试部
      data1: [
        {
          label: '李玉琼',
          type: 3,
          gender: '女',
          dayInCompany: '1998/01/01',
          dep: '软件测试部',
          children: []
        }, {
          label: '何莉',
          type: 3,
          gender: '女',
          dayInCompany: '2000/04/15',
          dep: '软件测试部',
          children: []
        }, {
          label: '韩美',
          type: 3,
          gender: '女',
          dayInCompany: '2004/08/09',
          dep: '软件测试部',
          children: []
        }
      ],
      // 硬件测试部
      data2: [
        {
          label: '方琼',
          type: 3,
          gender: '女',
          dayInCompany: '2002/03/30',
          dep: '硬件测试部',
          children: []
        }, {
          label: '徐光清',
          type: 3,
          gender: '男',
          dayInCompany: '2010/03/03',
          dep: '硬件测试部',
          children: []
        }, {
          label: '牛海芳',
          type: 3,
          gender: '女',
          dayInCompany: '2012/05/04',
          dep: '硬件测试部',
          children: []
        }
      ],
      // 算法测试部
      data3: [
        {
          label: '邓勇',
          type: 3,
          gender: '男',
          dayInCompany: '2014/02/02',
          dep: '算法测试部',
          children: []
        }, {
          label: '韩志军',
          type: 3,
          gender: '女',
          dayInCompany: '1995/08/01',
          dep: '算法测试部',
          children: []
        }, {
          label: '孙蓉',
          type: 3,
          gender: '女',
          dayInCompany: '1998/09/01',
          dep: '算法测试部',
          children: []
        }
      ],
      // 测试平台开发部
      data4: [
        {
          label: '周午超',
          type: 3,
          gender: '男',
          dayInCompany: '2011/02/02',
          dep: '测试平台开发部',
          children: []
        }
      ],
      defaultProps: {
        label: 'label',
        children: 'children'
      },
      showMenu: false
    }
  },
  methods: {
    // 鼠标左键单击node
    nodeClick(obj, node) {
      console.log(obj, node)
      if (obj.type === 1) {
        if (obj.label === '测试部') {
          obj.children.push(...this.data0)
        }
      } else if (obj.type === 2) {
        if (obj.label === '软件测试部') {
          obj.children.push(...this.data1)
        } else if (obj.label === '硬件测试部') {
          obj.children.push(...this.data2)
        } else if (obj.label === '算法测试部') {
          obj.children.push(...this.data3)
        } else if (obj.label === '测试平台开发部') {
          obj.children.push(...this.data4)
        }
      }
    },
    // 渲染树形列表
    renderContent(h, {node}) {
      // console.log(node)
      // console.log(data)
      // console.log(node.data.type)
      if (node.data.type === 1) {
        return(
          <div>
            <i class="el-icon-s-home"></i>
            <span style="margin-left: 5px">{ node.label }</span>
          </div>
        )
      } else if (node.data.type === 2) {
        return(
          <div>
            <i class="el-icon-s-flag"></i>
            <span style="margin-left: 5px">{ node.label }</span>
          </div>
        )
      } else {
        return(
          <div>
            <i class="el-icon-s-custom"></i>
            <span style="margin-left: 5px">{ node.label }</span>
          </div>
        )
      }
    }
  },
  mounted() {
    // var _this = this
    let leftNode = document.getElementsByClassName('left')[0]
    leftNode.addEventListener('mouseenter', function() {
      this.style.cursor = 'pointer'
      // this.addEventListener('contextmenu', function(e) {
      //   console.log(e)
      //   e.preventDefault()
      //   _this.showMenu = true
      //   _this.$nextTick(() => {
      //     var menuNode = document.getElementsByClassName('menu')[0]
      //     menuNode.style.left = e.clientX + 'px'
      //     menuNode.style.top = e.clientY + 'px'
      //   })
      // })
    })
    leftNode.addEventListener('contextmenu', function(e) {
      e.preventDefault()
      // console.log(e)
      // _this.showMenu = true
      // _this.$nextTick(() => {
      //   var menuNode = document.getElementsByClassName('menu')[0]
      //   menuNode.style.left = e.offsetX + 'px'
      //   menuNode.style.top = e.offsetY + 'px'
      // })
    })
  }
}
</script>

<style lang="scss">
  .tree {
    margin-top: 20px;
    width: 100%;
    position: relative;
    border: 1px solid #ccc;
    min-height: 800px;
    .left {
      width: 50%;
      height: 800px;
      border-right: 1px solid #ccc;
      z-index: 1;
    }
    .right {
      width: 50%;
      z-index: 1;
    }
    .menu {
      position: absolute;
      list-style: none;
      top: 0px;
      left: 0px;
      margin: 0px;
      padding: 0px;
      width: 100px;
      background-color: rgb(238, 236, 236);
      box-shadow: 1px 1px 1px 1px rgb(177, 172, 172);
      z-index: 2;
      li {
        text-align: center;
        padding: 3px 0px;
        // border-bottom: 1px solid #ccc;
      }
      // display: inline-block;
      // width: 100px;
      // box-sizing: border-box;
      // border: 1px solid #000;
      // span {
      //   display: inline-block;
      //   width: 100px;
      // }
    }
  }
</style>