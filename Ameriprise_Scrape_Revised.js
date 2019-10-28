var OpenCSV, SaveMainData;

var jsLF = "\n";

var CloseFirefox;
CloseFirefox = "CODE:";
CloseFirefox += "TAB CLOSE" + "\n";


OpenCSV = "CODE:";
OpenCSV += "SET !TIMEOUT_STEP 1" + "\n";
OpenCSV += "SET !DATASOURCE alphabet.csv" + "\n";
OpenCSV += "SET !DATASOURCE_COLUMNS 1" + "\n";
OpenCSV += "SET !DATASOURCE_LINE {{ROW}}" + "\n";
OpenCSV += "ADD !EXTRACT {{!COL1}}" + "\n";


SaveMainData = "CODE:";
SaveMainData += "ADD !EXTRACT {{COUNT}}" + jsLF;
SaveMainData += "ADD !EXTRACT {{NEWFLD}}" + jsLF;
SaveMainData += "ADD !EXTRACT {{SOURCE}}" + jsLF;
SaveMainData += "ADD !EXTRACT {{LASTREVIEW}}" + jsLF;
SaveMainData += "ADD !EXTRACT {{URL}}" + jsLF;
SaveMainData += "ADD !EXTRACT {{DEALERCRD}}" + jsLF;
SaveMainData += "ADD !EXTRACT {{DEALERNAME}}" + jsLF;
SaveMainData += "ADD !EXTRACT {{BCHCRD}}" + jsLF;
SaveMainData += "ADD !EXTRACT {{AABCHNAME}}" + jsLF;
SaveMainData += "ADD !EXTRACT {{AABCHADD1}}" + jsLF;
SaveMainData += "ADD !EXTRACT {{AABCHADD2}}" + jsLF;
SaveMainData += "ADD !EXTRACT {{AABCHCITY}}" + jsLF;
SaveMainData += "ADD !EXTRACT {{AABCHST}}" + jsLF;
SaveMainData += "ADD !EXTRACT {{AABCHZIP}}" + jsLF;
SaveMainData += "ADD !EXTRACT {{AABCHPHN}}" + jsLF;
SaveMainData += "ADD !EXTRACT {{AABCHFAX}}" + jsLF;
SaveMainData += "ADD !EXTRACT {{AABCHTOLL}}" + jsLF;
SaveMainData += "ADD !EXTRACT {{AABCHEMAIL}}" + jsLF;
SaveMainData += "ADD !EXTRACT {{GRPCRD}}" + jsLF;
SaveMainData += "ADD !EXTRACT {{AAGRPNAME}}" + jsLF;
SaveMainData += "ADD !EXTRACT {{AAGRPPHN}}" + jsLF;
SaveMainData += "ADD !EXTRACT {{AAGRPTOLL}}" + jsLF;
SaveMainData += "ADD !EXTRACT {{AAGRPFAX}}" + jsLF;
SaveMainData += "ADD !EXTRACT {{AAGRPEMAIL}}" + jsLF;
SaveMainData += "ADD !EXTRACT {{INDCRD}}" + jsLF;
SaveMainData += "ADD !EXTRACT {{FINRAFULL}}" + jsLF;
SaveMainData += "ADD !EXTRACT {{FINRAFIRST}}" + jsLF;
SaveMainData += "ADD !EXTRACT {{FINRAMID}}" + jsLF;
SaveMainData += "ADD !EXTRACT {{FINRALAST}}" + jsLF;
SaveMainData += "ADD !EXTRACT {{FINRASUFF}}" + jsLF;
SaveMainData += "ADD !EXTRACT {{AAREPNAME}}" + jsLF;
SaveMainData += "ADD !EXTRACT {{AAFIRST}}" + jsLF;
SaveMainData += "ADD !EXTRACT {{AAMIDDLE}}" + jsLF;
SaveMainData += "ADD !EXTRACT {{AALAST}}" + jsLF;
SaveMainData += "ADD !EXTRACT {{AASUFF}}" + jsLF;
SaveMainData += "ADD !EXTRACT {{AANICKNAME}}" + jsLF;
SaveMainData += "ADD !EXTRACT {{AATITLE}}" + jsLF;
SaveMainData += "ADD !EXTRACT {{AAROLE}}" + jsLF;
SaveMainData += "ADD !EXTRACT {{AAREPPHN}}" + jsLF;
SaveMainData += "ADD !EXTRACT {{AAREPEMAIL}}" + jsLF;
SaveMainData += "ADD !EXTRACT {{AASEX}}" + jsLF;
SaveMainData += "ADD !EXTRACT {{NEWFLD1}}" + jsLF;
SaveMainData += "ADD !EXTRACT {{SPACES}}" + jsLF;
SaveMainData += "ADD !EXTRACT {{COUNTER}}" + jsLF;
SaveMainData += "ADD !EXTRACT {{FILENAME}}" + jsLF;
SaveMainData += "SAVEAS TYPE=EXTRACT FOLDER=* FILE=6363_dcfile.csv" + jsLF;


var AdvisorHTML;

var aabchadd1, aabchadd2, aabchcity, aabchst, aabchzip;
var aagrpname, aagrpphn, aagrpemail, pURL;
var aarepname = [], aatitle = [], aarepphn = [], aarepemail = [];
var myCounter, arrIndex;

var base_path = "D:\\";
var testNames;

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


	////Loop thorough all alphabates/////
	for(var mAlpha = 2; mAlpha <= 50; ++mAlpha) {
		iimSet("ROW", mAlpha);
		ret = iimPlay(OpenCSV, 60);
		if (ret == -101) {
			break main;
		}
		var myAlpha = "";
		myAlpha = iimGetLastExtract(1);

		if(myAlpha == null || myAlpha == "undefined" || myAlpha == "") {
			alert("No more alphbates to search!");
			break main;
		}

		iimDisplay("Running Alphabete: " + myAlpha);

		iimSet("MYALPHA", myAlpha);
		ret = iimPlay('CODE:URL GOTO=https://www.ameripriseadvisors.com/#search?crit=%7Bse%3A%3Bnrr%3A10%3Bsri%3A0%3Brd%3A0%3Baof%3A%3Bd%3A%3Bli%3Afalse%3Bst%3Ateam%20name%3Blt%3A0%3Blg%3A0%3Bt%3A{{MYALPHA}}%7D&page=0\nWAIT SECONDS=2');
		if(ret == -101) {
			break main;
		}

		///Load all results///
		for(var i = 1; i <= 10; ++i) {
			iimDisplay("Running Alphabete: " + myAlpha + "\nClicking 'Load More Results' " + i + " of 10 times.");
			ret = iimPlay('CODE:EVENT TYPE=CLICK SELECTOR="HTML>BODY>DIV:nth-of-type(2)>DIV>DIV:nth-of-type(4)>DIV>DIV:nth-of-type(3)>DIV:nth-of-type(2)>A" BUTTON=0\nWAIT SECONDS=10');
			if(ret < 0) {
				break;
			}
		}

		///Extract All search result
		ret = iimPlay('CODE:SET !TIMEOUT_STEP 5\nTAG POS=1 TYPE=DIV ATTR=ID:"resultList" EXTRACT=HTM');
		if(ret < 0) {
			continue;
		}
		AdvisorHTML = iimGetLastExtract(1);

		var tmpArray = [];
		///Seprate all results
		if(AdvisorHTML.indexOf('<div class="card-main-container desktop-tablet-card">') > 0) {
			tmpArray = AdvisorHTML.split('<div class="card-main-container desktop-tablet-card">');

			///Release memory used by html code;
			AdvisorHTML = "";
		}

		///Scrap each profile one-by-one//
		for(var i = 1; i < tmpArray.length; ++i) {

			iimDisplay("Running Alphabete: " + myAlpha + "\nScraping Team: " + i + " of " + (tmpArray.length-1));

			///Initlize all fields variables
			aabchadd1 = aabchadd2 = aabchcity = aabchst = aabchzip = "";
			aagrpname = aagrpphn = aagrpemail = pURL = "";
			arrIndex = 0;

			///Extract Group Name///
			if(tmpArray[i].indexOf('<h3>') >= 0) {
				aagrpname = tmpArray[i].split('<h3>')[1];
				aagrpname = aagrpname.split('</h3>')[0];

				////Get page URL///
				if(aagrpname.indexOf('<a href=') >= 0) {
					pURL = aagrpname.split('<a href="')[1];
					pURL = "https://www.ameripriseadvisors.com" + pURL.split('"')[0];
					pURL = pURL.replace("?awsrc=", "");

					///Remove URL from groupname
					aagrpname = aagrpname.split('">')[1];
					aagrpname = aagrpname.split('</a>')[0];
					aagrpname = aagrpname.replace(/&amp;/g, "&").trim();
				}
			}

			////Check if this url is already scraped///
			testNames = LoadFile(base_path + "AmeripriseRevisedURLS.txt");
			if(testNames.indexOf(pURL) >= 0) {
				continue;
			}


			////Extract Address///
			if(tmpArray[i].indexOf('<div class="location">') >= 0) {
				var tmpAddress = tmpArray[i].split('<div class="location">')[1];
				tmpAddress = tmpAddress.split('">')[1];
				tmpAddress = tmpAddress.split('</a>')[0].trim();

				///Seprate address//
				var tmpAdd = [];
				if(tmpAddress.indexOf('<br>') >= 0) {
					tmpAdd = tmpAddress.split('<br>');

					if(tmpAdd.length == 3){
						aabchadd1 = tmpAdd[0].trim();
						aabchadd2 = tmpAdd[1].trim();
						aabchcity = tmpAdd[2].trim();
					}
					else {
						aabchadd1 = tmpAdd[0].trim();
						aabchcity = tmpAdd[1].trim();
					}
					aabchst = aabchzip = aabchcity;
				}

				if(aabchcity != "") {
					aabchcity = aabchcity.split(",")[0];
				}

				if(aabchst != "") {
					aabchst = aabchst.split(', ')[1];
					aabchst = aabchst.split(' ')[0];
				}

				if(aabchzip != "") {
					aabchzip = aabchzip.split(', ')[1];
					aabchzip = aabchzip.split(' ')[1];
				}
			}

			////Extract Email/////
			if(tmpArray[i].indexOf('href="mailto:') >= 0) {
				aagrpemail = tmpArray[i].split('href="mailto:')[1];
				aagrpemail = aagrpemail.split('"')[0];
			}

			////Extract Phone Nubmer///
			if(tmpArray[i].indexOf('href="tel:">') >= 0) {
				aagrpphn = tmpArray[i].split('href="tel:">')[1];
				aagrpphn = aagrpphn.split('</a>')[0];
			}


			///Get All Advisor and Team Staff
			getAdvisorAndStaff();

			///Save All Data////
			SaveData();

			WriteFile(base_path + "AmeripriseRevisedURLS.txt", pURL);
		}///End For: Loop through all profiles in search results
	}//End For: Reading CSV Alphabates
}//End Main


function getAdvisorAndStaff()
{
	//Get All Advisors
	iimSet("PURL", pURL + "our-financial-advice-team");
	ret = iimPlay('CODE:URL GOTO={{PURL}}\nWAIT SECONDS=1');
	if(ret == -101) {
		return;
	}

	var tmpHTML = "";
	///Check if there is group Name/////
	ret = iimPlay('CODE:SET !TIMEOUT_STEP 2\nTAG POS=1 TYPE=SECTION ATTR=ID:"ctl00_cp1_ctlAdminTeamMembers_ctl00_divTeam" EXTRACT=HTM');
	if(ret < 0) {
		tmpHTML = "";
	}
	else {
		tmpHTML = iimGetLastExtract(1);
	}

	///If there is any Advisor
	if(tmpHTML.indexOf('divTeamCard"') >= 0) {
		var AdvisorHTML = tmpHTML.split('divTeamCard"');

		for(var x = 1; x < AdvisorHTML.length; ++x) {
			//Extract Name
			if(AdvisorHTML[x].indexOf('"team-member-item-name">') >= 0) {
				aarepname[arrIndex] = AdvisorHTML[x].split('"team-member-item-name">')[1];
				aarepname[arrIndex] = aarepname[arrIndex].split('</h2>')[0];
			}
			else {
				continue;
			}

			//Extract Title
			if(AdvisorHTML[x].indexOf('team-member-item-title">') >= 0) {
				aatitle[arrIndex] = AdvisorHTML[x].split('team-member-item-title">')[1];
				aatitle[arrIndex] = aatitle[arrIndex].split('</h3>')[0];
			}
			else {
				aatitle[arrIndex] = "";
			}


			////Get Email and Phone number by opening profile url
			var tmpURL = "";
			if(AdvisorHTML[x].indexOf('"team-member-item-link" href="') >= 0) {
				tmpURL = AdvisorHTML[x].split('"team-member-item-link" href="')[1];
				tmpURL = tmpURL.split('"')[0];
			}

			if(tmpURL != "") {
				iimSet("TMPURL", tmpURL);
				ret = iimPlay('CODE:URL GOTO={{TMPURL}}\nWAIT SECONDS=1');
				if(ret >= 0) {

					///Get Email
					ret = iimPlay('CODE:SET !TIMEOUT_STEP 2\nTAG POS=1 TYPE=A ATTR=ID:ctl00_cp1_lnkAdvisorEmail EXTRACT=TXT');
					if(ret >= 0) {
						aarepemail[arrIndex] = iimGetLastExtract(1);
					}

					///Get phone
					ret = iimPlay('CODE:SET !TIMEOUT_STEP 0\nTAG POS=1 TYPE=A ATTR=ID:ctl00_cp1_lnkAdvisorPhone EXTRACT=TXT');
					if(ret >= 0) {
						aarepphn[arrIndex] = iimGetLastExtract(1);
					}
				}
			}
			else {
				aarepemail[arrIndex] = "";
				aarepphn[arrIndex] = "";
			}
			arrIndex++;
		}//End For: total advisors
	}//End IF: Get all advisor if any



	//Get All Advisors
	iimSet("PURL", pURL + "our-financial-advice-team");
	ret = iimPlay('CODE:URL GOTO={{PURL}}\nWAIT SECONDS=1');
	if(ret == -101) {
		return;
	}

	//Get All Our team
	///Check if there is group Name/////
	ret = iimPlay('CODE:TAG POS=1 TYPE=SECTION ATTR=ID:"ctl00_cp1_ctlAdminStaffMembers_ctl00_divStaff" EXTRACT=HTM');
	if(ret == -101) {
		return;
	}
	tmpHTML = iimGetLastExtract(1);

	///If there is any Staff
	if(tmpHTML.indexOf('divTeamCard"') >= 0) {
		var StaffHTML = tmpHTML.split('divTeamCard"');

		for(var x = 1; x < StaffHTML.length; ++x) {
			//Extract Name
			if(StaffHTML[x].indexOf('staff-name team-member-item-name">') >= 0) {
				aarepname[arrIndex] = StaffHTML[x].split('staff-name team-member-item-name">')[1];
				aarepname[arrIndex] = aarepname[arrIndex].split('</h2>')[0];
			}
			else {
				continue;
			}

			//Extract Title
			if(StaffHTML[x].indexOf('h2Title" class="h2">') >= 0) {
				aatitle[arrIndex] = StaffHTML[x].split('h2Title" class="h2">')[1];
				aatitle[arrIndex] = aatitle[arrIndex].split('</h3>')[0];
			}
			else {
				aatitle[arrIndex] = "";
			}


			//Extract Email
			if(StaffHTML[x].indexOf('mailto:') >= 0) {
				aarepemail[arrIndex] = StaffHTML[x].split('mailto:')[1];
				aarepemail[arrIndex] = aarepemail[arrIndex].split('"')[0];
			}
			else {
				aarepemail[arrIndex] = "";
			}

			//Extract Phone
			if(StaffHTML[x].indexOf('<a href="tel:') >= 0) {
				aarepphn[arrIndex] = StaffHTML[x].split('<a href="tel:')[1];
				aarepphn[arrIndex] = aarepphn[arrIndex].split('"')[0];
			}
			else {
				aarepphn[arrIndex] = "";
			}

			arrIndex++;
		}//End For: total advisors
	}//End IF: Get all advisor if any
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
		iimSet("DEALERCRD", "6363");
		iimSet("DEALERNAME", "Ameriprise Financial Services Inc ");
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
		iimSet("AAGRPNAME", aagrpname);
		iimSet("AAGRPPHN", aagrpphn);
		iimSet("AAGRPTOLL", "");
		iimSet("AAGRPFAX", "");
		iimSet("AAGRPEMAIL", aagrpemail);
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
		iimSet("FILENAME", "6363-" + tmpDate);
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