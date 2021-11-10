const fs = require('fs')

let GurbaniData = [];

for (let index = 1; index <= 104; index++) {
  let bani = index;
  let Gurbani = require(`./data/${bani}.json`)

  let commons = [];
  let paragraphs = new Set();

  Gurbani.forEach((verse) => {
    let filtered = Gurbani.filter(obj => {
      return obj.paragraph === verse.paragraph
    })

    let set = new Set();
    set.add(filtered)

    commons.push(set);
  })

  let GurbaniObject = {
    id: 0,
    baniID: 0,
    gurmukhi: ``,
    gurmukhiUni: ``,
    english: ``,
    punjabi: ``,
    punjabiUni: ``,
    hindiUni: ``,
    spanish: ``,
    header: 0
  }

  commons.forEach(set => {
    let data = [...set][0]

    let id = 0
    let baniID = bani
    let gurmukhi = ``
    let gurmukhiUni = ``
    let english = ``
    let punjabi = ``
    let punjabiUni = ``
    let hindiUni = ``
    let spanish = ``
    let header = 0

    data.forEach(row => {
      id = row.paragraph
      baniID = bani
      gurmukhi += row.gurmukhi+' '
      gurmukhiUni += row.gurmukhiUni+' '
      english += row.english+' '
      punjabi += row.punjabi+' '
      punjabiUni += row.punjabiUni+' '
      hindiUni += row.hindiUni+' '
      spanish += row.spanish+' '
      header = row.header
    });

    let object = Object.create(GurbaniObject);
    object.baniID = baniID
    object.gurmukhi = gurmukhi.toString().trim().includes('null') ? null : gurmukhi.toString().trim()
    object.gurmukhiUni = gurmukhiUni.toString().trim().includes('null') ? null : gurmukhiUni.toString().trim()
    object.english = english.toString().trim().includes('null') ? null : english.toString().trim()
    object.punjabi = punjabi.toString().trim().includes('null') ? null : punjabi.toString().trim()
    object.punjabiUni = punjabiUni.toString().trim().includes('null') ? null : punjabiUni.toString().trim()
    object.hindiUni = hindiUni.toString().trim().includes('null') ? null : hindiUni.toString().trim()
    object.spanish = spanish.toString().trim().includes('null') ? null : spanish.toString().trim()
    object.header = header

    if(!paragraphs.has(id)){
      GurbaniData.push(object)
      paragraphs.add(id)
    }
  });
  
}

fs.writeFileSync('banis_.json', JSON.stringify(GurbaniData, null, 4));