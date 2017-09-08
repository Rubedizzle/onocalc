import {autorun, observable} from "mobx"

class AppStore {
  @observable items = ["milk", "eggs"]
  @observable filter = ""
}

var store = window.store = new AppStore

export default store

autorun(() => {
  //console.log(store.filter)
  //console.log(store.items[0])  
})
