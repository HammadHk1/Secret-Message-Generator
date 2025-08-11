/*

        Simple Program to Display Random Secret Message
        from the file 'secret_message.txt' and Display
        it on the webpage when the button is clicked.

*/



// Async Function to read file and return some random text
async function readTextFile(file) {
  try {
    const response = await fetch(file);
    const text = await response.text();
    const messages = text.split('\n').map(line => line.trim()).filter(line => line);
    let index = getRandomNumber();
    return messages[index];
  } catch (err) {
    console.error('Error reading file:', err);
  }
}


// Function to get a random number between 1 and 50
function getRandomNumber(){
    return Math.floor(Math.random() * 50) + 1;
}

// Function to read messages from the file
async function readfile(){
    const messages = await readTextFile("Content/File/messages.txt");
    return messages;
}


document.getElementById('messageForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  const name = document.getElementById('messageInput').value.trim();
  console.log(name);
  try {
    const secretMessage = await readfile();
    const cleanedText = secretMessage.replace(/^\d+\.\s*/gm, '');
    document.getElementById('userName').textContent = `Hi ${name}, here's your secret message: `;
    document.getElementById('secretMessageText').textContent = cleanedText;
  } catch (error) {
    console.error('Error generating message:', error);
    document.getElementById('secretMessageText').textContent = 'Error generating your secret message';
  }
});



