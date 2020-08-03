import $ from "jquery";
import { SolutionKey } from "./SolutionKey"

class SolutionBoard {
  height: number = 0;
  width: number = 0;
  rootElement: any = null;
  clearTextData: Array<Array<string>> = [];
  solutionKey: SolutionKey;
  constructor() {
    this.rootElement = null
    this.solutionKey = new SolutionKey()
  }
  sayHello() {
    return 'hello'
  }
  setSolutionKey(solutionKey: SolutionKey) {
    this.solutionKey = solutionKey
  }
  setRootElement(element: any) {
    this.rootElement = element
  }
  init(height: number, width: number) {
    this.height = height
    this.width = width
    let tHeadTr = $("thead tr", this.rootElement)
    for (let x = 0; x < this.width; x++) {
      $("thead tr", this.rootElement).append($('<th scope="row">').append(`${x}`));
    }
    for (let i = 0; i < this.height; i++) {
      let row: Array<string> = []
      for (let j = 0; j < this.width; j++) {
        row.push('')
      }
      this.clearTextData.push(row)
    }
    this.render()
  }
  render() {
    let tbody = $("tbody", this.rootElement)
    for (let i = 0; i < this.clearTextData.length; i++) {
      let row = $('<tr>');
      // console.log(`adding row ${i}`)
      for (let j = 0; j < this.clearTextData[i].length; j++) {
        // console.log(`adding column ${j}`)
        row.append($("<td>").append(''))
      }
      tbody.append(row);
    }
  }
  rerender(solutionKey: any, updatedCipherData: any) {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        let englishChar = solutionKey.resolveZodiacChar(updatedCipherData[i][j])
        let currentClearTextChar = this.clearTextData[i][j]
        if (englishChar != currentClearTextChar) {
          $("#solution-board tbody tr").eq(i).find('td').eq(j).text(englishChar)
        }
      }
    }
    this.clearTextData = updatedCipherData
  }
}

export {
  SolutionBoard
};