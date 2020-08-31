<template>
  <div class="table">
    <div class="title">
      <h1>2020世界一线城市排名</h1>
      <el-button type="primary" @click="multipleTableDataDelete">跨表多选删除</el-button>
    </div>
    <div class="bodyCard">
      <el-card class="box-card" v-for="(val, key) in tableData" :key="key">
        <!-- 卡片名称 -->
        <div slot="header" class="clearfix">
          <span>{{ val.level }}</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="singleTableDataDelete(key)">表内多选删除</el-button>
        </div>
        <!-- 表格 -->
        <el-table ref="multipleTable" :data="val.cities" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange(key, $event)">
          <el-table-column type="selection" width="100" align="center"></el-table-column>
          <el-table-column prop="grade" label="排名" align="center" sortable></el-table-column>
          <el-table-column prop="eng" label="英文名" align="center" sortable></el-table-column>
          <el-table-column prop="cnn" label="中文名" align="center" sortable :sort-method="chinaNameSort"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100" align="center">
            <template slot-scope="scope">
              <el-button @click="handleClick(key, scope.$index)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          level: 'Alpha ++',
          cities: [
            {
              eng: 'London',
              cnn: '伦敦',
              grade: 1
            }, {
              eng: 'New York',
              cnn: '纽约',
              grade: 2
            }
          ]
        }, {
          level: 'Alpha +',
          cities: [
            {
              eng: 'Hong Kong',
              cnn: '香港',
              grade: 3
            }, {
              eng: 'Singapore',
              cnn: '新加坡',
              grade: 4
            }, {
              eng: 'Shanghai',
              cnn: '上海',
              grade: 5
            }, {
              eng: 'Beijing',
              cnn: '北京',
              grade: 6
            }, {
              eng: 'Dubai',
              cnn: '迪拜',
              grade: 7
            }, {
              eng: 'Paris',
              cnn: '巴黎',
              grade: 8
            }, {
              eng: 'Tokyo',
              cnn: '东京',
              grade: 9
            }
          ]
        }, {
          level: 'Alpha',
          cities: [
            {
              eng: 'Sydney',
              cnn: '悉尼',
              grade: 10
            }, {
              eng: 'Los Angeles',
              cnn: '洛杉矶',
              grade: 11
            }, {
              eng: 'Toronto',
              cnn: '多伦多',
              grade: 12
            }, {
              eng: 'Mumbai',
              cnn: '孟买',
              grade: 13
            }, {
              eng: 'Amsterdam',
              cnn: '阿姆斯特丹',
              grade: 14
            }, {
              eng: 'Milan',
              cnn: '米兰',
              grade: 15
            }, {
              eng: 'Frankfurt',
              cnn: '法兰克福',
              grade: 16
            }
          ]
        }
      ],
      prepareDeleteData: []
    }
  },
  methods: {
    handleSelectionChange(key, selection) {
      // 多选框不为空
      if (selection.length > 0) {
        this.prepareDeleteData[key] = []
        selection.forEach(ele => {
          this.prepareDeleteData[key].push(ele.eng)
        })
      } else {
        this.prepareDeleteData[key] = selection
      }
    },
    // 单条数据删除
    handleClick(key, index) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData[key].cities.splice(index, 1)
        setTimeout(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }, 100)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })        
      })
    },
    // 表内多选删除
    singleTableDataDelete(key) {
      if (this.prepareDeleteData[key].length === 0) {
        this.$message({
          message: '没有数据可删!',
          type: 'warning'
        })
      } else {
        this.prepareDeleteData[key].forEach(ele => {
          this.tableData[key].cities.forEach((city, index2) => {
            if (city.eng === ele) {
              this.tableData[key].cities.splice(index2, 1)
            }
          })
        })
      }
    },
    // 跨表多选删除
    multipleTableDataDelete () {
      let obj = {count: 0}
      this.prepareDeleteData.forEach((arr, index) => {
        if (arr.length > 0) {
          arr.forEach(ele => {
            this.tableData[index].cities.forEach((city, index2) => {
              if (city.eng === ele) {
                this.tableData[index].cities.splice(index2, 1)
              }
            })
          })
        } else {
          obj.count++
        }
      })
      if (obj.count === this.prepareDeleteData.length) {
        this.$message({
          message: '没有数据可删!',
          type: 'warning'
        })
      }
    },
    chinaNameSort(a, b) {
      return (a.cnn).localeCompare(b.cnn)
    }
  },
  created () {
    for(var i = 0; i < this.tableData.length; i++) {
      this.prepareDeleteData.push([])
    }
  }
}
</script>

<style lang="scss">
  .table {
    width: 100%;
    margin-top: 20px;
    .title {
      width: 100%;
      position: relative;
      h1 {
        // display: inline-block;
        // position: relative;
        // left: 50%;
        // transform: translate(-50%);
        display: inline-block;
        margin: 0 auto;
      }
      .el-button {
        position: absolute;
        right: 0;
      }
    }
    .bodyCard {
      height: 700px;
      overflow-x: auto;
      margin-top: 20px;
    }
    .el-card {
      margin: 10px auto 20px auto
    }
  }
</style>