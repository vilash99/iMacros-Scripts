var jsLF = "\n";
var OpenCSV, macroConnect, macroScrape;

OpenCSV = "CODE:";
OpenCSV += "SET !TIMEOUT_STEP 1" + "\n";
OpenCSV += "SET !DATASOURCE {{folderPath}}" + "\n";
OpenCSV += "SET !DATASOURCE_COLUMNS 2" + "\n";
OpenCSV += "SET !DATASOURCE_LINE {{ROW}}" + "\n";
OpenCSV += "ADD !EXTRACT {{!COL1}}" + "\n";
OpenCSV += "ADD !EXTRACT {{!COL2}}" + "\n";


macroScrape = 'CODE:';
macroScrape += 'SET !ERRORIGNORE YES' + jsLF;
macroScrape += 'SET !TIMEOUT_STEP 60' + jsLF;
macroScrape += 'SET !TIMEOUT_MACRO 65' + jsLF;
macroScrape += "TAG POS=1 TYPE=INPUT:TEXT FORM=ID:domainform ATTR=ID:domain CONTENT={{KEYWORD}}" + jsLF;
macroScrape += 'TAG POS=1 TYPE=H1 ATTR=CLASS:pv-top-card-section__name* EXTRACT=TXT' + jsLF;


macroConnect = 'CODE:';
macroConnect += 'SET !ERRORIGNORE YES' + jsLF;
macroConnect += 'SET !TIMEOUT_STEP 60' + jsLF;
macroConnect += 'SET !TIMEOUT_MACRO 65' + jsLF;
macroConnect += 'TAG POS=1 TYPE=BUTTON ATTR=ID:ember*' + jsLF;
macroConnect += 'WAIT SECONDS=1' + jsLF;
macroConnect += 'TAG POS=1 TYPE=INPUT:EMAIL ATTR=ID:email CONTENT={{EMAIL}}' + jsLF;
macroConnect += 'WAIT SECONDS=1' + jsLF;
macroConnect += 'EVENT TYPE=KEYPRESS SELECTOR="HTML>BODY>DIV:nth-of-type(5)>DIV:nth-of-type(5)>DIV>DIV>DIV>SECTION>DIV>DIV>LABEL>INPUT" KEY=8' + jsLF;
macroConnect += 'WAIT SECONDS=1' + jsLF;
macroConnect += 'TAG POS=1 TYPE=BUTTON ATTR=TXT:Add<SP>a<SP>note' + jsLF;
macroConnect += 'WAIT SECONDS=1' + jsLF;
macroConnect += 'TAG POS=1 TYPE=TEXTAREA ATTR=ID:custom-message CONTENT={{msg}}' + jsLF;
macroConnect += 'WAIT SECONDS=1' + jsLF;
macroConnect += 'TAG POS=1 TYPE=BUTTON ATTR=TXT:Send<SP>invitation' + jsLF;
macroConnect += 'WAIT SECONDS=5' + jsLF;



var base_path = "C:\\linkedin\\";
var testNames = LoadFile(base_path + "names.txt");
var msg = LoadFile(base_path + "message.txt");
var database = LoadFile(base_path + "database.txt");
var keywords = LoadFile(base_path + "keywords.txt");


//msg = msg.trim();
//testNames=testNames.trim().split("\n");

testNames = testNames.toLowerCase();
testNames = ClearSpaces(testNames);
database = database.trim();

iimDisplay("Starting...")

main: {
	//variables declaration
	var ret = "";
	var CSVString = "";

	var skipPage = parseInt(prompt("Enter profile number to start.", 1));

	//////////////READ CSV////////////////////
	for(var page = skipPage+1; page <= 10000; ++page) {
		iimSet("ROW", page);
		iimSet("folderPath", base_path + "Input_Data.csv");
		ret = iimPlay(OpenCSV, 60);
		if (ret < 0) {
			break main;
		}

		var profileURL = "", profileEmail = "";

		profileURL = iimGetLastExtract(1);
		profileEmail = iimGetLastExtract(2);

		if(profileURL == null || profileURL == "undefined" || profileURL == "") {
			alert("No more profile left to connect!");
			break main;
		}

		////copy Name and URL//
		iimSet("link", profileURL);
		ret = iimPlay(macroScrape, 60);
		if (ret == -101) {
			break main;
		}

		var profileName = iimGetLastExtract(1);
		var tmpName = profileName.toString().toLowerCase();

		if ((testNames.indexOf(tmpName) == -1)) {
			var tmpMsg = "Hi,\n " + msg;

			var flag = Keywords(keywords, profileURL);

			if (flag == -101) {
				break main;
			}

			var msgSentTo, myDate;

			if (flag == false) {
				iimSet("msg", tmpMsg)
				iimSet("EMAIL", profileEmail + "_")
				ret = iimPlay(macroConnect, 60);

				if (ret == -101) {
					break main;
				}

				CSVString = '"' + profileName + '"' + "," + '"' + profileURL + '"';

				myDate = GetFormatedDate();
				msgSentTo = '"' + profileName + '"' + "," + '"' + profileURL + '"' + "," + '"' + myDate + '"';

				WriteFile(base_path + "database.txt", CSVString);
				WriteFile(base_path + "sent_connection_request.txt", msgSentTo);
			}
			else {
				CSVString = '"' + profileName + '"' + "," + '"' + profileURL + '"' + "," + '"SKIPPED!"';
				WriteFile(base_path + "database.txt", CSVString);
			}
		}

		if(page % 50 == 0) {
			var time = getRandomArbitary(600, 1800);
			ret = iimDisplay("Waiting for:" + time + " seconds.");

			if (ret == -101) { break main; }

			iimSet("time", time);
			ret = iimPlay("CODE:WAIT SECONDS={{time}}");

			if (ret == -101) { break main; }
		}

	}//End For: total url in CSV file.
} //end of label main


iimDisplay("Finished.")

function Keywords(keywords, link) {

	main : {

		var macroCurrentPast;

		macroCurrentPast = "CODE:";
		macroCurrentPast += "SET !ERRORIGNORE YES" + jsLF;
		macroCurrentPast += "SET !TIMEOUT_STEP 60" + jsLF;
		macroCurrentPast += "SET !TIMEOUT_MACRO 65" + jsLF;
		//macroCurrentPast += "URL GOTO={{link}}" + jsLF;
		macroCurrentPast += "TAG POS=1 TYPE=H2 ATTR=CLASS:pv-top-card-section__headline* EXTRACT=TXT" + jsLF;

		iimDisplay("Link: " + link)

		iimSet("link", link)
		ret = iimPlay(macroCurrentPast, 60);

		if (ret == -101) {
			break main;
		}

		var tmp = iimGetLastExtract(1);
		tmp = tmp.toLowerCase();

		keywords = keywords.trim();
		keywords = keywords.toLowerCase();
		keywords = keywords.split("\n");

		if (keywords.length == 1) {
			keywords = keywords + "\n" + keywords;
			keywords = keywords.split("\n");
		}

		var flagSecond = false;

		//check keywords
		for (var k = 0; k < keywords.length; k++) {

			var tmpKey = keywords[k];
			tmpKey = tmpKey.trim();

			if (tmp.indexOf(tmpKey) >= 0) {
				flagSecond = true;
				break;
			}
		}
		return flagSecond;
	}
	return ret;
}



//this function offers a set of options to select from
//items is an array of options
//title is the dialog title
//qustion is a question asked to user.

function Select(items, title, question) {

	var prompts = Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
		.getService(Components.interfaces.nsIPromptService);

	//var items = ["Articles", "Modules", "Both"]; // list items

	var selected = {};

	var check = {
		value: true
	};

	var result = prompts.select(null, title, question, items.length,
		items, selected);

	// result is true if OK was pressed, false if cancel. selected is the index of the item array
	// that was selected. Get the item using items[selected.value].

	var selected = items[selected.value];

	return selected;

}

//this function downloads a file from url
function downloadFile(httpLoc, path) {
	try {
		//new obj_URI object
		var obj_URI = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI(httpLoc, null, null);

		//new file object
		var obj_TargetFile = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);

		//set file with path
		obj_TargetFile.initWithPath(path);
		//if file doesn't exist, create
		if (!obj_TargetFile.exists()) {
			obj_TargetFile.create(0x00, 0644);
		}

		//new persitence object
		var obj_Persist = Components.classes["@mozilla.org/embedding/browser/nsWebBrowserPersist;1"].createInstance(Components.interfaces.nsIWebBrowserPersist);

		// with persist flags if desired
		const nsIWBP = Components.interfaces.nsIWebBrowserPersist;
		const flags = nsIWBP.PERSIST_FLAGS_REPLACE_EXISTING_FILES;
		obj_Persist.persistFlags = flags | nsIWBP.PERSIST_FLAGS_FROM_CACHE;
		/*
		var privacyContext = sourceWindow.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
		.getInterface(Components.interfaces.nsIWebNavigation)
		.QueryInterface(Components.interfaces.nsILoadContext);*/

		//save file to target
		obj_Persist.saveURI(obj_URI, null, null, null, null, obj_TargetFile, null);
	} catch (e) {
		alert(e);
	}
}

//This function load content of the file from a location
//Example: LoadFile("C:\\test\\test.txt")

function LoadFile(path) {

	try {
		Components.utils.import("resource://gre/modules/FileUtils.jsm");

		var file = new FileUtils.File(path);

		file.initWithPath(path);
		var charset = 'UTF8';
		var fileStream = Components.classes['@mozilla.org/network/file-input-stream;1']
			.createInstance(Components.interfaces.nsIFileInputStream);
		fileStream.init(file, 1, 0, false);
		var converterStream = Components.classes['@mozilla.org/intl/converter-input-stream;1']
			.createInstance(Components.interfaces.nsIConverterInputStream);
		converterStream.init(fileStream, charset, fileStream.available(),
			converterStream.DEFAULT_REPLACEMENT_CHARACTER);
		var out = {};
		converterStream.readString(fileStream.available(), out);
		var fileContents = out.value;
		converterStream.close();
		fileStream.close();

		return fileContents;
	} catch (e) {
		alert("Error " + e)
	}

}

//This function writes string into a file

function WriteFile(path, string) {
	try {
		//import FileUtils.jsm
		Components.utils.import("resource://gre/modules/FileUtils.jsm");
		//declare file
		var file = new FileUtils.File(path);

		//declare file path
		file.initWithPath(path);

		//if it exists move on if not create it
		if (!file.exists()) {
			file.create(file.NORMAL_FILE_TYPE, 0666);
		}

		var charset = 'UTF8';
		var fileStream = Components.classes['@mozilla.org/network/file-output-stream;1']
			.createInstance(Components.interfaces.nsIFileOutputStream);
		fileStream.init(file, 18, 0x200, false);
		var converterStream = Components
			.classes['@mozilla.org/intl/converter-output-stream;1']
			.createInstance(Components.interfaces.nsIConverterOutputStream);
		converterStream.init(fileStream, charset, string.length,
			Components.interfaces.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER);

		//write file to location
		converterStream.writeString("\r\n" + string);
		converterStream.close();
		fileStream.close();

	} catch (e) {
		alert("Error " + e)
	}

}

//this function creates file in location

function CreateFile(path) {
	try {

		//import FileUtils.jsm
		Components.utils.import("resource://gre/modules/FileUtils.jsm");
		//declare file
		var file = new FileUtils.File(path);

		//declare file path
		file.initWithPath(path);

		//if it exists move on if not create it
		if (!file.exists()) {
			file.create(file.NORMAL_FILE_TYPE, 0666);
		}
	} catch (e) {
		alert("Error " + e)
	}

}

//this function is to trim the string it takes and returns trimed string

function trim(str) {

	try {

		//if string is defined do the function
		if (str != null && str != "" && str != "undefined") {
			str = str.toString();
			return str.replace(/^\s+|\s+$/g, "");
		} else {
			return " ";
		}

	} catch (e) {
		alert("Error in function trim() " + e)
	}
}

//this function returns text between two strings using split command
function returnText(text, ref1, ref2) {

	if (text == null) {
		text = " ";
	}

	var var1 = text.split(ref1);

	if (var1 == null) {
		var1 = " ";
	}

	var var2 = var1[1];

	if (var2 == null) {
		var2 = " ";
	}
	var var3 = var2.split(ref2);
	if (var3 == null) {
		var3 = " ";
	}

	var result = var3[0];

	if (result == null) {
		result = "No result.";
	}

	return result;

}

/*
function that clears empty spaces in the string
It clears all multiple empty spaces and leaves only single
 */

function ClearSpaces(text) {
	if (text != null && text != "" && text != "undefined") {

		//infinite loop
		while (true) {
			//as long as there are 2 blank spaces replace them with just one
			if (text.search("  ") >= 0) {
				text = text.replace(/\s\s/g, " ");
			} else {
				break;
			}
		} //end of while loop

		//return text after formatting
		return text;
	} else {
		//in case string is empty or undefined return empty string
		return "";
	}

}

/**
 * Returns a random number between min and max
 */
function getRandomArbitary(min, max) {
	return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min and max
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function PickFile(title) {

	const nsIFilePicker = Components.interfaces.nsIFilePicker;

	var fp = Components.classes["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker);
	fp.init(window, title, nsIFilePicker.modeOpen);
	fp.appendFilters(nsIFilePicker.filterAll | nsIFilePicker.filterText);

	var rv = fp.show();
	if (rv == nsIFilePicker.returnOK || rv == nsIFilePicker.returnReplace) {
		var file = fp.file;
		// Get the path as string. Note that you usually won't
		// need to work with the string paths.
		var path = fp.file.path;
		// work with returned nsILocalFile...
		return path;

	}

}

function PickFolder(title) {

	try {

		var picker = Components.classes["@mozilla.org/filepicker;1"].createInstance(Components.interfaces.nsIFilePicker);
		picker.appendFilters(Components.interfaces.nsIFilePicker.filterAll);
		//folder
		picker.init(window, title, Components.interfaces.nsIFilePicker.modeGetFolder);
		//or file
		// picker.init (window, "Choice file", Components.interfaces.nsIFilePicker.modeOpen);
		if (picker.show() == Components.interfaces.nsIFilePicker.returnOK) {

			return picker.file.path;
		} else {
			return false;
		}

	} catch (e) {
		alert(e);
	}
}

function GetFormatedDate()
{
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; //January is 0!
	var yyyy = today.getFullYear();
	var hh = today.getHours();
	var minm = today.getMinutes();

	if(dd<10){
		dd='0'+dd
	}
	if(mm<10){
		mm='0'+mm
	}
	if(hh < 10) {
		hh = '0'+hh;
	}
	if(minm < 10) {
		minm = '0'+minm;
	}

	var today = dd+'/'+mm+'/'+yyyy + ' ' + hh + ':' + minm;

	return today;
}



/*
function Keywords(keywords, link) {

	main: {

		var macroCurrentPast;

		macroCurrentPast = "CODE:";
		macroCurrentPast += "SET !ERRORIGNORE YES" + jsLF;
		macroCurrentPast += "SET !TIMEOUT_STEP 1" + jsLF;
		macroCurrentPast += "SET !TIMEOUT_MACRO 65" + jsLF;
		macroCurrentPast += "URL GOTO={{link}}" + jsLF;
		macroCurrentPast += "TAG POS=1 TYPE=TR ATTR=ID:overview-summary-current EXTRACT=TXT" + jsLF;
		macroCurrentPast += "TAG POS=1 TYPE=TR ATTR=ID:overview-summary-past EXTRACT=TXT " + jsLF;

		iimDisplay("Link: " + link)

		//iimSet("tag", tag.toString())
		iimSet("link", link)
		ret = iimPlay(macroCurrentPast, 60);

		if (ret == -101) {
			break main;
		}

		var current = iimGetLastExtract(1);
		var past = iimGetLastExtract(2);

		current = current.split('Current')[1];
		past = returnText(current, 'Previous', 'Edit');

		var tmp = current + " " + past;
		tmp = tmp.toLowerCase();

		if (keywords.indexOf(",") == -1) {
			keywords = keywords + "\n" + keywords;
		}

		keywords = keywords.toLowerCase();
		keywords = keywords.split("\n");

		var flag = false;

		//check keywords
		for (var k = 0; k < keywords.length; k++) {

			if (tmp.indexOf(keywords[k].trim()) > 0) {
				flag = true;
				break;
			}

		}

		return flag;

	}

	return ret;

}
*/