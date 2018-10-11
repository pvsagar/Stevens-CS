
# this code contains working randm forest for feature selection


# Clear the environment
rm(list = ls())
# get working directory
getwd()
# set working directory
setwd("~/R")

# loading dataset into R
fullData <- read.csv("us_perm_visas_clean6.csv",na.string="")

# view dataset
View(fullData)

# summary of the dataset
summary(fullData)

# attributes present in the dataset
attributes(fullData)

# structure of the data set
str(fullData)


fullData$case_received_year<-as.factor(fullData$case_received_year)
fullData$decision_year<-as.factor(fullData$decision_year)

#  look for missing values
is.na(fullData)
missing<-fullData[is.na(fullData)]
missing

# remove the missing values
finalDataset <- na.omit(fullData)


str(finalDataset)

#specifying outcome variable as factor

finalDataset$case_status<-as.factor(finalDataset$case_status)

index <- sort(sample(nrow(finalDataset),round(.30*nrow(finalDataset))))
training<-finalDataset[-index,]
test<-finalDataset[index,]

#applying Random Forest
#install.packages('randomForest')
library('randomForest')

fit <- randomForest( case_status~., data=training, importance=TRUE, ntree=1000,na.action = na.omit)
importance(fit)
varImpPlot(fit)
Prediction <- predict(fit, test)

table(actual=test[,1],Prediction)

wrong<- (test[,1]!=Prediction )
errorRate<-sum(wrong,na.rm = TRUE)/length(wrong)
errorRate 

accuracy <- 1-errorRate
accuracy







