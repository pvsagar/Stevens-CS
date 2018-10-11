###### Knowledge Discovery and Data Mining (CS 513) ######
#                       (Midterm)

# Course      : CS 513 - A
# First Name  : VIDYA SAGAR 
# Last Name   : POLAKI
# Id          : 10430970
# Purpose     : Midterm : Question 3

###### ******************************************** ######

# Clearing object environment
rm(list=ls())

# Get the working directory
getwd()

# set working Directory where you have the data file
setwd('~/R')

# Load the "IBM_Employee_Attrition_V3" from canvas into R
IBM<-read.csv('IBM_Attrition_v3.csv',na.strings = "?")

# cleaning data
# Remove the rows with blank values
IBM_Clean <- na.omit(IBM)

# changing levels of MaritalStatus to numeric vectors
IBM_Clean$MaritalStatus<-as.numeric(IBM_Clean$MaritalStatus)


# Dividing test and training datasets
# 30% of the sample size is test data
index <- sort(sample(nrow(IBM_Clean),round(.30*nrow(IBM_Clean))))
test<-IBM_Clean[index,]

# Remaining 70% of data is used as training data
training<-IBM_Clean[-index,]

#	Use knn with k=3 and classify the test dataset
library(class)
predict<- knn(training[,1:5],test[,1:5], training[,6],k=3)

#	Measure the performance of knn
table(Prediction=predict,Actual=test[,6])

# error rate
wrong<- (test[,6]!=predict)
error_rate<-sum(wrong)/length(wrong)
print(paste0("Error rate for k=3 : ",error_rate))

# accuracy or attrition rate
Attrition<- 1 -error_rate
print(paste0("Attrition rate for k=3 : ",Attrition))



