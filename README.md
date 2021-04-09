# toy-trade

# Lab 6

Steps for creating a Pie Chart in RStudio

1. table_var <- table(filename$col_name)

2. slices <- c(table_var)

3. lbls <- paste(names(table_var))

4. pct <- round(slices/sum(slices)*100)

5. lbls <- paste(lbls, pct) # add percents to labels

6. lbls <- paste(lbls,"%",sep="") # ad % to labels

7. pie(table_var, labels=lbls, main="Title of Pie Chart")

Steps for creating a Histogram in RStudio

1. table_var <- table(filename$col_name)

2. hist(table_var, xlab="X-Axis Label", ylab="Y-Axis Label", main="Title of Histogram", col=c("Color 1", "Color 2", "Color 3", etc))

Resources for Creating R Data Visualizations

[R Histograms](https://www.datamentor.io/r-programming/histogram/)
