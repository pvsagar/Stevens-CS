###### Knowledge Discovery and Data Mining (CS 513) ######
#                       (Midterm)

# Course      : CS 513 - A
# First Name  : VIDYA SAGAR 
# Last Name   : POLAKI
# Id          : 10430970
# Purpose     : Midterm : Question 2

###### ******************************************** ######

# Clearing object environment
rm(list=ls())

# Get the working directory
getwd()

# set working Directory where you have the data file
setwd('~/R')

# Load the "IBM_Employee_Attrition_V3" from canvas into R
IBM<-read.csv('IBM_Attrition_v3.csv',na.strings = "?")

# I.	Summarizing each column (e.g. min, max, mean )
summary(IBM)

# II.	Identifying missing values
is.na(IBM)
missing<-IBM[is.na(IBM$MonthlyIncome),]
missing

# III.	Displaying the frequency table of "Attrition" vs. "MaritalStatus"
table(Attrition=IBM$Attrition,MaritalStatus=IBM$MaritalStatus)

# IV.	Displaying the scatter plot of "Age", "MaritalStatus" and "YearsAtCompany", one pair at a time
pairs(IBM[c(1,3,5)], main = "IBM attrition rate", pch = 21, bg = c("red", "blue")[factor(IBM$Attrition)])


# V.	Show histogram box plot for columns:  "Age", "MaritalStatus" and "YearsAtCompany"
boxplot(IBM[c(1,3,5)])

# VI.	Replacing the missing values of "MonthlyIncome" with the "mean" of "MonthlyIncome".
IBM$MonthlyIncome[is.na(IBM$MonthlyIncome)] <- round(mean(IBM$MonthlyIncome, na.rm = TRUE))

