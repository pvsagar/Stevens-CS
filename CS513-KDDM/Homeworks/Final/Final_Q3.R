###### Knowledge Discovery and Data Mining (CS 513) ######
#         (Final Exam - Q3)

# Course      : CS 513 - A
# First Name  : VIDYA SAGAR
# Last Name   : POLAKI
# Id          : 10430970
# Purpose     : Final Exam - Q3

###### ******************************************** ######

# clearing object environment
rm(list = ls())

# get working directory
getwd()

# set working directory
setwd('~/R')


#Q3. Use the "IBM Employee Attrition V2" dataset in CANVAS to uncover the features that can predict employee attrition
#This is a subset of a fictional data set created by IBM data scientists. 
#Do not normalize the data.

# load IBM attrition csv file
IBM <- read.csv('IBM_Employee_Attrition_V2.csv')

# view IBM dataset
View(IBM)

# Summary of IBM dataset
summary(IBM)

# Structure of IBM dataset
str(IBM)

# drop the employee ID column
IBM2 <- subset(IBM,select = -c(EmployeeID))

# view IBM2 dataset
View(IBM2)

# Summary of IBM2 dataset
summary(IBM2)

# Structure of IBM2 dataset
str(IBM2)

#Split the data into training and test in the ratio of 75:25 respectively.
set.seed(1234)

index<-sort(sample(nrow(IBM2),round(.25*nrow(IBM2))))
training<-IBM2[-index,]
test<-IBM2[index,]

# Load all required Libraries
library(e1071)
library(class)
library(C50)
library(randomForest)
library(rpart)
library(rpart.plot)
library(rattle)
library(RColorBrewer)


#1. Naive Bayes
nBayes_all <- naiveBayes(Attrition~., data=training)
category_all <- predict(nBayes_all, test)

table(actual=test$Attrition,Naive_Bayes=category_all)
NB_wrong<-sum(category_all!=test$Attrition)
NB_errorRate<-NB_wrong/length(category_all)
NB_errorRate

NB_accuracy <- 1-NB_errorRate
NB_accuracy

#2. CART

CART_class <- rpart( Attrition~.,data=training)
rpart.plot(CART_class)
CART_predict <- predict(CART_class,test)
str(CART_predict)
CART_predict_cat <- ifelse(CART_predict[,1]<=0.5,'Yes','No')

table(Actual=test$Attrition,CART=CART_predict_cat)
CART_wrong <- sum(test$Attrition!=CART_predict_cat)
CART_errorRate <- CART_wrong/length(test[,6])
CART_errorRate

CART_accuracy <- 1-CART_errorRate
CART_accuracy

#3. C5.0

C50_class <- C5.0(Attrition~.,data=training)
C50_predict<-predict( C50_class ,test , type="class" )

table(actual=test$Attrition,C50=C50_predict)
c50_wrong<- (test$Attrition!=C50_predict)
c50_errorRate<-sum(c50_wrong)/length(test$Attrition)
c50_errorRate

c50_accuracy <- 1-c50_errorRate
c50_accuracy


#4. Random Forest

fit <- randomForest( Attrition~., data=training, importance=TRUE, ntree=10000, proximity=TRUE, na.action = na.omit)
varImpPlot(fit)
Prediction <- predict(fit, test)

table(actual=test$Attrition,Random_Forest=Prediction)
RF_wrong<- (test$Attrition!=Prediction)
RF_errorRate<-sum(RF_wrong,na.rm = TRUE)/length(RF_wrong)
RF_errorRate

RF_accuracy <- 1-RF_errorRate
RF_accuracy

