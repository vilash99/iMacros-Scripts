var SaveMainData;

SaveMainData = "CODE:";
SaveMainData += "ADD !EXTRACT {{AGENTURL}}" + "\n";
SaveMainData += "SAVEAS TYPE=EXTRACT FOLDER=* FILE=All_URLS.csv" + "\n";


var ret = "";
var totalStates;
var allStates = [];

main: {

	////Open Main URL
	ret = iimPlay('CODE:SET !TIMEOUT_STEP 10\nURL GOTO=https://agents.allstate.com/\nWAIT SECONDS=2');
	if (ret == -101) {
		break main;
	}

	////Scrap all States////
	var i = 1;
	totalStates = 0;
	while(true) {
		iimSet("TAB", i);
		ret = iimPlay('CODE:SET !TIMEOUT_STEP 2\nTAG POS={{TAB}} TYPE=A ATTR=class:"Directory-listLink" EXTRACT=HREF');
		if (ret < 0) {
			break;
		}
		allStates[totalStates] = iimGetLastExtract(1);

		++i;
		++totalStates;
	}////End While: Open each url one by one


	for(i = 0; i < totalStates; ++i) {
		iimSet("STATEURL", allStates[i]);
		ret = iimPlay('CODE:SET !TIMEOUT_STEP 10\nURL GOTO={{STATEURL}}\nWAIT SECONDS=1');
		if (ret < 0) {
			continue;
		}


		///Get All States, there might be direct agent url///
		var j = 1;
		var tmpURL;
		while(true) {
			iimSet("TAB", j);
			ret = iimPlay('CODE:SET !TIMEOUT_STEP 2\nTAG POS={{TAB}} TYPE=A ATTR=class:"Directory-listLink" EXTRACT=HREF');
			if (ret < 0) {
				break;
			}
			tmpURL = iimGetLastExtract(1);

			///Save agent URL/City URL
			iimSet("AGENTURL", tmpURL);
			ret = iimPlay(SaveMainData, 60);
			if (ret < 0) {
				alert("Error on saving data in file!");
				break main;
			}

			++j;
		}///End While: Opening each city url and save it
	}///End For: Opening all States urls
}///End Main

alert("All urls is scrapped successfully!");
