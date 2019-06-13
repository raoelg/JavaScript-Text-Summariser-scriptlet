
function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}

function myTextSummary(txt, strength) {
  strength = strength || 0.5
  strength = strength < 0 ? 0 : strength > 1 ? 1 : strength;
  
  txt = txt.replace(/([A-Z]\w{,5})\./g, "$1")
  
  let re = /(?<=\b[0-9a-z)\]]+(\.|\?|!))\s+(?=[A-Z]\w+)|(?<=\w+)\n[A-Z]/g
  let sentences = txt.split(re)
  sents_toknzd = sentences.map( x => x.toLowerCase().split(/\W+/g))

  sents_tf = sents_toknzd.map(x => {tf={};x.map(w => tf[w] = tf[w] ? tf[w]+1:1);mx=-Infinity; for(var k in tf) mx = tf[k] > mx ? tf[k] : mx; for(k in tf) tf[k] = 0.5 + 0.5 * tf[k] / mx; return tf})
  sents_df = {}; for(var i=0; i < sents_tf.length; i++) for (var w in sents_tf[i]) sents_df[w] = sents_df[w] ? sents_df[w]+1 : 1;
  sents_tfidf = []; 
  for(let i=0; i < sents_tf.length; i++) {
    sents_tfidf[i]=0; 
    for(let w in sents_tf[i]) sents_tfidf[i] += sents_tf[i][w] * Math.log(sents_tf.length / sents_df[w]);
  }
  
  mx = Math.max.apply(null, sents_tfidf)
  let summary = ""; 
  for(let i=0; i < sentences.length; i++) summary += sents_tfidf[i] > strength*mx ? sentences[i] + "\n\n" : " "

  s = [...sents_tfidf]
  s.sort((a,b)=>a-b)
  return {strength: strength, n:s.length, max: s[s.length-1], min: s[0], median: s.length %2 ? (s[s.length/2-0.5]+s[s.length/2+0.5])/2 : s[s.length/2], mean: s.reduce((x,y) => x+y) / s.length, summary: summary, s: s}
}



var pre = document.createElement('textarea')
pre.style = 'z-index:99999; width: 150%; height: 80%; display: block;background-color: #ffffffdd; color: #555533'
pre.value = 'Bla bla bla bla'
var stats = document.createElement('div')
stats.style = 'z-index:99999; background-color: white; font-size: 10%;';
var slider = document.createElement('input')
slider.setAttribute('type','range')
slider.setAttribute('min','0')
slider.setAttribute('max','100')
slider.setAttribute('value','50')
slider.addEventListener('change', function(e) {let res = myTextSummary(getSelectionText(), slider.value / 100); pre.value = res.summary; stats.innerHTML = 'stength: '+res.strength + ', # sentences: ' + res.n;})
var container = document.createElement('div')
container.style = 'z-index:0; position: fixed; top: 0; left: 0;'
container.appendChild(slider)
container.appendChild(pre)
container.appendChild(stats)
document.body.appendChild(container)
