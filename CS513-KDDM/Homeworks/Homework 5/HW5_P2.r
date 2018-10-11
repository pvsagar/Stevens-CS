###### Knowledge Discovery and Data Mining (CS 513) ######
#         (Homework 5 - C5.0 Methodology)

# Course      : CS 513 - A
# First Name  : VIDYA SAGAR
# Last Name   : POLAKI
# Id          : 10430970
# Purpose     : Homework 5 - C5.0 Methodology

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

# convert all the integer data types to factor data type.
BCD[sapply(BCD, is.integer)] <- lapply(BCD[sapply(BCD, is.integer)],as.factor)

# verify the internal structure of BCD again
str(BCD)

# set random seed
set.seed(1234)

# create test and training data sets removing the first coloumn which is id ID of samples
index<-sort(sample(nrow(BCD),round(.25*nrow(BCD))))
training<-BCD[-index,c(-1)]
test<-BCD[index,c(-1)]


# C50  classification 
library('C50')
C50_class <- C5.0( Class~.,data=training )

summary(C50_class )
plot(C50_class)
C50_predict<-predict( C50_class ,test, type="class" )
table(actual=test[,10],C50=C50_predict)


wrong<- (test[,10]!=C50_predict)
c50_errorRate<-sum(wrong)/length(wrong)
c50_errorRate

accuracy <- 1-c50_errorRate
accuracy

