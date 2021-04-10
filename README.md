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

Colleen:

Joyce: For this lab I worked on two different types of data visualizations: Pie Chart and Histogram (the top two on the Data Visualization page). The Pie Chart represents the percentages of various brands of toys that users on Toy Trade typically list. These brands range from Hasbro, Lego, Fisher-Price, etc. The other type of data visualization, the histogram, demonstrates how many requests each toy typically receives. For example, the first purple bar shows that 8 different toys received a single request, while one toy received 3 requests. Under the visualizations, you can also download the CSV for the relevant data needed to make these visualizations. Note that the data in the CSV file may not match the image because the CSV file is grabbed dynamically with a get request. One of the challenges I had was learning how to write the R code to make the charts. There were plenty of helpful resources online that helped me to understand how to create the visualizations.

Tyler:

Jody:

## Creativity

Colleen:

Joyce:

Tyler:

Jody:

## How to Run Application

1. Clone this repository into a folder called `toy-trade`.

2. Go to your terminal and `cd` into the folder `toy-trade`. 

3. Run `npm install`.

4. Open a separate terminal and `cd` into `toy-trade/toytrade`. Run `npm install`. Then run `ng build --watch`. 

5. In the `toy-trade` (Node.js directory), run `node server`.
