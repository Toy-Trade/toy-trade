# toy-trade


# Web Science Development Lab 6
>Team: Colleen Corrigan, Joyce Fang, Tyler Green, Jody Sunray

>Dr. Callahan

>13 April 2021

## Overview

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

Joyce:

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
