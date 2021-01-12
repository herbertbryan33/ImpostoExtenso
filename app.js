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
      var postTexto = tweet.text
      postTexto = postTexto.slice(3)
      if(postTexto.indexOf('\n') == -1){
        postTexto = postTexto.slice(3)
        postTexto = extenso(postTexto, { mode: 'currency', currency: { type: 'BRL' } })
        postTexto = postTexto.replace("de", "")
        console.log(postTexto)

      }     
      else{
        postTexto= postTexto.slice(0, postTexto.indexOf('\n'))

        console.log(postTexto)
        postTexto = extenso(postTexto, { mode: 'currency', currency: { type: 'BRL' } })
        postTexto = postTexto.replace("de", "")
        console.log(postTexto)
      }


       T.post('statuses/update', {in_reply_to_status_id: tweet.id_str, status: "@impostometrobot " + postTexto}, (err, data, response) =>{
         if(err){
             console.log(err)
         }
    
         else{
            
             console.log("foi")
    
             }
     } )
    });
  
    stream.on('error', function(error) {
      console.log(error);
    });
  });

T.stream('statuses/filter',{track: '@Impostoextenso teste'},  function(stream) {
    stream.on('data', function(tweet){
    T.post('statuses/update', {status: "foi "}, (err, data, response) =>{
        if(err){
            console.log(err)
        }
   
        else{
           
            console.log("foi")
   
            }
        })
    
    } )
    stream.on('error', function(error) {
        console.log(error);
      })

})

