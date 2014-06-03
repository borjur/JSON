<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1" import="java.net.*,org.json.simple.*"%>

<%
try
{
	String strJSON = URLDecoder.decode(request.getParameter("strJSON"), "UTF-8");
	JSONObject objJSON = (JSONObject) JSONValue.parse(strJSON);
		
	String question = objJSON.get("question").toString().substring(1);
	String answer = objJSON.get("answer").toString();
	
	switch (Integer.parseInt(question)) //evaluates to an integer
	{
		case 1 :
			if (answer.equals("2"))
			{
				out.write("Right");
			}
			else
			{
				out.write("Wrong");
			}
			break;
		case 2 :
			if (answer.equals("3"))
			{
				out.write("Right");
			}
			else
			{
				out.write("Wrong");
			}
			break;
		case 3 :	
			if (answer.equals("1"))
			{
				out.write("Right");
			}
			else
			{
				out.write("Wrong");
			}
			break;
		default:
			out.write("Failed");
	}
}
catch (Exception e)
{
	out.write("Failed: " + e.toString());
}
%>