const socketIo = io();

function get(id) {
    return document.getElementById(id);
}

function show(elem) {
    elem.classList.remove('hidden');
}

function hide(elem) {
    elem.classList.add('hidden');
}

const loginForm = get('loginForm');
const usernameInput = get('usernameInput');
const chatWindow = get('chatWindow');
const chatBody = get('chatBody');
const chatTypingMessage = get('chatTypingMessage');
const recipientSelection = get('recipientSelection');
const chatInputForm = get('chatInputForm');
const messageInput = get('messageInput');

let lastWriter;

loginForm.addEventListener('submit', e => {
    e.preventDefault();
    socketIo.emit('login', usernameInput.value, callbackData => {
        if (callbackData) {
            get('loginErrorMessage').innerText = callbackData;
        } else {
            hide(loginForm);
            show(chatWindow);

        }
    });
    usernameInput.value = '';
});


// in a textarea, the default event on pressing Enter is to create a new line.
// therefore we have a handler to prevent that behavior, as well as one to handle
// submitting the form with the Send button
chatInputForm.addEventListener('submit', e => {
    e.preventDefault();
    submitMessage();
})

messageInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        e.preventDefault();
        submitMessage();
    } else {
        socketIo.emit('clientTypingMessage');
    }
})

function submitMessage() {
    // console.log(recipientSelection.value);
    socketIo.emit('clientMessage', {message: messageInput.value, recipient: recipientSelection.value});
    messageInput.value = '';
}

socketIo.on('newChatter', name => {
    const newOption = document.createElement('option');
    newOption.value = name;
    newOption.innerText = name;
    recipientSelection.appendChild(newOption);
})

socketIo.on('serverMessage', msg => {
    // console.log(msg);
    chatTypingMessage.innerText = '';

    const msgWriterHtml = lastWriter !== msg.name ? `<div class="messageWriter">${msg.name} wrote:</div>` : '';
    const msgHtml = `
    <div class="messageContainer">
        ${msgWriterHtml}
        <div class="messageTime">${msg.time}</div>
        <div class="messageText">${msg.msg}</div>
    </div>`;
    chatBody.innerHTML += msgHtml;
    chatBody.scrollTo(0, chatBody.scrollHeight);
    lastWriter = msg.name;
})

socketIo.on('serverTypingMessage', name => {
    console.log(name, 'is typing');
    if (!chatTypingMessage.innerText) {
        chatTypingMessage.innerText += `${name} is typing...`
        setTimeout(() => chatTypingMessage.innerText = '', 2000);
    }
})