// 获取本地存储数据
export const getItem = name => {
  return JSON.parse(window.localStorage.getItem(name))
}
// 设置本地存储数据
export const setItem = (name, data) => {
  return JSON.parse(window.localStorage.setItem(name, JSON.stringify(data)))
}
// 删除本地存储数据
export const removeItem = name => {
  window.localStorage.removeItem(name)
}
