# toy-trade


# Web Science Development Lab 6
>Team: Colleen Corrigan, Joyce Fang, Tyler Green, Jody Sunray

>Dr. Callahan

>13 April 2021

## Overview

In Lab 6, we used R to create data visualizations about various data points on our application. All of the visualizations and their corresponding "Download CSV" buttons are located on the Data Visualization page.

## Challenges

## Steps for creating a Pie Chart in RStudio

1. `table_var <- table(filename$col_name)`

2. `slices <- c(table_var)`

3. `lbls <- paste(names(table_var))`

4. `pct <- round(slices/sum(slices)*100)`

5. `lbls <- paste(lbls, pct) # add percents to labels`

6. `lbls <- paste(lbls,"%",sep="") # ad % to labels`

7. `pie(table_var, labels=lbls, main="Title of Pie Chart")`

## Steps for creating a Histogram in RStudio

1. `table_var <- table(filename$col_name)`

2. `hist(table_var, xlab="X-Axis Label", ylab="Y-Axis Label", main="Title of Histogram", col=c("Color 1", "Color 2", "Color 3", etc))`

## Resources for Creating R Data Visualizations

[R Pie Charts](https://www.statmethods.net/graphs/pie.html)

[R Histograms](https://www.datamentor.io/r-programming/histogram/)

[Colors in R](http://www.stat.columbia.edu/~tzheng/files/Rcolor.pdf?utm_source=twitterfeed&utm_medium=twitter)

**The colors we used for the histogram were: `lavender`, `lightcyan`, `lavenderblush`, and `honeydew`

## Contributions and Challenges

Colleen: For this lab, I worked on two different data visualizations: a Pie Chart and Histogram. The first visualization, the Pie Chart, represents the percentage of various conditions of toys on Toy Trade that users have listed. These conditions include "New", "Used: Like New", "Used: Very Good", and "Used: Good." The data comes from the Toys collection in the database. The second visualization is the histogram, which represents the average number of messages that a user has sent. This data is downloaded from the current data in the Messages collection of the database. Each of the visualizations data can be downloaded using the "Download CSV" button.

Joyce: For this lab I worked on two different types of data visualizations: Pie Chart and Histogram (the top two on the Data Visualization page). The Pie Chart represents the percentages of various brands of toys that users on Toy Trade typically list. These brands range from Hasbro, Lego, Fisher-Price, etc. The other type of data visualization, the histogram, demonstrates how many requests each toy typically receives. For example, the first purple bar shows that 8 different toys received a single request, while one toy received 3 requests. Under the visualizations, you can also download the CSV for the relevant data needed to make these visualizations. Note that the data in the CSV file may not match the image because the CSV file is grabbed dynamically with a get request. One of the challenges I had was learning how to write the R code to make the charts. There were plenty of helpful resources online that helped me to understand how to create the visualizations.

Tyler:

Jody: For this lab, I worked on the two data visualizations in the second row on the Data Visualization page. The first visual is a pie chart which shows the percentage of toys with belong to each toy category, such as Cars, Animals, and Action Figures. To make this visual, I started by creating the "Download CSV" button. When the user clicks this button, a GET request is made to Node. This request collects all of the toy categories from the Toys collection, along with each toy's ObjectId. This data is written to a CSV file called categories.csv using the json2csv Node module. I then imported categories.csv into RStudio and generated the pie chart using the pie function. Also, when the user clicks the "Download CSV" button, the file downloads. While the pie chart is not dynamically loaded, the CSV file is up-to-date based on the current data in the Toys collection. The second visual I created is a histogram which shows the number of toy requests users typically receive. For example, according to the diagram, three users have received more than two but less or equal to four requests. I used the same approach to generate the CSV file, except instead of collecting data from the Toys collection, I collected the receiverIds from the Notifications collection. I wrote this data to a CSV file called user_requests.csv, imported it into RStudio, and used the hist function to created the histogram. I also changed the colors of the bars in the histogram using this [reference sheet](http://www.stat.columbia.edu/~tzheng/files/Rcolor.pdf?utm_source=twitterfeed&utm_medium=twitter) for colors in R. I used the colors lavender, lightcyan, lavenderblush, and honeydew. One challenge I had was figuring out how to create the pie chart in RStudio, but after looking at examples online, I found that there is a pie function. Additionally, when trying to change the colors of the bars in the histogram, I was confused why certain colors were not being used. However, I eventually figured out that colors are applied to bars where the frequency is zero, so I ended up using "placeholder" colors for these bars.

## Creativity

Colleen: For creativity, I changed the colors and formatted the pie chart and histogram of the data that I created the visualizations for.

Joyce: For creativity, I used some nice pastel colors for both the histogram and the pie chart. I also helped to style the Data Visualization page with a nice border surrounding each visualization. Another aspect of creativity I incorporated was the use of Bootstrap cards to show each data visualization. For more aesthetics and visual appeal, I included a dropshadow on each card.

Tyler:

Jody: For creativity, I changed the mouse cursor styling to cursor: wait when the user clicks on the "Download CSV" button. I decided to add this feature because we set a timeout for two seconds before downloading the file to ensure that the file is up to date. In order to notify the user of this wait time, I decided to change the cursor styling to a spinner. Once the file downloads, I change the cursor styling back to its default state by setting it to cursor: initial.

## How to Run Application

1. Clone this repository into a folder called `toy-trade`.

2. Go to your terminal and `cd` into the folder `toy-trade`. 

3. Run `npm install`.

4. Open a separate terminal and `cd` into `toy-trade/toytrade`. Run `npm install`. Then run `ng build --watch`. 

5. In the `toy-trade` (Node.js directory), run `node server`.
