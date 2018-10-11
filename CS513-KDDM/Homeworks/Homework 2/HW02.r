###### Knowledge Discovery and Data Mining (CS 513) ######
#         (Homework 2 - Exploratory Data Analyisis(EDA))

# Course      : CS 513 - A
# First Name  : VIDYA SAGAR
# Last Name   : POLAKI
# Id          : 10430970
# Purpose     : Homework 2 - Exploratory Data Analyisis

###### ******************************************** ######

################### Problem 1 ###################

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

# Summarizing each column
summary(cancerData)

# Identifying missing values
df<- data.frame(cancerData)
View(df)
summary(df)
# Total numer of missing values in data set
sum(is.na(df))
# Number of missing values in a row in the data set
colSums(is.na(df))

# Replacing the missing values with the "mode" (most frequent value) of the column F6.
# check for installed packages for modeest package.
installed.packages()
# install package modeest which can be used to calculate mode of data
install.packages("modeest")
# load the library modeest
library(modeest)
# calculate the mode of data for F6 column
F6_mlv<-mlv(df$F6,method = "mfv",na.rm = TRUE)
F6_mlv
F6_mlv$M
# replacing missing data with mode of column F6
df$F6[is.na(df$F6)] <- F6_mlv$M
View(df)

# Displaying the frequency table of "Class" vs. F6
ftable(df$Class,df$F6)

# Displaying the scatter plot of F1 to F6, one pair at a time
pairs(df[2:7],main = "Breast Cancer Wisconsin Data -- 2 Classes",
      pch = 21,bg =c("red","blue")[factor(df$Class)])
# Show histogram box plot for columns F7 to F9
boxplot(df[8:10])

################### Problem 2 ###################

# Delete all the objects from your R- environment. 
rm(list=ls())

# Reload the "breast-cancer-wisconsin.data.csv" from canvas into R.
cancerData1 <- read.csv('breastCancerWisconsinData.csv',na.string="?")
View(cancerData1)
nrow(cancerData1)

# Remove any row with a missing value in any of the columns.
cancerData_missing<-na.omit(cancerData1)
View(cancerData_missing)
nrow(cancerData_missing)

################### THE END ###################