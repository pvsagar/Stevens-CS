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

Dataset2<-USvisaDataClean[,c('case_status','class_of_admission','job_info_work_state','country_of_citizenship',
                             'employer_state','naics_us_code_category','pw_level_9089',
                             'pw_soc_code_category','job_info_education','job_info_experience',
                             'foreign_worker_info_req_experience','job_info_combo_occupation',
                             'ji_offered_to_sec_j_foreign_worker')]

Dataset2$case_status<-as.numeric(Dataset2$case_status)

# case status = 1 => Certified
# case status = 3 => denied

Dataset2 <- Dataset2[which(Dataset2$case_status == 1 | Dataset2$case_status == 3),]

Dataset2$case_status<-as.factor(Dataset2$case_status)

Dataset3 <- subset(Dataset2, country_of_citizenship == 'INDIA' &
                     job_info_work_state == "NY") 

Dataset4 <- Dataset3

Dataset4[sapply(Dataset4, is.factor)] <- lapply(Dataset4[sapply(Dataset4, is.factor)],as.numeric)

str(Dataset3)
str(Dataset4)

set.seed(1234)

index3 <- sort(sample(nrow(Dataset3),round(.25*nrow(Dataset3))))
training3<-Dataset3[-index3,]
test3<-Dataset3[index3,]

set.seed(1234)

index4 <- sort(sample(nrow(Dataset4),round(.25*nrow(Dataset4))))
training4<-Dataset4[-index4,]
test4<-Dataset4[index4,]


# ************************************************
# 1. KNN

# Converting num to Factors


library('class')
knn_predict<-knn(training4[,c(-1)],test4[,c(-1)],training4[,1],k =2)
knn_wrong<-(test4[,1]!= knn_predict)

knn_errorRate<-sum(knn_wrong)/length(knn_wrong)
knn_errorRate
# 0.05134189
Knn_accuracy<- 1- knn_errorRate
Knn_accuracy
# 0.9486581

# Calculating Precision, Recall and F1 values of the model

#install.packages('caret')
library('caret')

actualValues<-as.factor(test4$case_status)
KnnPredictedValues <- as.factor(knn_predict) 

KNN_precision <- posPredValue(KnnPredictedValues, actualValues, positive="1")
KNN_recall <- sensitivity(KnnPredictedValues, actualValues, positive="1")

KNN_precision
# [1] 0.957497

KNN_recall
# [1] 0.990232

KNN_F1_2 <- (2 * KNN_precision * KNN_recall) / (KNN_precision + KNN_recall)

KNN_F1_2
# [1] 0.9735894






# ************************************************
# 2. C50 model

library('C50')

C50_class3 <- C5.0( case_status~.,data=training3 )

summary(C50_class3)
C50_predict3<-predict( C50_class3 ,test3, type="class" )

table(actual=test3[,1],C50=C50_predict3)
#           C50
# actual     1     3
#     1     819    0
#     3      38    0

C50_wrong3<- (test3[,1]!=C50_predict3)
C50_errorRate3<-sum(C50_wrong3)/length(C50_wrong3)
C50_errorRate3
# [1] 0.04434072

C50_accuracy3 <- 1-C50_errorRate3

C50_accuracy3
# [1] 0.9556593


# Calculating Precision, Recall and F1 values of the model

#install.packages('caret')
library('caret')

actualValues<-test3$case_status
C50_PredictedValues3 <- C50_predict3 

C50_precision3 <- posPredValue(C50_PredictedValues3, actualValues, positive="1")
C50_recall3 <- sensitivity(C50_PredictedValues3, actualValues, positive="1")

C50_precision3
# [1] 0.9556593

C50_recall3
# [1] 1

C50_F1_3 <- (2 * C50_precision3 * C50_recall3) / (C50_precision3 + C50_recall3)

C50_F1_3
# 0.977327

# ************************************************
# 3 Naive Bayes Prediction Model

library('class')
#install.packages('e1071')
library('e1071')


nBayes_all3 <- naiveBayes(case_status~., data = training3)
category_all3<- predict(nBayes_all3,test3)

table(NBayes_all3=category_all3,Class=test3$case_status)
#        Class
# NBayes_all3     1    3
#         1     818   35
#         3       1    3

NB_wrong3<-sum(category_all3!=test3$case_status)
NB_errorRate3<-NB_wrong3/length(category_all3)
NB_errorRate3
# [1] 0.042007
NB_accuracy3 <- 1-NB_errorRate3

NB_accuracy3
# [1] 0.957993

# Calculating Precision, Recall and F1 values of the model

#install.packages('caret')
library('caret')

actualValues<-test3$case_status
NB_PredictedValues3 <- category_all3 

NB_precision3 <- posPredValue(NB_PredictedValues3, actualValues, positive="1")
NB_recall3 <- sensitivity(NB_PredictedValues3, actualValues, positive="1")

NB_precision3
# [1] 0.9589683

NB_recall3
# [1] 0.998779

NB_F1_3 <- (2 * C50_precision3 * C50_recall3) / (C50_precision3 + C50_recall3)

NB_F1_3
# [1] 0.977327

# ************************************************
# 4. Random Forest

#install.packages('randomForest')
#install.packages('ggplot2')
library('randomForest')


RFfit3 <- randomForest( case_status~., data=training3, importance=TRUE, ntree=1000,na.action = na.omit)
importance(RFfit3)
varImpPlot(RFfit3)
RFPrediction3 <- predict(RFfit3, test3)

table(actual=test3[,1],RFPrediction3)

# RFPrediction3
# actual   1   3
# 1      819   0
# 3       38   0


RFwrong3<- (test3[,1]!=RFPrediction3 )
RF_errorRate3<-sum(RFwrong3,na.rm = TRUE)/length(RFwrong3)
RF_errorRate3 
# 0.04434072
RF_accuracy3 <- 1-RF_errorRate3

RF_accuracy3
# 0.9556593

# Calculating Precision, Recall and F1 values of the model

#install.packages('caret')
library('caret')

actualValues<-test3$case_status
RF3_PredictedValues3 <- RFPrediction3 

RF3_precision3 <- posPredValue(RF3_PredictedValues3, actualValues, positive="1")
RF3_recall3 <- sensitivity(RF3_PredictedValues3, actualValues, positive="1")

RF3_precision3
# [1] 0.9556593

RF3_recall3
# [1] 1

RF3_F1_3 <- (2 * RF3_precision3 * RF3_recall3) / (RF3_precision3 + RF3_recall3)

RF3_F1_3
# [1] 0.977327




# ************************************************
# 5. CART

#install.packages("rpart")
#install.packages("rpart.plot")     # Enhanced tree plots
#install.packages("rattle")         # Fancy tree plot
#install.packages("RColorBrewer")   # colors needed for rattle
library(rpart)
library(rpart.plot)  			# Enhanced tree plots
library(rattle)           # Fancy tree plot
library(RColorBrewer)     # colors needed for rattle

CART_class3<-rpart( case_status~.,data=training3)
#rpart.plot(CART_class3)


CART_predict3<-predict(CART_class3,test3, type="class")
table(Actual=test3[,1],CART=CART_predict3)
#       CART
#   Actual   1   3
#       1  819   0
#       3   38   0

CART_wrong3<-sum(test3[,1]!=CART_predict3)
CART_error_rate3<-CART_wrong3/length(test3[,1])
CART_error_rate3
# 0.04434072

CART_accuracy3 <- 1- CART_error_rate3
CART_accuracy3
# 0.9556593

# Calculating Precision, Recall and F1 values of the model

#install.packages('caret')
library('caret')

actualValues<-test3$case_status
CART_PredictedValues3 <- CART_predict3 

CART_precision3 <- posPredValue(CART_PredictedValues3, actualValues, positive="1")
CART_recall3 <- sensitivity(CART_PredictedValues3, actualValues, positive="1")

CART_precision3
# [1] 0.9556593

CART_recall3
# [1] 1

CART_F1_3 <- (2 * CART_precision3 * CART_recall3) / (CART_precision3 + CART_recall3)

CART_F1_3
# [1] 0.977327

# ************************************************
# 6. ANN

Dataset5 <- Dataset3[which(Dataset3$class_of_admission == "H-1B"),]

Dataset5[sapply(Dataset5, is.factor)] <- lapply(Dataset5[sapply(Dataset5, is.factor)],as.numeric)


set.seed(1234)

index5 <- sort(sample(nrow(Dataset5),round(.25*nrow(Dataset5))))
training5<-Dataset5[-index5,]
test5<-Dataset5[index5,]

#install.packages("neuralnet")
library("neuralnet")

net_bc2  <- neuralnet(case_status~  job_info_education+
                      naics_us_code_category+pw_level_9089+job_info_experience
                      ,training5, hidden=10, threshold=0.01, stepmax = 1e6)

#Plot the neural network
plot(net_bc2)

net_bc2_results <-compute(net_bc2, test4[,c(6,7,9,10)])
ANN=as.numeric(net_bc2_results$net.result)


ANN_round<-round(ANN)
ANN_cat<-ifelse(ANN<1.5,1,2)

table(Actual=test4$case_status,ANN_cat)

wrong<- (test4$case_status!=ANN_cat)
ANN_errorRate<-sum(wrong)/length(wrong)
ANN_errorRate
# 0.0517415

ANN_accuracy <- 1- ANN_errorRate

ANN_accuracy
# 0.9482585
