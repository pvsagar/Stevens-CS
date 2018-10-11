###### Knowledge Discovery and Data Mining (CS 513) ######
#         (Homework 6 - Random Forest methodology )

# Course      : CS 513 - A
# First Name  : VIDYA SAGAR
# Last Name   : POLAKI
# Id          : 10430970
# Purpose     : Homework 6 - Random Forest methodology  

###### ******************************************** ######

################### Problem 2 ###################

# clearing object environment
rm(list = ls())

# get working directory
getwd()

# set working directory
setwd('~/R')

# Load Breast cancer data file CSV
BCD<-read.csv('breastCancerWisconsinData.csv',na.strings = '?')

# View Breast cancer data file
View(BCD)

# internal structure of BCD
str(BCD)

# convert all the integer data types to factor data type
BCD[sapply(BCD, is.integer)] <- lapply(BCD[sapply(BCD, is.integer)],as.factor)

# verify the internal structure of BCD again
str(BCD)

# set random seed
set.seed(1234)

# create test and training data sets removing the first coloumn which is id ID of samples
index<-sort(sample(nrow(BCD),round(.25*nrow(BCD))))
training<-BCD[-index,c(-1)]
test<-BCD[index,c(-1)]

# import random forest library
library(randomForest)

# random forest classification
fit <- randomForest( Class~., data=training, importance=TRUE, ntree=1000,na.action = na.omit)
importance(fit)
varImpPlot(fit)
Prediction <- predict(fit, test)
table(actual=test[,10],Prediction)

wrong<- (test[,10]!=Prediction )
errorRate<-sum(wrong,na.rm = TRUE)/length(wrong)
errorRate 

accuracy <- 1-errorRate
accuracy

# What are the top three important features?
# from the importance plot, we can conclude that F2, F6 and F3 are the top 3 important features of the data set. 

