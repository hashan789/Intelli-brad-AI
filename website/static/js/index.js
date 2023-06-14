class Chatbox{
    constructor() {
        this.args = {
            openBtn: document.querySelector('.chatbox_button'),
            chatBox: document.querySelector('.chatbox_support'),
            sendBtn: document.querySelector('.send_button')
        }
    
    this.state = false;
    this.messages = [];

    }

    display(){
        const {openBtn, chatBox, sendBtn} = this.args;

        openBtn.addEventListener('click',() => this.toggleState(chatBox))
        sendBtn.addEventListener('click',() => this.onSendButton(chatBox))

        const node = chatBox.querySelector('input');
        node.addEventListener('keyup',({key}) => {
            if(key === 'Enter'){
                this.onSendButton(chatBox)
            }
        })
    }

    toggleState(chatbox){
        this.state = !this.state;

        if(this.state){
            chatbox.classList.add('chatbox-active')
        }
        else{
            chatbox.classList.remove('chatbox-active')
        }
    }

    onSendButton(chatbox){
        var textField = chatbox.querySelector('input');
        let text1 = textField.value;
        if (text1 == ""){
            return;
        }

        let msg1 = {
            name : "User",
            message : text1
        }
        this.messages.push(msg1);

        fetch($SCRIPT_ROOT + '/chat', {
            method : 'POST',
            body : JSON.stringify({
                message : text1
            }),
            mode : 'cors',
            headers : {
                'Content-Type' : 'application/json'
            },
        })
        .then(r => r.json())
        .then(r => {
            let msg2 = {
                name: 'Sam',
                message: r.answer
            };
            this.messages.push(msg2)
            this.updateChatText(chatbox)
            textField.value = ''
        }).catch((error) => {
            console.error('Error:', error);
            this.updateChatText(chatbox)
            textField.value = ''
        });
    }

    updateChatText(chatbox){
        var html = '';
        this.messages.slice().reverse().forEach(function(item,index){
            if(item.name === 'Sam'){
                html += '<div class="msg-item msg-item-visitor">' + item.message + '</div>'
            }
            else{
                html += '<div class="msg-item msg-item-operator">' + item.message + '</div>'
            }
        });

        const chatmessage = chatbox.querySelector('.chatbox-msg');
        chatmessage.innerHTML = html;
    }
}

const chatbox = new Chatbox();
chatbox.display();