###### Knowledge Discovery and Data Mining (CS 513) ######
#         (Homework 6 - Na�ve Bayes methodology)

# Course      : CS 513 - A
# First Name  : VIDYA SAGAR
# Last Name   : POLAKI
# Id          : 10430970
# Purpose     : Homework 6 - Naive Bayes methodology  

###### ******************************************** ######

################### Problem 1 ###################

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

# import class and e1071 libraries
library(class) 
library(e1071)

## Naive Bayes classification using all variables
nBayes_all <- naiveBayes(Class~., data=training)
category_all <- predict(nBayes_all, test)

table(NBayes_all=category_all,Class=test$Class)
NB_wrong<-sum(category_all!=test$Class)
NB_errorRate<-NB_wrong/length(category_all)
NB_errorRate

accuracy <- 1-NB_errorRate
accuracy
