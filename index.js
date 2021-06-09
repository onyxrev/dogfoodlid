const dictionaryTable = (function(){
  let key;

  return [
    "dog",
    "food",
    "lid",
    "dildo",
    "god",
    "of"
  ].reduce(function(memo, word){
    key = word.split('').sort().join('');
    memo[key] = memo[key] || [];
    memo[key].push(word);
    return memo;
  }, {});
})();

function Anagram(text){
  this.text = text;
  this.material = text.split('');
}

Anagram.prototype.variations = function(){
  let remainingMaterial = this.material;
  let variations = [];
  let matchedWidth;

  while (remainingMaterial.length > 0){
    let matches = Anagram.findMatchesInMaterial(remainingMaterial, 1);

    if (!matches) return variations;

    matchedWidth = matches[0].length;
    remainingMaterial = remainingMaterial.slice(matchedWidth, remainingMaterial.length);
    variations.push(matches);
  }

  return variations;
};

Anagram.findMatchesInMaterial = function(material, width){
  let query = material.slice(0, width).sort().join('');
  let result = dictionaryTable[query];
  console.log("!!!!", "width", width, "query", query, "matches", result);

  // found? return the matches
  if (result) return result;

  // end of material? give up
  if (width === material.length) return;

  // not found but still more material? expand the search
  return Anagram.findMatchesInMaterial(material, width + 1);
};

const anagram = new Anagram("dogfoodlid");
console.log(anagram.variations());
