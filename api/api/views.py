from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt 
import csv
import json
import pandas as pd

uploadedData = None

#Transforms the data from csv into Dataframes and generates a response for each component.
def calcResponse():
	
	#Table response prep
	df = pd.read_csv('files/prices.csv')
	df.set_index('DATE', inplace=True)
	s= df.loc[[df.index.max()]]
	df = pd.DataFrame(s).reset_index()
	df.set_index('DATE',inplace=True)
	df = df.transpose()
	df = df.reset_index()
	df.columns =['name','closePrice']
	res = pd.merge(uploadedData, df, how='left', on='name')
	table = res.to_json(orient='records')
	
	#LineChart Response prep
	res[['weight', 'closePrice']] = res[['weight', 'closePrice']].astype(float)
	res['y'] = res['weight']*res['closePrice']
	res = res[['name', 'y']].copy()
	res.columns =['label','y']
	lineChart = res.to_json(orient='records')

	#BarChart response prep
	res =  res.sort_values(by='y', ascending=False)
	res = res.head() 
	barChart = res.to_json(orient='records')
	
	#Response containing data for the 3 elements: Table, LineChart and BarChart
	response = HttpResponse("{ \"tableData\": " + table +
	 ", \"barChart\": { \"title\": { \"text\": \"Top 5 Biggest ETF Holdings\" }, \"animationEnabled\": \"True\", \"zoomEnabled\": \"True\", \"exportEnabled\": \"True\", \"theme\": \"light1\",  \"axisX\":{\"reversed\":  \"\"}," + 
	 		"\"data\":[{ \"type\": \"column\", \"indexLabelFontColor\": \"#5A5757\", \"indexLabelPlacement\": \"outside\", \"dataPoints\":" + barChart + "}]}," + 
	 " \"lineChart\": { \"title\": { \"text\": \"Reconstructed price of ETFs\" }, \"animationEnabled\": \"True\", \"zoomEnabled\": \"True\", \"exportEnabled\": \"True\", \"theme\": \"light1\", " + 
	 		" \"data\":[{ \"type\": \"line\", \"indexLabelFontColor\": \"#5A5757\", \"indexLabelPlacement\": \"outside\", \"dataPoints\":" + lineChart + "}]}}")
	response['content-type'] = 'application/json'
	response['Access-Control-Allow-Origin'] = '*'
	return response

# Handles the parsing of the uploaded .csv
@csrf_exempt 
def uploadCSV(request):
	uploadDf = pd.read_csv(request.FILES['file'], skiprows=[0],  names=["name","weight"])
	global uploadedData 
	uploadedData = uploadDf
	return calcResponse()

#Poll method used for detecting changes. Called every 3 seconds by the UI.
def fetchChanges(request):
	return calcResponse()

