###### Knowledge Discovery and Data Mining (CS 513) ######
#         (Homework 9 - SVM )

# Course      : CS 513 - A
# First Name  : VIDYA SAGAR
# Last Name   : POLAKI
# Id          : 10430970
# Purpose     : Homework 9 - SVM

###### ******************************************** ######


# clearing object environment
rm(list = ls())

#loading iris dataset
data("iris")

View(iris)

#selecting every 5th record of the iris dataset
index <- seq (5,nrow(iris),by=5)

#creating test and training data
test<-iris[index,]
training<-iris[-index,]

#loading library
library("e1071")

#calculating SVM
svm_model <- svm(Species ~ ., data=training)
summary(svm_model)

#Calculating error rate
pred <- predict(svm_model,test)
wrong<- (test[,5]!=pred)
error_rate<-sum(wrong)/length(test[,5])*100
error_rate
