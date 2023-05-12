const box=document.querySelector(".box")
const input= document.querySelector("input")
const submitButton=document.querySelector("form button")



//function bot msg box creater

function botMsgBoxGenerator(reply) {
     //bot msg box create
     const botmsgContainer= document.createElement("div")
     botmsgContainer.classList.add("messageContainer")

     box.append(botmsgContainer)

     const botcircleDiv=document.createElement("div")
     botcircleDiv.classList.add("circle")
     botmsgContainer.append(botcircleDiv)
     
    

    const botimg= document.getElementsByTagName("template")[0].content.cloneNode(true)
     botcircleDiv.append(botimg)
     
     const botmsgBox= document.createElement("div")
     botmsgBox.classList.add("messege")
     botmsgBox.innerHTML=reply
     botmsgContainer.append(botmsgBox)
}

// user msg box generator function
 function userMsgBoxGenerator(msg) {
    const msgContainer= document.createElement("div")
    msgContainer.classList.add("messageContainer")
    msgContainer.classList.add("sender")
    box.append(msgContainer)

    const circleDiv=document.createElement("div")
    circleDiv.classList.add("circle")
    msgContainer.append(circleDiv)

    // const img =document.createElement("img")
    // img.setAttribute("src","https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png")
    const img= document.getElementsByTagName("template")[1].content.cloneNode(true)
    circleDiv.append(img)

    const msgBox= document.createElement("span")
    msgBox.innerHTML=msg
    msgContainer.append(msgBox)
 }



function submitHandler(e){
    
    e.preventDefault()

    const usermsg=input.value;
    

    
if(usermsg!==""){

    //sender part
   userMsgBoxGenerator(usermsg)

    //bot part

    /*
    reply fetch accourding to msg (API)
    1. data fetch
    2. filter where msg == data.prompt
    3. bot reply data(reply)  add

    */


        fetch("https://my-json-server.typicode.com/navinkrv/json-server-db/botData")
        .then(function(response){
            return response.json()
        }).then((finalData)=>{
                // console.log(finalData);

            const matchData=    finalData.filter((item)=>{
                // console.log(item);
                    return item.prompt ==usermsg
                })
                // console.log(matchData[0]);

                if(matchData.length!=0){
                    
                   botMsgBoxGenerator(matchData[0].reply)
                }
                else{
                    const reply="Hum abhi kuch nahi bolenge hum abhi dispression me hain!"
                    botMsgBoxGenerator(reply)
                }
                    
                })

    }

// input box clear
input.value=""

//auto down scroll
// window.scrollTo(0, document.querySelector("main").scrollHeight);
document.querySelector(".box>div:last-child").scrollIntoView(false)

}

document.querySelector("form").addEventListener("submit",submitHandler);
// function submitHandler(e) {
//     e.preventDefault();
//     console.log("clicked");
// }





