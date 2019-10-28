var OpenCSV, SaveMainData;

OpenCSV = "CODE:";
OpenCSV += "SET !TIMEOUT_STEP 1" + "\n";
OpenCSV += "SET !DATASOURCE All_URLS.csv" + "\n";
OpenCSV += "SET !DATASOURCE_COLUMNS 1" + "\n";
OpenCSV += "SET !DATASOURCE_LINE {{ROW}}" + "\n";
OpenCSV += "ADD !EXTRACT {{!COL1}}" + "\n";


SaveMainData = "CODE:";
SaveMainData += "ADD !EXTRACT {{COUNT}}" + "\n";
SaveMainData += "ADD !EXTRACT {{NEWFLD}}" + "\n";
SaveMainData += "ADD !EXTRACT {{SOURCE}}" + "\n";
SaveMainData += "ADD !EXTRACT {{LASTREVIEW}}" + "\n";
SaveMainData += "ADD !EXTRACT {{URL}}" + "\n";
SaveMainData += "ADD !EXTRACT {{DEALERCRD}}" + "\n";
SaveMainData += "ADD !EXTRACT {{DEALERNAME}}" + "\n";
SaveMainData += "ADD !EXTRACT {{BCHCRD}}" + "\n";
SaveMainData += "ADD !EXTRACT {{AABCHNAME}}" + "\n";
SaveMainData += "ADD !EXTRACT {{AABCHADD1}}" + "\n";
SaveMainData += "ADD !EXTRACT {{AABCHADD2}}" + "\n";
SaveMainData += "ADD !EXTRACT {{AABCHCITY}}" + "\n";
SaveMainData += "ADD !EXTRACT {{AABCHST}}" + "\n";
SaveMainData += "ADD !EXTRACT {{AABCHZIP}}" + "\n";
SaveMainData += "ADD !EXTRACT {{AABCHPHN}}" + "\n";
SaveMainData += "ADD !EXTRACT {{AABCHFAX}}" + "\n";
SaveMainData += "ADD !EXTRACT {{AABCHTOLL}}" + "\n";
SaveMainData += "ADD !EXTRACT {{AABCHEMAIL}}" + "\n";
SaveMainData += "ADD !EXTRACT {{GRPCRD}}" + "\n";
SaveMainData += "ADD !EXTRACT {{AAGRPNAME}}" + "\n";
SaveMainData += "ADD !EXTRACT {{AAGRPPHN}}" + "\n";
SaveMainData += "ADD !EXTRACT {{AAGRPTOLL}}" + "\n";
SaveMainData += "ADD !EXTRACT {{AAGRPFAX}}" + "\n";
SaveMainData += "ADD !EXTRACT {{AAGRPEMAIL}}" + "\n";
SaveMainData += "ADD !EXTRACT {{INDCRD}}" + "\n";
SaveMainData += "ADD !EXTRACT {{FINRAFULL}}" + "\n";
SaveMainData += "ADD !EXTRACT {{FINRAFIRST}}" + "\n";
SaveMainData += "ADD !EXTRACT {{FINRAMID}}" + "\n";
SaveMainData += "ADD !EXTRACT {{FINRALAST}}" + "\n";
SaveMainData += "ADD !EXTRACT {{FINRASUFF}}" + "\n";
SaveMainData += "ADD !EXTRACT {{AAREPNAME}}" + "\n";
SaveMainData += "ADD !EXTRACT {{AAFIRST}}" + "\n";
SaveMainData += "ADD !EXTRACT {{AAMIDDLE}}" + "\n";
SaveMainData += "ADD !EXTRACT {{AALAST}}" + "\n";
SaveMainData += "ADD !EXTRACT {{AASUFF}}" + "\n";
SaveMainData += "ADD !EXTRACT {{AANICKNAME}}" + "\n";
SaveMainData += "ADD !EXTRACT {{AATITLE}}" + "\n";
SaveMainData += "ADD !EXTRACT {{AAROLE}}" + "\n";
SaveMainData += "ADD !EXTRACT {{AAREPPHN}}" + "\n";
SaveMainData += "ADD !EXTRACT {{AAREPEMAIL}}" + "\n";
SaveMainData += "ADD !EXTRACT {{AASEX}}" + "\n";
SaveMainData += "ADD !EXTRACT {{NEWFLD1}}" + "\n";
SaveMainData += "ADD !EXTRACT {{SPACES}}" + "\n";
SaveMainData += "ADD !EXTRACT {{COUNTER}}" + "\n";
SaveMainData += "ADD !EXTRACT {{FILENAME}}" + "\n";
SaveMainData += "SAVEAS TYPE=EXTRACT FOLDER=* FILE=18272_dcfile.csv" + "\n";


var aabchadd1, aabchadd2, aabchcity, aabchst, aabchzip;
var aarepname = [], aatitle = [], aarepphn = [], aarepemail;
var aabchphn, aabchfax, aabchtoll;
var myCounter, arrIndex;
var ret = "";

main: {

	myCounter = 0;
	iimSet("COUNT", "count");
	iimSet("NEWFLD", "newfld");
	iimSet("SOURCE", "source");
	iimSet("LASTREVIEW", "lastreview");
	iimSet("URL", "url");
	iimSet("DEALERCRD", "dealercrd");
	iimSet("DEALERNAME", "dealername");
	iimSet("BCHCRD", "bchcrd");
	iimSet("AABCHNAME", "aabchname");
	iimSet("AABCHADD1", "aabchadd1");
	iimSet("AABCHADD2", "aabchadd2");
	iimSet("AABCHCITY", "aabchcity");
	iimSet("AABCHST", "aabchst");
	iimSet("AABCHZIP", "aabchzip");
	iimSet("AABCHPHN", "aabchphn");
	iimSet("AABCHFAX", "aabchfax");
	iimSet("AABCHTOLL", "aabchtoll");
	iimSet("AABCHEMAIL", "aabchemail");
	iimSet("GRPCRD", "grpcrd");
	iimSet("AAGRPNAME", "aagrpname");
	iimSet("AAGRPPHN", "aagrpphn");
	iimSet("AAGRPTOLL", "aagrptoll");
	iimSet("AAGRPFAX", "aagrpfax");
	iimSet("AAGRPEMAIL", "aagrpemail");
	iimSet("INDCRD", "indcrd");
	iimSet("FINRAFULL", "finrafull");
	iimSet("FINRAFIRST", "finrafirst");
	iimSet("FINRAMID", "finramid");
	iimSet("FINRALAST", "finralast");
	iimSet("FINRASUFF", "finrasuff");
	iimSet("AAREPNAME", "aarepname");
	iimSet("AAFIRST", "aafirst");
	iimSet("AAMIDDLE", "aamiddle");
	iimSet("AALAST", "aalast");
	iimSet("AASUFF", "aasuff");
	iimSet("AANICKNAME", "aanickname");
	iimSet("AATITLE", "aatitle");
	iimSet("AAROLE", "aarole");
	iimSet("AAREPPHN", "aarepphn");
	iimSet("AAREPEMAIL", "aarepemail");
	iimSet("AASEX", "aasex");
	iimSet("NEWFLD1", "newfld1");
	iimSet("SPACES", "spaces");
	iimSet("COUNTER", "counter");
	iimSet("FILENAME", "filename");
	ret = iimPlay(SaveMainData, 60);
	if (ret == -101) {
		break main;
	}

	for(var gUrl = 1; gUrl <= 4016; ++gUrl) {
		iimSet("ROW", gUrl);
		ret = iimPlay(OpenCSV, 60);
		if (ret == -101) {
			break main;
		}
		var myURL = "";

		myURL = iimGetLastExtract(1);

		if(myURL == null || myURL == "undefined" || myURL == "") {
			alert("No more url to search!");
			break main;
		}

		/////Search url code////
		if(myURL.indexOf(".html") > 5) {
			GetAllPageData(myURL);
			SaveData(myURL);

			///Save in Text file for checking if it is already done///
		}
		else {
			iimSet("MYURL", myURL);
			ret = iimPlay('CODE:SET !TIMEOUT_STEP 0\nURL GOTO={{MYURL}}\nWAIT SECONDS=2');
			if (ret == -101) break main;

			var allURLS = [];
			var tmpData;

			for(var NO = 1; NO < 5000; ++NO) {
				iimSet("NO", NO);
				ret = iimPlay('CODE:SET !TIMEOUT_STEP 0\nTAG POS={{NO}} TYPE=A ATTR=class:"Teaser-upper l-row" EXTRACT=HREF');
				if (ret == -101) {
					break main;
				}
				tmpData = iimGetLastExtract(1);

				if(tmpData == '#EANF#')
					break;
				else {
					allURLS[NO-1] = tmpData;
				}
			}

			for(var No = 0; No < allURLS.length; ++No) {

				////TODO:Check if this url is already done////


				GetAllPageData(allURLS[No]);
				SaveData(allURLS[No]);

				///TODO:Save in Text file for checking if it is already done///
			}
		}//End if: for checking if it is single page or bunch of pages
	}///End for: total ZIP in CSV
}

alert("All urls is scrapped successfully!");

function GetAllPageData(myURL)
{
	arrIndex = 0;
	var tmpData;

	iimSet("MYURL", myURL);
	ret = iimPlay('CODE:SET !TIMEOUT_STEP 10\nURL GOTO={{MYURL}}\nWAIT SECONDS=2');
	if (ret == -101) return;

	///Extract Name
	ret = iimPlay('CODE:SET !TIMEOUT_STEP 10\nTAG POS=1 TYPE=SPAN ATTR=CLASS:"Hero-name" EXTRACT=TXT');
	if (ret == -101) {
		return;
	}
	tmpData = iimGetLastExtract(1);
	if(tmpData == '#EANF#') {
		aarepname[arrIndex] = "";
	}
	else {
		aarepname[arrIndex] = tmpData;
	}


	///Title is default for main page name
	aatitle[arrIndex] = "Agent";


	///Extract Telephone
	ret = iimPlay('CODE:SET !TIMEOUT_STEP 1\nTAG POS=1 TYPE=span ATTR=class:"Core-phoneText" EXTRACT=TXT');
	if (ret == -101) {
		return;
	}
	tmpData = iimGetLastExtract(1);
	if(tmpData == '#EANF#') {
		aarepphn[arrIndex] = "";
		aabchphn = "";
	}
	else {
		aarepphn[arrIndex] = tmpData;
		aabchphn = tmpData;
	}

	///Extract toll free number
	ret = iimPlay('CODE:SET !TIMEOUT_STEP 0\nTAG POS=1 TYPE=DIV ATTR=ID:"phone-tollFree" EXTRACT=TXT');
	if (ret == -101) {
		return;
	}
	tmpData = iimGetLastExtract(1);
	if(tmpData == '#EANF#') {
		aabchtoll = "";
	}
	else {
		aabchtoll = tmpData;
		aabchtoll = aabchtoll.replace('Toll Free: ', '');
	}


	///Extract Fax
	ret = iimPlay('CODE:SET !TIMEOUT_STEP 0\nTAG POS=1 TYPE=DIV ATTR=ID:"phone-fax" EXTRACT=TXT');
	if (ret == -101) {
		return;
	}
	tmpData = iimGetLastExtract(1);
	if(tmpData == '#EANF#') {
		aabchfax = "";
	}
	else {
		aabchfax = tmpData;
		aabchfax = aabchfax.replace('Fax: ', '');
	}


	////Email not Availabe to scrap
	aarepemail = "";



	////Address 1///
	ret = iimPlay('CODE:SET !TIMEOUT_STEP 0\nTAG POS=1 TYPE=SPAN ATTR=CLASS:"c-address-street-1" EXTRACT=TXT');
	if (ret == -101) {
		return;
	}
	tmpData = iimGetLastExtract(1);
	if(tmpData == '#EANF#') {
		aabchadd1 = "";
	}
	else {
		aabchadd1 = tmpData;
	}


	////Address 2///
	ret = iimPlay('CODE:SET !TIMEOUT_STEP 0\nTAG POS=1 TYPE=SPAN ATTR=CLASS:"c-address-street-2" EXTRACT=TXT');
	if (ret == -101) {
		return;
	}
	tmpData = iimGetLastExtract(1);
	if(tmpData == '#EANF#') {
		aabchadd2 = "";
	}
	else {
		aabchadd2 = tmpData;
	}

	////Address City///
	ret = iimPlay('CODE:SET !TIMEOUT_STEP 0\nTAG POS=1 TYPE=SPAN ATTR=CLASS:"c-address-city" EXTRACT=TXT');
	if (ret == -101) {
		return;
	}
	tmpData = iimGetLastExtract(1);
	if(tmpData == '#EANF#') {
		aabchcity = "";
	}
	else {
		aabchcity = tmpData;
	}


	////Address State///
	ret = iimPlay('CODE:SET !TIMEOUT_STEP 0\nTAG POS=1 TYPE=ABBR ATTR=CLASS:"c-address-state" EXTRACT=TXT');
	if (ret == -101) {
		return;
	}
	tmpData = iimGetLastExtract(1);
	if(tmpData == '#EANF#') {
		aabchst = "";
	}
	else {
		aabchst = tmpData;
	}


	////Address zip///
	ret = iimPlay('CODE:SET !TIMEOUT_STEP 0\nTAG POS=1 TYPE=SPAN ATTR=CLASS:"c-address-postal-code" EXTRACT=TXT');
	if (ret == -101) {
		return;
	}
	tmpData = iimGetLastExtract(1);
	if(tmpData == '#EANF#') {
		aabchzip = "";
	}
	else {
		aabchzip = tmpData;
	}


	///Increase employee count
	arrIndex++;

	////Our team///

	var tmpTeamHTML, tmpDoneNames;

	tmpDoneNames = "";

	var TeamNo = 1;

	////Scrap each team member one by one////
	while(true) {
		iimSet("TAB", TeamNo);
		ret = iimPlay('CODE:SET !TIMEOUT_STEP 0\nTAG POS={{TAB}} TYPE=article ATTR=class:"Team-member" EXTRACT=HTM');
		if (ret < 0) {
			break;
		}
		tmpTeamHTML = iimGetLastExtract(1);

		if(tmpTeamHTML == '#EANF#' || tmpTeamHTML.indexOf('itemprop="name">') == -1) {
			break;
		}

		tmpData = tmpTeamHTML.split('itemprop="name">')[1];
		tmpData = tmpData.split('</h4>')[0];

		///Check, if name is already scrap, if yes, then all names is scraped
		if(tmpDoneNames.indexOf(tmpData) >= 0) {
			break;
		}
		tmpDoneNames = tmpDoneNames+"|"+tmpData;

		///Save Name
		aarepname[arrIndex] = tmpData;

		///Save Title
		if(tmpTeamHTML.indexOf('itemprop="jobTitle">') > 0) {
			aatitle[arrIndex] = tmpTeamHTML.split('itemprop="jobTitle">')[1];
			aatitle[arrIndex] = aatitle[arrIndex].split('</div>')[0];
			aatitle[arrIndex] = aatitle[arrIndex].replace(/&amp;/g, '&').trim();
		}
		else {
			aatitle[arrIndex] = "";
		}

		///SAve Phone
		aarepphn[arrIndex] = "";

		///Move to next team member
		++arrIndex;
		++TeamNo;
	}
}


function SaveData(myCurrURL)
{
	///Save Data in CSV////
	for(var totRec = 0; totRec < arrIndex; ++totRec) {
		++myCounter

		var tmpDate = GetFormatedDate();

		iimSet("COUNT", myCounter);
		iimSet("NEWFLD", "");
		iimSet("SOURCE", "");
		iimSet("LASTREVIEW", tmpDate);
		iimSet("URL", myCurrURL);
		iimSet("DEALERCRD", "18272");
		iimSet("DEALERNAME", "All State");
		iimSet("BCHCRD", "");
		iimSet("AABCHNAME", "");
		iimSet("AABCHADD1", aabchadd1);
		iimSet("AABCHADD2", aabchadd2);
		iimSet("AABCHCITY", aabchcity);
		iimSet("AABCHST", aabchst);
		iimSet("AABCHZIP", aabchzip);
		iimSet("AABCHPHN", aabchphn);
		iimSet("AABCHFAX", aabchfax);
		iimSet("AABCHTOLL", aabchtoll);
		iimSet("AABCHEMAIL", "");
		iimSet("GRPCRD", "");
		iimSet("AAGRPNAME", "");
		iimSet("AAGRPPHN", "");
		iimSet("AAGRPTOLL", "");
		iimSet("AAGRPFAX", "");
		iimSet("AAGRPEMAIL", "");
		iimSet("INDCRD", "");
		iimSet("FINRAFULL", "");
		iimSet("FINRAFIRST", "");
		iimSet("FINRAMID", "");
		iimSet("FINRALAST", "");
		iimSet("FINRASUFF", "");
		iimSet("AAREPNAME", aarepname[totRec]);
		iimSet("AAFIRST", "");
		iimSet("AAMIDDLE", "");
		iimSet("AALAST", "");
		iimSet("AASUFF", "");
		iimSet("AANICKNAME", "");
		iimSet("AATITLE", aatitle[totRec]);
		iimSet("AAROLE", "");
		iimSet("AAREPPHN", aarepphn[totRec]);
		if(totRec == 0) {
			iimSet("AAREPEMAIL", aarepemail);
		}
		else {
			iimSet("AAREPEMAIL", "");
		}
		iimSet("AASEX", "");
		iimSet("NEWFLD1", "");
		iimSet("SPACES", "");
		iimSet("COUNTER", "");
		iimSet("FILENAME", "18272-" + tmpDate);
		ret = iimPlay(SaveMainData, 60);
		if (ret == -101) {
			return;
		}
	}//End For: Saving all array of Names in csv
}

function GetFormatedDate()
{
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd < 10){
		dd = '0' + dd
	}

	if(mm < 10){
		mm = '0' + mm
	}

	var today = yyyy + "" + mm + "" + dd;

	return today;
}