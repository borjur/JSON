<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1" import="java.net.*,org.json.simple.*"%>

<%
try
{
	String strJSON = URLDecoder.decode(request.getParameter("strJSON"), "UTF-8");
	JSONObject objJSON = (JSONObject) JSONValue.parse(strJSON);
	
	JSONArray answers = (JSONArray) objJSON.get("answers");
	int n = answers.size();
	String[] correctAnswers = { "2", "3", "1" };
	JSONObject objResults = new JSONObject();

	for (int i = 0; i < n; i++) 
	{
		int q = i + 1;
		String value = (String) answers.get(i);
		if (value.equals("x"))
		{
			objResults.put("q" + q, "Unanswered");
		} 
		else if (value.equals(correctAnswers[i])) 
		{
			objResults.put("q" + q, "Right");
		} 
		else 
		{
			objResults.put("q" + q, "Wrong");
		}
	}
	String strJSON2 = URLEncoder.encode(objResults.toString(),"UTF-8");
	out.write(strJSON2);
} 
catch (Exception e) 
{
	out.write("Failed: " + e.toString());
}
%>