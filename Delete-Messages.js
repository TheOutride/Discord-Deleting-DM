// Updated by TheOutride - Working as of Jan 21st, 2019
// Credit to: Altoids1 (Original code), GotEnouth (Updated code, this version isn't based off his)

var lastmsg = "numbers" // Copy the ID of the newest message you want to be cleared
var youruser = "username" // Your username. Do not use the # symbol or the four numbers after it.
var i = 0; // Keeps track of how many messages of yours it deletes. Not necessary, but cool info
clearMessages = function(){
	const authToken = "your_token_here"
	/*To get your authentication token:
		On your browser go to any discord conversation/server. Press F12.
	   	On the desktop app, the dev tool key is CTRL + SHIFT + i.
		Delete a message. Under the 'Network' tab, should be the last entry but look for the shortest entry
			*It should be an entry of JUST numbers
		Scroll down to 'Request Headers' on the right menu
		Look for 'authorization'. Thats your authToken. DO. NOT. SHARE. THIS. KEY. At all. With anyone.
	*/
	const channel = "morenumbers"; 
	// ^ This you can get from the URL that shows up in the browser version of discord; it's the ~18-digit number
	
/*
MAKE SURE ALL OF THE IDS ARE GIVEN AS STRINGS, NOT LITERAL NUMBERS! (aka keep them inside the "")
OTHERWISE, JAVASCRIPT WILL ROUND THEM A LITTLE, CAUSING STUPID FUCKIN 404 ERRORS
*/
   const baseURL = "https://discordapp.com/api/channels/" + channel + "/messages";
	const headers = {"Authorization": authToken };

	let clock = 0;
	let interval = 500;

	function delay(duration) {
		return new Promise((resolve, reject) => {
			setTimeout(() => resolve(), duration);
		});
	}

	fetch(baseURL + "?before=" + lastmsg, {headers, method: 'GET'})// Fetch the message data from discord
		.then(resp => resp.json()) // Make it into a json
		.then(messages => { // Call that json "messages" and do this function with it as the parameter:
			if(typeof messages == "undefined")
			{
				console.log("Yeah, you fucked one of your IDs up, son.");
				throw new Error();
			}
			return Promise.all(messages.map(
			(message) => { // Call this function for all messages we got
				lastmsg = message.id
				for(x=0; x<1000 ;x++)
				{
					if(message.author.username == youruser){ // Checks to see if message was yours
					console.log("Completed: " + i)
					i++;
					return delay(clock += interval).then(() => fetch(`${baseURL}/${message.id}`, {headers, method: 'DELETE'}));
					}
				else // if the message wasnt yours, it doesnt attempt to delete it, and prints the following
				{
					console.log("Skipped message from other user");
					return
					// Chrome's console groups up 'same' logs. If this prints out 3 times, it'll say:
					// (3) Skipped message from other user"). You can make a var like i and track how 						// many it skips. But beware it will spam your console log. 
				}
				}
			}));
		}).then(() => clearMessages()); // And once we've deleted all the messages we can see, ask for more!
}
clearMessages();
