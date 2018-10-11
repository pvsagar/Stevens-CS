# **********************************************
# This file contains all the models developed for the project
# 2. models to predict for future
# **********************************************

# Clear the environment
rm(list = ls())

# get working directory
getwd()

# set working directory
setwd("~/R")

# loading dataset into R
USvisaData <- read.csv("us_perm_visas_clean6.csv",na.string="")

# view dataset
View(USvisaData)

# summary of the dataset
summary(USvisaData)

# structure of the data set
str(USvisaData)

# converting int variables to factors
USvisaData$case_received_year<-as.factor(USvisaData$case_received_year)
USvisaData$decision_year<-as.factor(USvisaData$decision_year)

# structure of the data set
str(USvisaData)

# Total number of NA values 
sum(is.na(USvisaData))
# Number of NA values per Column
colSums(is.na(USvisaData))

# Omitting NA values
USvisaDataClean <- na.omit(USvisaData)

# Structure of dataset
str(USvisaDataClean)

Dataset2<-USvisaDataClean[,c('case_status','class_of_admission','job_info_work_state',
                            'country_of_citizenship','employer_state',
                            'naics_us_code_category','pw_level_9089',
                            'pw_soc_code_category','job_info_education','job_info_experience',
                            'foreign_worker_info_req_experience','job_info_combo_occupation',
                            'ji_offered_to_sec_j_foreign_worker')]

Dataset2$case_status<-as.numeric(Dataset2$case_status)

# case status = 1 => Certified
# case status = 3 => denied

Dataset2 <- Dataset2[which(Dataset2$case_status == 1 | Dataset2$case_status == 3),]

Dataset2$case_status<-as.factor(Dataset2$case_status)

set.seed(1234)

index2 <- sort(sample(nrow(Dataset2),round(.25*nrow(Dataset2))))
training2<-Dataset2[-index2,]
test2<-Dataset2[index2,]


# **********************************************

# 1. C50 model

library('C50')


C50_class2 <- C5.0( case_status~.,data=training2 )

summary(C50_class2)
# plot(C50_class)
C50_predict2<-predict( C50_class2 ,test2, type="class" )

table(actual=test2[,1],C50=C50_predict2)
#           C50
# actual     1     3
#     1   24491   110
#     3    1874   199

C50_wrong2<- (test2[,1]!=C50_predict2)
C50_errorRate2<-sum(C50_wrong2)/length(C50_wrong2)
C50_errorRate2
# [1] 0.07437955

C50_accuracy2 <- 1-C50_errorRate2
C50_accuracy2
# [1] 0.9256205

# Calculating Precision, Recall and F1 values of the model

#install.packages('caret')
library('caret')

actualValues<-test2$case_status
C50PredictedValues2 <- C50_predict2 

C50_precision2 <- posPredValue(C50PredictedValues2, actualValues, positive="1")
C50_recall2 <- sensitivity(C50PredictedValues2, actualValues, positive="1")

C50_precision2
# [1] 0.9289209

C50_recall2
# [1] 0.9955286

C50_F1_2 <- (2 * C50_precision2 * C50_recall2) / (C50_precision2 + C50_recall2)

C50_F1_2
# [1] 0.9610721

# **********************************************

# 2 Naive Bayes Prediction Model

library('class')
#install.packages('e1071')
library('e1071')


nBayes_all2 <- naiveBayes(case_status~., data = training2)
category_all2<- predict(nBayes_all2,test2)

table(NBayes_all2=category_all2,Class=test2$case_status)
#        Class
# NBayes_all     1     3
#         1  22711  1531
#         3   1890   542

NB_wrong2<-sum(category_all2!=test2$case_status)
NB_errorRate2<-NB_wrong2/length(category_all2)
NB_errorRate2
# [1] 0.1282522
NB_accuracy2 <- 1-NB_errorRate2

NB_accuracy2
# [1] 0.8717478

# Calculating Precision, Recall and F1 values of the model

#install.packages('caret')
library('caret')

actualValues<-test2$case_status
NB_PredictedValues2 <- category_all2 

NB_precision2 <- posPredValue(NB_PredictedValues2, actualValues, positive="1")
NB_recall2 <- sensitivity(NB_PredictedValues2, actualValues, positive="1")

NB_precision2
# [1] 0.9368451

NB_recall2
# [1] 0.9231739

NB_F1_2 <- (2 * NB_precision2 * NB_recall2) / (NB_precision2 + NB_recall2)

NB_F1_2
# [1] 0.9299593

# **********************************************

# 3. Random Forest

#install.packages('randomForest')
#install.packages('ggplot2')
library('randomForest')


RFfit2 <- randomForest( case_status~., data=training2, importance=TRUE, ntree=1000,na.action = na.omit)
importance(RFfit2)
varImpPlot(RFfit2)
RFPrediction2 <- predict(RFfit2, test2)

table(actual=test2[,1],RFPrediction2)
# RFPrediction2
# actual     1     3
# 1      24373   228
# 3       1760   313

RFwrong2<- (test2[,1]!=RFPrediction2 )
RF_errorRate2<-sum(RFwrong2,na.rm = TRUE)/length(RFwrong2)
RF_errorRate2 
# 0.07460448
RF_accuracy2 <- 1-RF_errorRate2

RF_accuracy2
# 0.9253955

# Calculating Precision, Recall and F1 values of the model

#install.packages('caret')
library('caret')

actualValues<-test2$case_status
RF2_PredictedValues2 <- RFPrediction2 

RF2_precision2 <- posPredValue(RF2_PredictedValues2, actualValues, positive="1")
RF2_recall2 <- sensitivity(RF2_PredictedValues2, actualValues, positive="1")

RF2_precision2
# [1] 0.9368451

RF2_recall2
# [1] 0.9231739

RF2_F1_2 <- (2 * NB_precision2 * NB_recall2) / (NB_precision2 + NB_recall2)

RF2_F1_2
# [1] 0.9299593


# **********************************************

# 4. CART

#install.packages("rpart")
#install.packages("rpart.plot")     # Enhanced tree plots
#install.packages("rattle")         # Fancy tree plot
#install.packages("RColorBrewer")   # colors needed for rattle
library(rpart)
library(rpart.plot)  			# Enhanced tree plots
library(rattle)           # Fancy tree plot
library(RColorBrewer)     # colors needed for rattle

CART_class2<-rpart( case_status~.,data=training2)
#rpart.plot(CART_class2)


CART_predict2<-predict(CART_class2,test2, type="class")
table(Actual=test2[,1],CART=CART_predict2)
# CART
# Actual      1     3
#       1 24601     0
#       3  2073     0

CART_wrong2<-sum(test2[,1]!=CART_predict2)
CART_error_rate2<-CART_wrong2/length(test2[,1])
CART_error_rate2
# 0.07771613
CART_accuracy2 <- 1- CART_error_rate2

CART_accuracy2
# 0.9222839

# Calculating Precision, Recall and F1 values of the model

install.packages('caret')
library('caret')

actualValues<-test2$case_status
CART_PredictedValues2 <- CART_predict2 

CART_precision2 <- posPredValue(CART_PredictedValues2, actualValues, positive="1")
CART_recall2 <- sensitivity(CART_PredictedValues2, actualValues, positive="1")

CART_precision2
# [1] 0.9222839

CART_recall2
# [1] 1

CART_F1_2 <- (2 * CART_precision2 * CART_recall2) / (CART_precision2 + CART_recall2)

CART_F1_2
# [1] 0.9595709


# **********************************************
