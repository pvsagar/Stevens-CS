###### Knowledge Discovery and Data Mining (CS 513) ######
#         (Homework 3 - K Nearest Neighbors(knn))

# Course      : CS 513 - A
# First Name  : VIDYA SAGAR
# Last Name   : POLAKI
# Id          : 10430970
# Purpose     : Homework 3 - K Nearest Neighbors

###### ******************************************** ######

################### Problem 2 ###################

# clearing object environment
rm(list=ls())

# get working directory
getwd()

# set working directory
setwd('~/R')

# Load Breast cancer data file CSV
cancerData <- read.csv('breastCancerWisconsinData.csv',na.string="?")

# View Breast cancer data file 
View(cancerData)

# Remove any row with a missing value in any of the columns.
cancerData_missing<-na.omit(cancerData)

# View cancerData_missing data file 
View(cancerData_missing)

# Readiing every fifth record in Breast cancer dataset for test dataset
recordRange <- seq(from = 1, to = nrow(cancerData_missing), by = 5)

# loading Breast cancer fith range record in test dataset
test <- cancerData_missing[recordRange, ]

# loading all Breast cancer record except fith range record in training dataset
training <- cancerData_missing[-recordRange, ]

# Use knn with k=1 and classify the test dataset
# importing "class" package
library(class);

# using knn model
predict <- knn(training[ , -5], test[ , -5], training[ , 5], k = 1)

# Measure the performance of knn
table(Predict = predict, Actual = test[ , 5])

# Repeat the above steps with k=2, k=5, k=10

# k = 2
predict_K2 <- knn(training[ , -5], test[ , -5], training[ , 5], k = 2)
table(Predict = predict_K2, Actual = test[ , 5])

# k = 5
predict_K5 <- knn(training[ , -5], test[ , -5], training[ , 5], k = 5)
table(Predict = predict_K5, Actual = test[ , 5])

# k = 10
predict_K10 <- knn(training[ , -5], test[ , -5], training[ , 5], k = 10)
table(Predict = predict_K10, Actual = test[ , 5])

# clearing object environment
rm(list=ls())

################### THE END ###################