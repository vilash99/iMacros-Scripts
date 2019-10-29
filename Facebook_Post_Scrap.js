var erero
var totalPosts
var PostURL, PostTitle, PostImageURL
var OPFileName
var FB, EXT

CopyPosts = "CODE:";
CopyPosts += "SET !TIMEOUT_STEP 1" + "\n";
//CopyPosts += "TAG POS={{i}} TYPE=P ATTR=TXT:* EXTRACT=TXT" + "\n";
CopyPosts += "TAG POS={{i}} TYPE=DIV ATTR=CLASS:_5pbx<SP>userContent EXTRACT=TXT" + "\n";
CopyPosts += "TAG POS={{EXT}} TYPE=A ATTR=CLASS:_52c6 EXTRACT=HREF" + "\n";
//CopyPosts += "TAG POS={{i}} TYPE=IMG ATTR=HREF:https://external* EXTRACT=HREF" + "\n";
CopyPosts += "TAG POS={{i}} TYPE=DIV ATTR=CLASS:_1dwg* EXTRACT=HTM" + "\n";


SaveData = "CODE:";
SaveData += "ADD !EXTRACT {{TITLE}}" + "\n";
SaveData += "ADD !EXTRACT {{PAGEURL}}" + "\n";
SaveData += "ADD !EXTRACT " + "\n";
SaveData += "ADD !EXTRACT " + "\n";
SaveData += "ADD !EXTRACT {{IMAGEURL}}" + "\n";
SaveData += "SAVEAS TYPE=EXTRACT FOLDER=* FILE={{OPFILENAME}}" + "\n";

iimDisplay("Starting...")

main : {

	FB = 1;
	EXT = 1;

	OPFileName = prompt("Please enter CSV file to save output.", "FacebookScrap.csv");

	totalPosts = 0;
	totalPosts = prompt("Please enter total number of posts to scrap", "1");

	if (totalPosts == null) {
		totalPosts = 0;
	}

	for(i = 1; i <= totalPosts; i++)
	{
		erero = 1;

		iimDisplay("Running " + i + " of " + totalPosts + " posts");

		iimSet("i", i);
		iimSet("EXT", EXT);
		erero = iimPlay(CopyPosts);

		if (erero == -101) {
			break main;
		}

		PostTitle = iimGetLastExtract(1);
		PostURL = iimGetLastExtract(2);
		PostImageURL = iimGetLastExtract(3);

		EXT = EXT + 1;

		if(erero > 0) {
			/////Extract Image url from ROW FB image URL//////
			if(PostImageURL.indexOf("scaledImageFitWidth img") > 0) {
				PostImageURL = PostImageURL.split('<img class="scaledImageFitWidth img" src="')[1];
			}
			else if(PostImageURL.indexOf("scaledImageFitHeight img") > 0){
				PostImageURL = PostImageURL.split('<img class="scaledImageFitHeight img" src="')[1];
			}
			else {
				PostImageURL = "";
			}

			///If extranal images
			if(PostImageURL.indexOf("&amp;cfs=1") > 0) {
				PostImageURL = PostImageURL.split("&amp;url=")[1].split("&amp;cfs=1")[0];
			}
			else if(PostImageURL != "") {
				////Scrap reguler FB post
				PostImageURL = PostImageURL.split('" alt="')[0];

				iimSet("FB", FB);
				erero = iimPlay("CODE:TAG POS={{FB}} TYPE=A ATTR=CLASS:_4-eo<SP>_2t9n* EXTRACT=HREF");

				if (erero == -101) {
					break main;
				}

				PostURL = iimGetLastExtract(1);

				FB = FB + 1;
				EXT = EXT - 1;
			}

			PostImageURL = PostImageURL.replace(/%3A/g, ':');
			PostImageURL = PostImageURL.replace(/%2F/g, '/');
			PostImageURL = PostImageURL.replace("&amp;", "&");

			if(PostImageURL.indexOf("%3F") > 0) {
				PostImageURL = PostImageURL.split("%3F")[0];
			}

			if(PostImageURL.indexOf('" style="') > 0) {
				PostImageURL = PostImageURL.split('" style="')[0];
			}

			////Extract WEB URL if not in good form
			if(PostURL.indexOf("facebook") > 0 && PostURL.indexOf("photos") <= 0) {
				PostURL = PostURL.split("php?u=")[1].split("&h=")[0];
				PostURL = PostURL.replace(/%3A/g, ':');
				PostURL = PostURL.replace(/%2F/g, '/');
			}

			if(PostTitle != null) {
				iimSet("PAGEURL", PostURL);
				//iimSet("TITLE", PostTitle + " " + PostURL);
				iimSet("TITLE", PostTitle);
				iimSet("IMAGEURL", PostImageURL);
				iimSet("OPFILENAME", OPFileName);
				erero = iimPlay(SaveData);

				if (erero == -101) {
					break main;
				}
			}
		}
	}
}

iimDisplay("Finished!")