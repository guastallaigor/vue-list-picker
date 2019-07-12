<template>
  <div class="vue-list-picker">
    <div class="list-picker-container list-picker-left">
      <div class="list-picker-title">{{ titleLeft }}</div>
      <div class="list-picker-panel" ref="moverleft">
        <div class="list-picker-item"
          v-for="item in unselectedItems"
          :key="item[attrKey]"
          :class="{'list-picker-selected': item.isSelected}"
          @click="selectUnselectItem(item, unselectedItems)"
          @mousemove="selectItem(item, selectedItems)"
          @mousedown="startDrag"
          >
          {{ item[attrContent] }}
        </div>
      </div>
    </div>
    <div class="list-picker-actions">
      <button @click="moveAllRight">
        <img src="../assets/chevrons-right.svg" alt="Chevrons right">
      </button>
      <button @click="moveRight" class="mb-25">
        <img src="../assets/chevron-right.svg" alt="Chevron right">
      </button>
      <button @click="moveLeft">
        <img src="../assets/chevron-left.svg" alt="Chevron left">
      </button>
      <button @click="moveAllLeft" class="mb-25">
        <img src="../assets/chevrons-left.svg" alt="Chevrons left">
      </button>
      <button @click="unselectedAll">
        <img src="../assets/x.svg" alt="X icon">
      </button>
    </div>
    <div class="list-picker-container list-picker-right">
      <div class="list-picker-title">{{ titleRight }}</div>
      <div class="list-picker-panel" ref="moverright">
        <div class="list-picker-item"
          v-for="item in selectedItems"
          :key="item[attrKey]"
          :class="{'list-picker-selected': item.isSelected}"
          @click="selectUnselectItem(item, selectedItems)"
          @mousemove="selectItem(item, selectedItems)"
          @mousedown="startDrag"
          >
          {{ item[attrContent] }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VueListPicker',
  props: {
    titleLeft: {
      type: String,
      default: 'Items available'
    },
    titleRight: {
      type: String,
      default: 'Items selected'
    },
    movedItemLocation: {
      type: String,
      default: 'top'
    },
    leftItems: {
      type: Array,
      default: () => ([])
    },
    rightItems: {
      type: Array,
      default: () => ([])
    },
    attrKey: {
      type: String,
      default: 'key'
    },
    attrContent: {
      type: String,
      default: 'content'
    }
  },
  data: () => ({
    loading: false,
    dragging: false,
    lastMovedItem: null
  }),
  computed: {
    unselectedItems: {
      get () {
        return this.leftItems
      },
      set (val) {
        this.$emit('leftItems:update', val)
      }
    },
    selectedItems: {
      get () {
        return this.rightItems
      },
      set (val) {
        this.$emit('rightItems:update', val)
      }
    }
  },
  created () {
    this.unselectedItems = this.unselectedItems.map(it => ({ ...it, isSelected: false }))
    this.selectedItems = this.selectedItems.map(it => ({ ...it, isSelected: false }))
  },
  mounted () {
    document.addEventListener('mouseup', this.stopDrag)
  },
  beforeDestroy () {
    document.removeEventListener('mouseup', this.stopDrag)
  },
  methods: {
    startDrag () {
      this.dragging = true
    },
    stopDrag () {
      this.dragging = false
    },
    selectUnselectItem (item, items) {
      this.setItem(item, items, !item.isSelected)
    },
    setItem (item, items, val) {
      let itemBase = item

      if (items.length && !itemBase) {
        itemBase = items[0]
      }

      if (!itemBase) return

      itemBase.isSelected = val
      this.$forceUpdate()
    },
    selectItem (item, items) {
      if (this.dragging) {
        const VALUE_IS_SET_TO_TRUE = true
        this.setItem(item, items, VALUE_IS_SET_TO_TRUE)
      }
    },
    moveRight () {
      this.moveOne(this.unselectedItems, this.selectedItems, 'moverleft')
    },
    moveLeft () {
      this.moveOne(this.selectedItems, this.unselectedItems, 'moverright')
    },
    unselect (items) {
      if (!items.length) return

      items.forEach(it => {
        it.isSelected = false
      })
      this.$forceUpdate()
    },
    unselectedAll () {
      this.unselect(this.unselectedItems)
      this.unselect(this.selectedItems)
    },
    moveOne (firstArray, secondArray, refsName) {
      const items = firstArray.filter(itm => itm.isSelected)
      if (!items || !items.length) return

      items.forEach(item => {
        firstArray.forEach((it, idx) => {
          if (it[this.attrKey] === item[this.attrKey]) {
            firstArray.splice(idx, 1)

            if (this.movedItemLocation === 'top') {
              secondArray.unshift(it)
              this.$refs[refsName].scrollTop = 0
            } else {
              secondArray.push(it)
            }
          }
        })
      })

      this.unselectedAll()
    },
    moveAllRight () {
      this.moveAll(this.unselectedItems, this.selectedItems)
    },
    moveAllLeft () {
      this.moveAll(this.selectedItems, this.unselectedItems)
    },
    moveAll (firstArray, secondArray) {
      for (let i = firstArray.length - 1; i >= 0; i--) {
        let item = firstArray[i]
        firstArray.splice(i, 1)
        secondArray.push(item)
      }

      this.unselectedAll()
    }
  }
}
</script>

<style scoped>
.vue-list-picker {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  display: flex;
  flex-flow: row nowrap;
  cursor: default;
}
.vue-list-picker .list-picker-container {
  flex: 1 1 auto;
  border: 1px solid #ddd;
  background: #f9f9f9;
  border-radius: 3px;
  overflow: auto;
  display: flex;
  flex-direction: column
}
.vue-list-picker .list-picker-panel {
  min-height: 400px;
  overflow-y: auto;
}
.vue-list-picker .list-picker-item::selection {
  background: unset;
}
.vue-list-picker .list-picker-actions {
  flex: 0 0 auto;
  align-self: center;
  padding: 0 15px;
}
.vue-list-picker .list-picker-actions > button {
  min-width: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.vue-list-picker .list-picker-item,
.vue-list-picker .list-picker-selected,
.vue-list-picker .list-picker-title {
  padding: 8px 10px;
  border-bottom: 1px solid #ccc;
}
.vue-list-picker .list-picker-title {
  background:#fafafa;
  color: #0052c0;
  font-size: 1.1em;
  font-weight: 600;
  text-align: center;
}
.vue-list-picker .list-picker-selected {
  background: #0052c0;
  color: #F0F0F0;
  font-weight: 600;
}
.vue-list-picker .mb-25 {
  margin-bottom: 25px;
}
</style>
