var erero

OpenSearchURL = "CODE:";
OpenSearchURL += "SET !TIMEOUT_STEP 1" + "\n";
OpenSearchURL += "TAG POS={{i}} TYPE=A ATTR=HREF:/watch?v=* EXTRACT=HREF" + "\n";
OpenSearchURL += "ADD !EXTRACT {{!VAR1}}" + "\n";
OpenSearchURL += "URL GOTO={{!VAR1}}" + "\n";
OpenSearchURL += "TAB OPEN" + "\n";
OpenSearchURL += "TAB T=2" + "\n";
OpenSearchURL += "URL GOTO={{!VAR1}}" + "\n";

GetYTubeDESC = "CODE:";
GetYTubeDESC += "SET !TIMEOUT_STEP 1" + "\n";
GetYTubeDESC += "TAG POS=1 TYPE=BUTTON ATTR=TXT:Show<SP>more" + "\n";
GetYTubeDESC += "TAG POS=1 TYPE=DIV ATTR=ID:action-panel-details EXTRACT=TXT" + "\n";


GetAllYTubeData = "CODE:";
GetAllYTubeData += "SET !TIMEOUT_STEP 1" + "\n";
GetAllYTubeData += "ADD !EXTRACT {{!URLCURRENT}}" + "\n";
GetAllYTubeData += "TAG POS=1 TYPE=DIV ATTR=ID:action-panel-details EXTRACT=TXT" + "\n";
GetAllYTubeData += "SAVEAS TYPE=EXTRACT FOLDER=* FILE=IndianBlend_URL.csv" + "\n";


NavigatePage = "CODE:";
NavigatePage += "TAG POS=1 TYPE=SPAN ATTR=TXT:Next<SP>»" + "\n";

for(i = 1; i <= 500000; i+=2)
{
	erero = 1;

	iimSet("i", i);
	erero = iimPlay(OpenSearchURL);

	if(erero > 0)
	{
		iimPlay(GetYTubeDESC);
		DESCRIPTION = iimGetLastExtract(1);

		//Check if any links in description
		if(links == true)
		{
			EURL = "http://temp.urlc.com
			iimSet ("EURL", EURL);

			//Get Title, URL, Descripton and all links
			iimPlay("CODE:TAG POS=1 TYPE=SPAN ATTR=class:watch-title<SP> EXTRACT=TXT\n");
			iimPlay("CODE:TAG POS=1 TYPE=DIV ATTR=ID:action-panel-details EXTRACT=TXT\n");
			iimPlay("CODE:ADD !EXTRACT {{!URLCURRENT}}\n");
			iimPlay("CODE:ADD !EXTRACT {{EURL}}\n");
			iimPlay("CODE:SAVEAS TYPE=EXTRACT FOLDER=* FILE=IndianBlend_URL.csv\n");
		}
		else
		{
			//Get just Title, URL
			//Get Title, URL, Descripton and all links
			iimPlay("CODE:TAG POS=1 TYPE=SPAN ATTR=class:watch-title<SP> EXTRACT=TXT\n");
			iimPlay("CODE:ADD !EXTRACT '\n");
			iimPlay("CODE:ADD !EXTRACT {{!URLCURRENT}}\n");
		}
	}
	else
	{
		erero = 1;
		erero = iimPlay(NavigatePage);

		//All pages is completed
		if(erero <= 0)
		{
			break;
		}
	}
}