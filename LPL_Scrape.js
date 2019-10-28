var OpenCSV, SaveMainData, SearchZIP;
var LoadFirstTime;

OpenCSV = "CODE:";
OpenCSV += "SET !TIMEOUT_STEP 1" + "\n";
OpenCSV += "SET !DATASOURCE 6413_ziplist.csv" + "\n";
OpenCSV += "SET !DATASOURCE_COLUMNS 3" + "\n";
OpenCSV += "SET !DATASOURCE_LINE {{ROW}}" + "\n";
OpenCSV += "ADD !EXTRACT {{!COL3}}" + "\n";


LoadFirstTime = "CODE:";
LoadFirstTime += "SET !TIMEOUT_STEP 1" + "\n";
LoadFirstTime += "URL GOTO=https://www.lpl.com/working-with-an-advisor/find-an-lpl-financial-advisor.html" + "\n";
LoadFirstTime += "WAIT SECONDS=1" + "\n";
LoadFirstTime += "FRAME F=2" + "\n";
LoadFirstTime += "TAG POS=1 TYPE=INPUT:TEXT ATTR=ID:address CONTENT={{MYZIP}}" + "\n";
LoadFirstTime += "WAIT SECONDS=1" + "\n";
LoadFirstTime += "TAG POS=1 TYPE=BUTTON ATTR=TXT:Search" + "\n";
LoadFirstTime += "WAIT SECONDS=5" + "\n";


SearchZIP = "CODE:";
SearchZIP += "SET !TIMEOUT_STEP 1" + "\n";
SearchZIP += "WAIT SECONDS=1" + "\n";
SearchZIP += "FRAME F=2" + "\n";
SearchZIP += "TAG POS=1 TYPE=INPUT:TEXT ATTR=ID:address CONTENT={{MYZIP}}" + "\n";
SearchZIP += "WAIT SECONDS=1" + "\n";
SearchZIP += "TAG POS=1 TYPE=BUTTON ATTR=TXT:Search" + "\n";
SearchZIP += "WAIT SECONDS=30" + "\n";


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
SaveMainData += "SAVEAS TYPE=EXTRACT FOLDER=* FILE=6413-dcfile.csv" + "\n";


var aabchadd1, aabchadd2, aabchcity, aabchst, aabchzip, pURL;
var aarepname, aarepphn, aarepemail;

var myCounter;
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

	iimSet("MYZIP", "01001");
	ret = iimPlay(LoadFirstTime, 60);
	if (ret == -101) {
		break main;
	}


	////Loop thorough all ZIP Code/////
	for(var mZipCode = 2; mZipCode <= 90000; ++mZipCode) {
		iimSet("ROW", mZipCode);
		ret = iimPlay(OpenCSV, 60);
		if (ret == -101) {
			break main;
		}

		var myZIP = "";
		myZIP = iimGetLastExtract(1);


		if(myZIP == null || myZIP == "undefined" || myZIP == "") {
			alert("No more ZIP to search!");
			break main;
		}

		///Search Zip Code///
		iimSet("MYZIP", myZIP);
		ret = iimPlay(SearchZIP, 60);
		if (ret == -101) {
			break main;
		}


		////Load all resutls by clicking it 5-times////
		for(var rr = 1; rr <= 5; ++rr) {
			ret = iimPlay('CODE:SET !TIMEOUT_STEP 10\nFRAME F=2\nTAG POS=1 TYPE=A ATTR=TXT:Show<SP>More<SP>Results');
			if(ret < 0) {
				break;
			}
		}


		///Scrap all records of search results
		var currRecord = 1;

		while(true) {
			aabchadd1 = aabchadd2 = aabchcity = aabchst = aabchzip = "";
			aarepname = aarepphn = aarepemail = pURL = "";

			var tmpHTML = "";
			iimSet("TAB", currRecord);
			ret = iimPlay('CODE:SET !TIMEOUT_STEP 10\nFRAME F=2\nTAG POS={{TAB}} TYPE=DIV ATTR=CLASS:"row info-adv ng-scope" EXTRACT=HTM');
			if(ret < 0) {
				break;
			}
			tmpHTML = iimGetLastExtract(1);


			///Extract Name////
			if(tmpHTML.indexOf('<p class="name ng-binding">') > 0) {
				aarepname = tmpHTML.split('<p class="name ng-binding">')[1];
				aarepname = aarepname.split('<span ')[0].trim();
			}
			else {
				continue;
			}

			///Extract Address////
			if(tmpHTML.indexOf('<p class="ng-binding">') > 0) {
				var tmpAddress = "";

				tmpAddress = tmpHTML.split('<p class="ng-binding">')[1];
				tmpAddress = tmpAddress.split('<!')[0].trim();

				aabchadd1 = tmpAddress.split('<br>')[0].trim();

				tmpAddress = tmpAddress.split('<br>')[1].trim();
				aabchcity = tmpAddress.split(',')[0].trim();

				tmpAddress = tmpAddress.split(',')[1].trim();
				aabchst = tmpAddress.split(' ')[0].trim();
				aabchzip = tmpAddress.split(' ')[1].trim();
			}


			/////Extract Phone Numbers/////
			if(tmpHTML.indexOf('href="tel:') > 0) {
				aarepphn = tmpHTML.split('href="tel:')[1];
				aarepphn = aarepphn.split('"')[0];
			}

			///Extract Email/////
			if(tmpHTML.indexOf('"mailto:') > 0) {
				aarepemail = tmpHTML.split('"mailto:')[1];
				aarepemail = aarepemail.split('"')[0];
			}


			///Extract website url if given///
			if(tmpHTML.indexOf('>Advisor Website<') > 0) {
				pURL = tmpHTML.split('<a href="')[1];
				pURL = pURL.split('"')[0];
			}

			////Save All data in CSV////
			SaveData();

			++currRecord;
		}///End While: getting all result from search
	}//End For: loop through CSV file
}

function SaveData()
{
	///Save Data in CSV////
	++myCounter

	var tmpDate = GetFormatedDate();

	iimSet("COUNT", myCounter);
	iimSet("NEWFLD", "");
	iimSet("SOURCE", "crawler");
	iimSet("LASTREVIEW", tmpDate);
	iimSet("URL", pURL);
	iimSet("DEALERCRD", "6413");
	iimSet("DEALERNAME", "Lpl Financial LLC");
	iimSet("BCHCRD", "");
	iimSet("AABCHNAME", "");
	iimSet("AABCHADD1", aabchadd1);
	iimSet("AABCHADD2", aabchadd2);
	iimSet("AABCHCITY", aabchcity);
	iimSet("AABCHST", aabchst);
	iimSet("AABCHZIP", aabchzip);
	iimSet("AABCHPHN", "");
	iimSet("AABCHFAX", "");
	iimSet("AABCHTOLL", "");
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
	iimSet("AAREPNAME", aarepname);
	iimSet("AAFIRST", "");
	iimSet("AAMIDDLE", "");
	iimSet("AALAST", "");
	iimSet("AASUFF", "");
	iimSet("AANICKNAME", "");
	iimSet("AATITLE", "Financial Advisor");
	iimSet("AAROLE", "");
	iimSet("AAREPPHN", aarepphn);
	iimSet("AAREPEMAIL", aarepemail);
	iimSet("AASEX", "");
	iimSet("NEWFLD1", "");
	iimSet("SPACES", "");
	iimSet("COUNTER", "");
	iimSet("FILENAME", "6413-" + tmpDate);
	ret = iimPlay(SaveMainData, 60);
	if (ret == -101) {
		return;
	}
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