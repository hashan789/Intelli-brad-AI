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
        sendBtn.addEventListener()
    }
}