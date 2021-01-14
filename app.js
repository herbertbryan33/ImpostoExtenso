var Twitter = require('twitter');
var extenso = require('extenso')
require('dotenv').config()


const T = new Twitter({
    consumer_key:         process.env.BOT_CONSUMER_KEY,
    consumer_secret:      process.env.BOT_CONSUMER_SECRET,
    access_token_key:     process.env.BOT_ACCESS_TOKEN,
    access_token_secret:  process.env.BOT_ACCESS_TOKEN_SECRET,
})

T.stream('statuses/filter', {follow: '1248284868481556480'},  function(stream) {
  stream.on('data', function(tweet) {    
    T.post('statuses/update', {in_reply_to_status_id: tweet.id_str, status: "@impostometrobot " + stringExtenso(tweet.text)}, (err, data, response) =>{
      if(err){
        console.log(err)
      }
      else{
      console.log("foi")
      }
    })
  }) 
  stream.on('error', function(error) {
    console.log(error)
  })
})

T.stream('statuses/filter',{track: '@Impostoextenso'},  function(stream) {
  stream.on('data', function(tweet){
    T.post('statuses/update', {status: "@" + tweet.user.screen_name + " " + stringExtenso(tweet.text.slice(16)), in_reply_to_status_id:tweet.id_str }, (err, data, response) =>{
      if(err){
        console.log(err)
      }
      else{
        console.log(tweet.user.screen_name)
      }
    })
    
  })
  stream.on('error', function(error) {
    console.log(error)
  })
})


function  stringExtenso(string){

  var postTexto = string
  console.log(postTexto.indexOf(',') +2)
  postTexto= postTexto.slice(3, postTexto.indexOf(',') +3)
  console.log(postTexto)
  postTexto = extenso(postTexto, { mode: 'currency', currency: { type: 'BRL' } })
  postTexto = postTexto.replace("de ", "")
  console.log(postTexto)

  return postTexto
  


}


