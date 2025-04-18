var stompClient=null

function sendMessage(){
    let jsonOb={
        name:localStorage.getItem("name"),
        content:$("#message-value").val()
    }
    stompClient.send("/app/message",{},JSON.stringify(jsonOb));
}



function connect()
{
    let socket=new SockJS("/chat")
    stompClient=Stomp.over(socket)
    stompClient.connect({},function(frame){
        console.log("Connected : "+frame)
        $("#name-from").addClass('d-none')
        $("#chat-room").removeClass('d-none')
        stompClient.subscribe("/topic/return-to",function(response){
            showMessage(JSON.parse(response.body))
        })
    })
}

function showMessage(message)
{
    $("#message-container-table").prepend(`<tr><td><b>${message.name} :</b> ${message.content}</td></tr>`)
}

$(document).ready((e)=>{
    $("#login").click(()=>{
        let name=$("#name-value").val()
        localStorage.setItem("name",name)
        $("#name-title").html(`Welcome , <b>${name} </b>`)
        connect();
    })

    $("#send-btn").click(()=>{
        sendMessage()
    })

    $("#logout").click(()=>{
        localStorage.removeItem("name")
        if(stompClient!==null)
        {
            stompClient.disconnect()
            $("#name-from").removeClass('d-none')
            $("#chat-room").addClass('d-none')
            console.log(stompClient)
        }
    })
})
// Star Animation Controller
function createStar() {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
    star.style.animationDelay = Math.random() * 2 + 's';
    document.getElementById('stars').appendChild(star);

    setTimeout(() => star.remove(), 3000);
}

// Initialize star animation
document.addEventListener('DOMContentLoaded', () => {
    setInterval(createStar, 100);
});