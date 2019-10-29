var erero
var TotalRecords
var pageNO

OpenSearchLink = "CODE:";
OpenSearchLink += "SET !DATASOURCE Ebay_URL.csv" + "\n";
OpenSearchLink += "SET !DATASOURCE_COLUMNS 1" + "\n";
OpenSearchLink += "SET !DATASOURCE_LINE {{i}}" + "\n";	
OpenSearchLink += "URL GOTO={{!COL1}}" + "\n";	

GetHTML = "CODE:";
GetHTML += "SET !TIMEOUT_STEP 1" + "\n";
GetHTML += "TAG POS={{j}} TYPE=LI ATTR=ID:item* EXTRACT=HTM" + "\n";


SaveAllData = "CODE:";
SaveAllData += "ADD !EXTRACT {{PRODUCTURL}}" + "\n";
SaveAllData += "ADD !EXTRACT {{IMAGEURL}}" + "\n";
SaveAllData += "ADD !EXTRACT {{PRODUCTNAME}}" + "\n";
SaveAllData += "ADD !EXTRACT {{PRICE}}" + "\n";
SaveAllData += "ADD !EXTRACT {{PRODUCTSTOCK}}" + "\n";
SaveAllData += "ADD !EXTRACT {{DISCOUNT}}" + "\n";
SaveAllData += "ADD !EXTRACT {{ENDINGTIME}}" + "\n";
SaveAllData += "ADD !EXTRACT {{SELLER}}" + "\n";
SaveAllData += "ADD !EXTRACT {{SKU}}" + "\n";
SaveAllData += "ADD !EXTRACT {{ORIGIN}}" + "\n";
SaveAllData += "SAVEAS TYPE=EXTRACT FOLDER=* FILE=Ebay_Search_Scrap.csv" + "\n";


CreateColumn = "CODE:";
CreateColumn += "ADD !EXTRACT PRODUCT_URL" + "\n";
CreateColumn += "ADD !EXTRACT IMAGE_URL" + "\n";
CreateColumn += "ADD !EXTRACT PRODUCT_NAME" + "\n";
CreateColumn += "ADD !EXTRACT PRICE" + "\n";
CreateColumn += "ADD !EXTRACT PRODUCT_STOCK" + "\n";
CreateColumn += "ADD !EXTRACT DISCOUNT" + "\n";
CreateColumn += "ADD !EXTRACT ENDINGTIME" + "\n";
CreateColumn += "ADD !EXTRACT SELLER" + "\n";
CreateColumn += "ADD !EXTRACT SKU" + "\n";
CreateColumn += "ADD !EXTRACT ORIGIN" + "\n";
CreateColumn += "SAVEAS TYPE=EXTRACT FOLDER=* FILE=Ebay_Search_Scrap.csv" + "\n";

ClickNextPage = "CODE:";
ClickNextPage += "SET !TIMEOUT_STEP 1" + "\n";
ClickNextPage += "TAG POS=1 TYPE=A ATTR=HREF:http://www.ebay.com/sch/*_pgn={{pageNo}}&_skc={{TotRecords}}*" + "\n";


for(i = 1; i <= 2; i++) 
{
	if(i == 1)
	{	
		iimPlay(CreateColumn);		
	}
	
	iimSet("i", i);
	iimPlay(OpenSearchLink);		
	
	erero = 1;		
	TotalRecords = 0;
	pageNO = 1;
	while(erero >= 1)
	{
		for(j = 1; j <= 50; j++)
		{
			iimSet("j", j);
			iimPlay(GetHTML);
			var HTMLCode = iimGetLastExtract(1);

			//There is no more records
			if(HTMLCode == "#EANF#")
			{
				break;				
			}		

			var HTMLLen = HTMLCode.length;	
			var productURL, ImageURL, productName, Price;	
			var productStock, Discount, EndingTime, Seller, SKU, Origin;				

			/*---------Start find product link---------*/	
			var startText = HTMLCode.search("<a href=");

			//Remove Text before found text
			var NewHTMLCode = HTMLCode.substr(startText, HTMLLen);	

			var endText = NewHTMLCode.search("class=");

			productURL = HTMLCode.substr(startText+9, endText-11);			
			/*----------End find product link-----------*/


			/*-------Start find product image URL-------*/	
			HTMLCode = NewHTMLCode.substr(endText, HTMLLen);	
			HTMLLen = HTMLCode.length;

			startText = HTMLCode.search("<img src=");		
			NewHTMLCode = HTMLCode.substr(startText, HTMLLen);	
			endText = NewHTMLCode.search("class=");

			ImageURL = HTMLCode.substr(startText+10, endText-12);			
			/*----------End find product image URL-----------*/


			/*-------Start find product name-------*/	
			HTMLCode = NewHTMLCode.substr(endText, HTMLLen);	
			HTMLLen = HTMLCode.length;

			startText = HTMLCode.search('class="vip"');
			HTMLCode = HTMLCode.substr(startText, HTMLLen);
			HTMLLen = HTMLCode.length;

			startText = HTMLCode.search('">');		
			NewHTMLCode = HTMLCode.substr(startText, HTMLLen);	
			endText = NewHTMLCode.search("</a>");
			productName = HTMLCode.substr(startText+2, endText-2);

			//Repalace <span class="newly">New listing</span> if available
			productName = productName.replace('<span class="newly">New listing</span>', ""); 
			productName = productName.trim();
			/*----------End find product name-----------*/


			/*-------Start find product price-------*/	
			HTMLCode = NewHTMLCode.substr(endText, HTMLLen);	
			HTMLLen = HTMLCode.length;

			startText = HTMLCode.search('<span class="bold">');		
			NewHTMLCode = HTMLCode.substr(startText, HTMLLen);	
			endText = NewHTMLCode.search("</span>");

			Price = HTMLCode.substr(startText+19, endText-19);
			Price = Price.trim();
			/*----------End find product price-----------*/


			/*-------Start find product total sold or watching-------*/	
			HTMLCode = NewHTMLCode.substr(endText, HTMLLen);	
			HTMLLen = HTMLCode.length;

			startText = HTMLCode.search('<div class="hotness-signal red">');
			if(startText > 0)
			{
				NewHTMLCode = HTMLCode.substr(startText, HTMLLen);	
				endText = NewHTMLCode.search("</div>");

				productStock = HTMLCode.substr(startText+32, endText-32);
				productStock = productStock.trim();
			}
			else	
			{
				productStock = "-";
			}

			if(productStock != "-")
			{
				if(productStock.search("%") > 0)	//it is discount not product stock
				{
					Discount = productStock;
					productStock = "-";
				}
			}
			else
			{
				Discount = "-";
			}
			/*----------End find product total sold or watching--------*/


			/*-------Start find product Discount (if any)-------*/	
			HTMLCode = NewHTMLCode.substr(endText, HTMLLen);	
			HTMLLen = HTMLCode.length;

			startText = HTMLCode.search('<div class="hotness-signal black">');	
			if(startText > 0)
			{
				NewHTMLCode = HTMLCode.substr(startText, HTMLLen);	
				endText = NewHTMLCode.search("</div>");

				Discount = HTMLCode.substr(startText+34, endText-34);	
				Discount = Discount.trim();
			}
			else
			{
				Discount = "-";
			}		
			/*----------End find product Ending Time-----------*/



			/*-------Start find product Ending time-------*/	
			HTMLCode = NewHTMLCode.substr(endText, HTMLLen);	
			HTMLLen = HTMLCode.length;

			startText = HTMLCode.search('class="red">');	
			if(startText > 0)
			{
				NewHTMLCode = HTMLCode.substr(startText, HTMLLen);	
				endText = NewHTMLCode.search("</span>");

				EndingTime = HTMLCode.substr(startText+12, endText-12);			
			}
			else
			{
				EndingTime = "-";
			}		
			/*----------End find product Ending Time-----------*/


			/*-------Start find product Origin-------*/	
			HTMLCode = NewHTMLCode.substr(endText, HTMLLen);	
			HTMLLen = HTMLCode.length;

			startText = HTMLCode.search("From ");
			if(startText > 0)
			{
				NewHTMLCode = HTMLCode.substr(startText, HTMLLen);	
				endText = NewHTMLCode.search("</li>");

				Origin = HTMLCode.substr(startText, endText);			
			}
			else
			{
				Origin = "-";
			}		
			/*----------End find product Origin-----------*/


			/*-------Start find product Seller Name-------*/	
			HTMLCode = NewHTMLCode.substr(endText, HTMLLen);	
			HTMLLen = HTMLCode.length;

			startText = HTMLCode.search("Seller: ");
			
			if(HTMLCode.search('<span class="selrat">'))
			{
				NewHTMLCode = HTMLCode.substr(startText, HTMLLen);	
				endText = NewHTMLCode.search("<span class=");
			}
			else
			{
				NewHTMLCode = HTMLCode.substr(startText, HTMLLen);	
				endText = NewHTMLCode.search("</li>");
			}

			Seller = HTMLCode.substr(startText+8, endText-8);	
			/*----------End find product Seller Name-----------*/


			/*-------Start find product SKU-------*/	
			HTMLCode = NewHTMLCode.substr(endText, HTMLLen);	
			HTMLLen = HTMLCode.length;

			startText = HTMLCode.search("Item: ");		
			NewHTMLCode = HTMLCode.substr(startText, HTMLLen);	
			endText = NewHTMLCode.search("</li>");

			SKU = HTMLCode.substr(startText+6, endText-6);	
			/*----------End find product SKUe-----------*/


			//Save all extracted Data
			iimSet ("PRODUCTURL", productURL);
			iimSet ("IMAGEURL", ImageURL);
			iimSet ("PRODUCTNAME", productName);
			iimSet ("PRICE", Price);
			iimSet ("PRODUCTSTOCK", productStock);
			iimSet ("DISCOUNT", Discount);
			iimSet ("ENDINGTIME", EndingTime);
			iimSet ("SELLER", Seller);
			iimSet ("SKU", SKU);
			iimSet ("ORIGIN", Origin);

			iimPlay(SaveAllData);		
		}

		erero = 1;

		TotalRecords = TotalRecords+50;	
		pageNO = pageNO + 1;
		iimSet ("pageNo", pageNO);
		iimSet ("TotRecords", TotalRecords);

		erero = iimPlay(ClickNextPage);	
		
		//Done all products Scraping
		if(erero <= 0)
		{
			break;
		}
	}
}