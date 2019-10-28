var OpenCSV, SaveMainData, SearchZIP;

OpenCSV = "CODE:";
OpenCSV += "SET !TIMEOUT_STEP 1" + "\n";
OpenCSV += "SET !DATASOURCE ziplist_7110.csv" + "\n";
OpenCSV += "SET !DATASOURCE_COLUMNS 1" + "\n";
OpenCSV += "SET !DATASOURCE_LINE {{ROW}}" + "\n";
OpenCSV += "ADD !EXTRACT {{!COL1}}" + "\n";


SearchZIP = "CODE:";
SearchZIP += "SET !TIMEOUT_STEP 1" + "\n";
SearchZIP += "URL GOTO=https://agency.nationwide.com/search?agencyName=&q={{MYZIP}}" + "\n";
SearchZIP += "WAIT SECONDS=3" + "\n";


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
SaveMainData += "SAVEAS TYPE=EXTRACT FOLDER=* FILE=7110_dcfile.csv" + "\n";


var aabchadd1, aabchadd2, aabchcity, aabchst, aabchzip;
var aabchphn, aabchfax, aabchtoll;
var aagrpname, pURL;
var aarepname = [], aatitle = [], aarepphn = [], aarepemail = [];

var myCounter, arrIndex;
var ret = "";
var tmpData;



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
			alert("No more myZIP to search!");
			break main;
		}

		///Search Zip Code///
		if(myZIP.length == 4) {
			myZIP = "0" + myZIP;
		}

		iimSet("MYZIP", myZIP);
		ret = iimPlay(SearchZIP, 60);
		if (ret == -101) {
			break main;
		}

		var recordIndex = 1;
		while(true) {
			////Loop through all Records showing current page/////
			iimSet("NO", recordIndex);
			ret = iimPlay('CODE:SET !TIMEOUT_STEP 5\nTAG POS={{NO}} TYPE=article ATTR=CLASS:"Teaser Teaser--locator" EXTRACT=HTM');
			if (ret == -101) {
				break main;
			}

			tmpData = "";
			tmpData = iimGetLastExtract(1);

			///NO record found. Move to next zip////
			if(tmpData == '#EANF#') {
				break;
			}

			///Check if there is link URL////
			//-1: if not found
			if(tmpData.indexOf('<a class="Teaser-titleLink" href="') == -1) {
				++recordIndex;
				continue;
			}


			arrIndex = 0;
			aabchadd1 = aabchadd2 = aabchcity = aabchst = aabchzip = "";
			aabchphn = aabchfax = aabchtoll = aagrpname = pURL = "";

			////check if the url is not of nationwinde
			pURL = tmpData.split('<a class="Teaser-titleLink" href="')[1];
			pURL = pURL.split('"')[0];

			if(pURL.indexOf(".") >= 0) {
				++recordIndex;
				continue;
			}

			///In Place Copy, copy url, telephone and Address
			InPlaceCopy();

			/////Open url, if there is "Our Staff", then it is agency or it is Agent name
			iimSet("MYPAGE", pURL);
			ret = iimPlay('CODE:TAB OPEN\nTAB T=2\nURL GOTO={{MYPAGE}}');
			if(ret == -101) {
				break main;
			}


			ret = iimPlay('CODE:SET !TIMEOUT_STEP 2\nTAG POS=1 TYPE=BUTTON ATTR=TXT:Our<SP>Staff EXTRACT=TXT');
			///////It is Agent Name
			if(ret < 0) {
				aagrpname = "";
			}
			else {
				////////Get Group Name
				ret = iimPlay('CODE:SET !TIMEOUT_STEP 1\nTAG POS=1 TYPE=SPAN ATTR=CLASS:"CoreExclusive-agencyName" EXTRACT=TXT');
				if(ret < 0) {
					aagrpname = "";
				}
				else {
					aagrpname = iimGetLastExtract(1);
				}
			}


			////////Get Agent Name
			ret = iimPlay('CODE:SET !TIMEOUT_STEP 2\nTAG POS=1 TYPE=P ATTR=CLASS:"CoreExclusive-agentName" EXTRACT=TXT');
			if(ret < 0) {
				aarepname[arrIndex] = "";
			}
			else {
				aarepname[arrIndex] = iimGetLastExtract(1);
			}


			////////Get Agent Title
			ret = iimPlay('CODE:SET !TIMEOUT_STEP 1\nTAG POS=1 TYPE=P ATTR=CLASS:"CoreExclusive-agentTitle" EXTRACT=TXT');
			if(ret < 0) {
				aatitle[arrIndex] = "";
			}
			else {
				aatitle[arrIndex] = iimGetLastExtract(1);
			}

			////////Get Agent Phone
			ret = iimPlay('CODE:SET !TIMEOUT_STEP 1\nTAG POS=1 TYPE=SPAN ATTR=CLASS:"c-phone-number-span c-phone-main-number-span" EXTRACT=TXT');
			if(ret < 0) {
				aarepphn[arrIndex] = "";
			}
			else {
				aarepphn[arrIndex] = iimGetLastExtract(1);
			}

			////////Get Agent Email
			ret = iimPlay('CODE:SET !TIMEOUT_STEP 1\nTAG POS=1 TYPE=DIV ATTR=CLASS:"c-Modal-messageWrapper" EXTRACT=HTM');
			if(ret < 0) {
				aarepemail[arrIndex] = "";
			}
			else {
				var tmp = iimGetLastExtract(1);

				if(tmp.indexOf('<iframe src="') > 0) {
					tmp = tmp.split('<iframe src="')[1];
					tmp = tmp.split('=')[1];
					tmp = tmp.split('"')[0];
					aarepemail[arrIndex] = tmp.trim()
				}
			}
			++arrIndex;


			var tmpEmp = "";
			///////If it is group then scrap staff details//////////
			if(aagrpname != "") {
				ret = iimPlay('CODE:SET !TIMEOUT_STEP 1\nTAG POS=1 TYPE=DIV ATTR=CLASS:"AgencyAbout-container l-container" EXTRACT=HTM');
				if(ret >= 0) {
					tmpEmp = iimGetLastExtract(1);
				}
			}

			if(tmpEmp.indexOf('<span class="StaffCard-agentName"') > 0) {
				var empArray = tmpEmp.split('<span class="StaffCard-agentName"');

				for(var p = 1; p < empArray.length; ++p) {
					////////Get Agent Name//////
					if(empArray[p].indexOf('itemprop="employee">') > 0) {
						aarepname[arrIndex] = empArray[p].split('itemprop="employee">')[1];
						aarepname[arrIndex] = aarepname[arrIndex].split('</span>')[0];
					}
					else {
						continue;
					}

					////////Get Agent Title//////
					if(empArray[p].indexOf('StaffCard-agentTitle">') > 0) {
						aatitle[arrIndex] = empArray[p].split('StaffCard-agentTitle">')[1];
						aatitle[arrIndex] = aatitle[arrIndex].split('</span>')[0];
					}
					else {
						aatitle[arrIndex] = "";
					}

					////////Get Agent Phone//////
					if(empArray[p].indexOf('data-ya-track="phone">') > 0) {
						aarepphn[arrIndex] = empArray[p].split('data-ya-track="phone">')[1];
						aarepphn[arrIndex] = aarepphn[arrIndex].split('</a>')[0];
					}
					else {
						aarepphn[arrIndex] = "";
					}

					////////Get Agent Email//////
					if(empArray[p].indexOf('<iframe src="') > 0) {
						aarepemail[arrIndex] = empArray[p].split('<iframe src="')[1];
						aarepemail[arrIndex] = aarepemail[arrIndex].split('=')[1];
						aarepemail[arrIndex] = aarepemail[arrIndex].split('"')[0];
					}
					else {
						arepemail[arrIndex] = "";
					}

					++arrIndex;
				}///End For: Loop through all staff
			}////End If: Getting all staff

			ret = iimPlay('CODE:TAB CLOSE');
			////Save all Data/////
			SaveData();
			++recordIndex;

		}//End While: scaning all Records
	}//End For: loop through CSV file
}


function InPlaceCopy()
{
	pURL = 'https://agency.nationwide.com/' + pURL

	if(tmpData.indexOf('id="telephone">') > 0) {
		aabchphn = tmpData.split('id="telephone">')[1];
		aabchphn = aabchphn.split('</span>')[0];
		aabchphn = aabchphn.trim();
	}

	if(tmpData.indexOf('class="c-address-street-1">') > 0) {
		aabchadd1 = tmpData.split('class="c-address-street-1">')[1];
		aabchadd1 = aabchadd1.split('</span>')[0];
		aabchadd1 = aabchadd1.trim();
	}

	if(tmpData.indexOf('class="c-address-street-2">') > 0) {
		aabchadd2 = tmpData.split('class="c-address-street-2">')[1];
		aabchadd2 = aabchadd2.split('</span>')[0];
		aabchadd2 = aabchadd2.trim();
	}

	if(tmpData.indexOf('class="c-address-city">') > 0) {
		aabchcity = tmpData.split('class="c-address-city">')[1];
		aabchcity = aabchcity.split('</span>')[0];
		aabchcity = aabchcity.trim();
	}

	if(tmpData.indexOf('itemprop="addressRegion">') > 0) {
		aabchst = tmpData.split('itemprop="addressRegion">')[1];
		aabchst = aabchst.split('</abbr>')[0];
		aabchst = aabchst.trim();
	}

	if(tmpData.indexOf('itemprop="postalCode">') > 0) {
		aabchzip = tmpData.split('itemprop="postalCode">')[1];
		aabchzip = aabchzip.split('</span>')[0];

		aabchzip = aabchzip.trim();

		if(aabchzip.length > 5) {
			aabchzip = aabchzip.substring(0, 5);
		}
	}
}

function SaveData()
{
	///Save Data in CSV////
	for(var totRec = 0; totRec < arrIndex; ++totRec) {
		++myCounter

		var tmpDate = GetFormatedDate();

		iimSet("COUNT", myCounter);
		iimSet("NEWFLD", "");
		iimSet("SOURCE", "crawler");
		iimSet("LASTREVIEW", tmpDate);
		iimSet("URL", pURL);
		iimSet("DEALERCRD", "7110");
		iimSet("DEALERNAME", "Nationwide Investment Services Corporation");
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
		iimSet("AAGRPNAME", aagrpname);
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
		iimSet("AAREPEMAIL", aarepemail[totRec]);
		iimSet("AASEX", "");
		iimSet("NEWFLD1", "");
		iimSet("SPACES", "");
		iimSet("COUNTER", "");
		iimSet("FILENAME", "7110-" + tmpDate);
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