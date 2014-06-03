/*
	Function Name: ContentLoader
	Arguments: 
		URL: the URL to which the request is sent
		METHOD: the method used to send the request.  If this is set to JSON or XML, the POST method will be used.
		CALLBACK: the function to call when the server response is complete
		RESULTDIV: the name of the div that will contain the output
		PARAMS: an object with properties and values
	Returns: Nothing
	Notes: Used to create and send an XMLHttpRequest object and call a specified callback function when the server response is complete.
*/

function ContentLoader(URL,METHOD,CALLBACK,RESULTDIV,PARAMS)
{
	this.xmlhttp=null;
	this.url = URL;
	this.method = (typeof METHOD == "undefined" || typeof METHOD == null) ? "GET" : METHOD.toUpperCase();
	this.callBack=CALLBACK;
	this.resultDiv = (typeof RESULTDIV == "string") ? document.getElementById(RESULTDIV) : RESULTDIV;
	this.params = (typeof PARAMS == "undefined") ? null : PARAMS;
	this._loadAjax();
}

ContentLoader.prototype._loadAjax=function()
{	
	var PostQS;
	if (this.method=="POST")
	{
		PostQS = this._createQueryString();
	}
	else //GET OR HEAD
	{
		this.url = this.url + "?" + this._createQueryString();
		PostQS = null;
	}
	
	if ( this.xmlhttp=this._createXHR() )
	{
		try
		{
			var loader=this;
			this.xmlhttp.onreadystatechange=function() 
			{
       			loader._onReadyState.call(loader);
			}
			this.xmlhttp.open(this.method,this.url,true);
			
			if (this.method=="POST")
			{
				this.xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
			}
			this.xmlhttp.send(PostQS);
		}
		catch(exc)
		{
			alert("ERROR: " + exc.message);
		}
	}
	else
	{
		alert("ERROR: AJAX NOT SUPPORTED");
	}
}

ContentLoader.prototype._onReadyState=function()
{
	if (this.xmlhttp.readyState==4 && this.xmlhttp.status == 200)
	{
		if (this.callBack) this.callBack.call(this);
	}
	else if (this.xmlhttp.readyState==4)
	{
		alert("Error: " + this.xmlhttp.responseText);
	}
}

/*
	Function Name: _createXHR
	Arguments: none
	Returns: browser-specific xmlhttp object or false
*/
ContentLoader.prototype._createXHR=function()
{
	try
	{
		xmlhttp = new XMLHttpRequest();
	}
	catch(exc1)
	{
		var ieXmlHttpVersions = new Array();
		ieXmlHttpVersions[ieXmlHttpVersions.length] = "MSXML2.XMLHttp.5.0";
		ieXmlHttpVersions[ieXmlHttpVersions.length] = "MSXML2.XMLHttp.4.0";
		ieXmlHttpVersions[ieXmlHttpVersions.length] = "MSXML2.XMLHttp.3.0";
		ieXmlHttpVersions[ieXmlHttpVersions.length] = "MSXML2.XMLHttp";
		ieXmlHttpVersions[ieXmlHttpVersions.length] = "Microsoft.XMLHttp";
		
		var i;
		for (i=0; i < ieXmlHttpVersions.length; i++)
		{
			try
			{
				xmlhttp = new ActiveXObject(ieXmlHttpVersions[i]);
				break;
			}
			catch (exc2)
			{
				//alert(ieXmlHttpVersions[i] + " not supported.");
			}
		}
	}
	return xmlhttp;
}

ContentLoader.prototype._createQueryString=function()
{
	var qs="timestamp=" + new Date().getTime();
	if (typeof this.params == "object") //if no arguments are passed, arguments has a length of 1 and arguments[0] is undefined.
	{
		for (i in this.params)
		{
			qs += "&" + i + "=" + this.params[i];
		}
	}
	return qs;
}