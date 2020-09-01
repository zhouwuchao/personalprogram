<template>
  <div class="tree">
    <div class="left">
      <el-tree :data="data"
             :props="defaultProps"
             :render-content="renderContent"
             default-expand-all
             @node-click="nodeClick"
             @node-contextmenu="nodeRightClick"></el-tree>
    </div>
    <div class="right"></div>
    <ul class="menu" v-if="showMenu">
      <li v-for="(val, key) in menuData" :key="key" @mouseenter="menuMouseenter" @mouseleave="menuMouseleave" @click="menuClick">{{ val }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          label: '测试部',
          type: 1,
          id: 1000,
          children: []
        }, {
          label: 'AUTO部',
          type: 1,
          id: 2000,
          children: []
        }, {
          label: '云平台部',
          id: 3000,
          type: 1,
        }, {
          label: '采购部',
          type: 1,
          id: 4000,
        }, {
          label: '行政部',
          type: 1,
          id: 5000,
        }
      ],
      data0: [
        {
          label: '软件测试部',
          type: 2,
          id: 1100,
          children: []
        }, {
          label: '硬件测试部',
          type: 2,
          id: 1200,
          children: []
        }, {
          label: '算法测试部',
          type: 2,
          id: 1300,
          children: []
        }, {
          label: '测试平台开发部',
          type: 2,
          id: 1400,
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
          secondDep: '软件测试部',
          firstDep: '测试部',
          id: 1101,
          team: 1,
          children: []
        }, {
          label: '何莉',
          type: 3,
          gender: '女',
          dayInCompany: '2000/04/15',
          secondDep: '软件测试部',
          firstDep: '测试部',
          id: 1102,
          team: 1,
          children: []
        }, {
          label: '韩美',
          type: 3,
          gender: '女',
          dayInCompany: '2004/08/09',
          secondDep: '软件测试部',
          firstDep: '测试部',
          id: 1103,
          team: 1,
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
          secondDep: '硬件测试部',
          firstDep: '测试部',
          id: 1201,
          team: 2,
          children: []
        }, {
          label: '徐光清',
          type: 3,
          gender: '男',
          dayInCompany: '2010/03/03',
          secondDep: '硬件测试部',
          firstDep: '测试部',
          id: 1202,
          team: 2,
          children: []
        }, {
          label: '牛海芳',
          type: 3,
          gender: '女',
          dayInCompany: '2012/05/04',
          secondDep: '硬件测试部',
          firstDep: '测试部',
          id: 1203,
          team: 2,
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
          secondDep: '算法测试部',
          firstDep: '测试部',
          id: 1301,
          team: 3,
          children: []
        }, {
          label: '韩志军',
          type: 3,
          gender: '女',
          dayInCompany: '1995/08/01',
          secondDep: '算法测试部',
          firstDep: '测试部',
          id: 1302,
          team: 3,
          children: []
        }, {
          label: '孙蓉',
          type: 3,
          gender: '女',
          dayInCompany: '1998/09/01',
          secondDep: '算法测试部',
          firstDep: '测试部',
          id: 1303,
          team: 3,
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
          secondDep: '测试平台开发部',
          firstDep: '测试部',
          id: 1401,
          team: 4,
          children: []
        }
      ],
      defaultProps: {
        label: 'label',
        children: 'children'
      },
      menuData: ['新增', '删除', '移动', '粘贴'],
      showMenu: false,
      rightClickNode: null
    }
  },
  methods: {
    // 鼠标左键单击node
    nodeClick(obj) {
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
    // 鼠标右击
    nodeRightClick(e, obj) {
      // offsetY是相对于当前每个节点的高度
      console.log(obj)
      // 保存当前右键点击的对象
      this.rightClickNode = obj
      this.showMenu = true
      this.$nextTick(() => {
        var menuNode = document.getElementsByClassName('menu')[0]
        menuNode.addEventListener('mouseenter', function() {
          this.style.cursor = 'pointer'
        })
        menuNode.style.left = e.clientX + 'px'
        menuNode.style.top = e.clientY + 'px'
      })
    },
    // 渲染树形列表
    renderContent(h, {node}) {
      if (node.data.type === 1) {
        return(
          <div>
            <i class="el-icon-s-home"></i>
            <span>{ node.label }</span>
          </div>
        )
      } else if (node.data.type === 2) {
        return(
          <div>
            <i class="el-icon-s-flag"></i>
            <span>{ node.label }</span>
          </div>
        )
      } else {
        return(
          <div>
            <i class="el-icon-s-custom"></i>
            <span>{ node.label }</span>
          </div>
        )
      }
    },
    // 鼠标进入菜单的单个选项
    menuMouseenter(e) {
      e.target.style.backgroundColor = '#d9d9d9'
    },
    // 鼠标离开菜单的单个选项
    menuMouseleave (e) {
      e.target.style.backgroundColor = ''
    },
    // 鼠标点击菜单的单个选项
    menuClick(e) {
      console.log(this.data)
      // console.log(e.target.innerHTML)
      if (this.rightClickNode.type < 3) {
        this.$message({
          message: '很抱歉,你无权操作!',
          type: 'warning'
        })
      } else {
        if (e.target.innerHTML === '删除') {
          // 先找到一级部门
          var firstIndex = this.data.findIndex(ele => ele.label === this.rightClickNode.firstDep)
          var secondIndex = this.data[firstIndex].children.findIndex(ele => ele.label === this.rightClickNode.secondDep)
          var thirdIndex = this.data[firstIndex].children[secondIndex].children.findIndex(ele => ele.label === this.rightClickNode.label)
          this.data[firstIndex].children[secondIndex].children.splice(thirdIndex, 1)
          if (this.rightClickNode.team === 1) {
            this.data1.splice(thirdIndex, 1)
          } else if (this.rightClickNode.team === 2) {
            this.data2.splice(thirdIndex, 1)
          } else if (this.rightClickNode.team === 3) {
            this.data3.splice(thirdIndex, 1)
          } else {
            this.data4.splice(thirdIndex, 1)
          }
        } else {
          this.$message({
            message: '很抱歉,未实现该功能!',
            type: 'error'
          })
        }
      }
    }
  },
  mounted() {
    let leftNode = document.getElementsByClassName('left')[0]
    leftNode.addEventListener('mouseenter', function() {
      this.style.cursor = 'pointer'
    })
    // 左区域实现自定义右键菜单,取消默认行为
    leftNode.addEventListener('contextmenu', function(e) {
      e.preventDefault()
    })
    // 浏览器内任意一处鼠标左击,隐藏右键菜单
    document.documentElement.addEventListener('click', () => {
      if (this.showMenu) {
        this.showMenu = false
      }
    })
  }
}
</script>

<style lang="scss">
  .tree {
    margin-top: 20px;
    width: 100%;
    // position: relative;
    border: 1px solid #ccc;
    min-height: 800px;
    .left {
      width: 50%;
      height: 800px;
      border-right: 1px solid #ccc;
      z-index: 1;
      position: relative;
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
      }
    }
  }
</style>