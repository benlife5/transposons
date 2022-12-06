// converts DFAM formatted data to parent-child tree


import data from "./treeChartData.js"
import fs from "fs"

const allItems = {}
const categories = new Set()
let max = 0
data.forEach((item) => {
  const cats = item.full_name.split(";")
  cats.forEach((cat, index) => {if(index !== cats.length - 1) categories.add(cat)})
  item.name = cats[cats.length - 1]
  const newItem = {...item, name: cats[cats.length - 1]}
  allItems[newItem.name] = newItem
  item.level = cats.length
})

const root = {name: "", children: [], level: 0}

const recursive = (currentRoot) => {
  // for (let i = 0; i < 11; i++) {
    data.forEach((item) => {
      const cats = item.full_name.split(";")
      // console.log(cats.length)
      if (cats.length === currentRoot.level + 1 && item.full_name.includes(currentRoot.name)) {
        // console.log(currentRoot)
        const newItem ={...item, children: []}
        currentRoot.children.push(newItem)
        recursive(newItem)
      }
    })
  // }
}

recursive(root)

root.name = "All"
var json = JSON.stringify(root);
fs.writeFile('new.json', json, 'utf8', () => {});



// const output = []

// data.forEach((item) => {
//   const cats = item.full_name.split(";")
//   if (cats.length === 1) {
//     const newItem = {name: item.title, children: {}, otherInfo: item}
//     root.
//   }
// })

// const recursive = (item, nameIndex, caller) => {
//   const cats = item.full_name.split(";")
//   if (nameIndex === cats.length) return
//   else if (nameIndex === cats.length -1) {
//     const newItem = {name: item.title, children: null, otherInfo: item}
//     caller.children.append(newItem)
//   } else {

//   }
// }