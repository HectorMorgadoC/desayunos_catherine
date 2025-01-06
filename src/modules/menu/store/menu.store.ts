import { useLocalStorage } from "@vueuse/core"
import { dataMenu } from "../actions/menuAction"
import { defineStore } from "pinia"

export const useMenuStore = defineStore("menu", () => {

const decriptionMenu = async() => {
  try {
    const listMenu = await dataMenu()
    console.log(listMenu)
    const menuData = useLocalStorage('menuData',listMenu).value
    return menuData
  } catch (error) {
    throw new Error(`No se pudo obtener el menú ${error}`)
  }

}

return {
  decriptionMenu
}

})


