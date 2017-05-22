chrome.app.runtime.onLaunched.addListener(function() {
	//chrome.browser.openTab({url: "squares.html"});
	//window.open("squares.html");
	//chrome.tabs.create({string: 'squares.html'});
	chrome.app.window.create('squares.html', {
		id: 'squares',
		innerBounds : {
			width: 1024,
			height: 768
		}
	});
});