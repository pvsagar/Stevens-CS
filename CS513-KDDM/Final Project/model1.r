# ****************
  # This file contains all the models developed for the project
  # 1. Models to predict with top 12 features
  # ****************
  
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

# Feature selection
Dataset1<-USvisaDataClean[,c('case_status','decision_year','country_of_citizenship',
                             'case_received_year','class_of_admission','job_info_work_state',
                             'employer_state','naics_us_code_category','pw_level_9089',
                             'pw_soc_code_category','job_info_education','job_info_experience',
                             'foreign_worker_info_req_experience')]


# set random seed
set.seed(1234)

# sample the data set into test and training data sets
index1 <- sort(sample(nrow(Dataset1),round(.25*nrow(Dataset1))))
training1<-Dataset1[-index1,]
test1<-Dataset1[index1,]


# ****************

# 1. C50 model

#install.packages("C50")
library('C50')


C50_class <- C5.0( case_status~.,data=training1 )

summary(C50_class )
C50_predict<-predict( C50_class ,test1, type="class" )


table(actual=test1[,1],C50=C50_predict)
#                     C50
# actual              Certified Certified-Expired Denied Withdrawn
# Certified             17320              7175    129        19
# Certified-Expired      2606             16963     99        23
# Denied                  751               799    493         4
# Withdrawn               844               996     21        42


C50_wrong<- (test1[,1]!=C50_predict)
c50_errorRate<-sum(C50_wrong)/length(C50_wrong)
c50_errorRate
# [1] 0.2788916

C50_accuracy <- 1-c50_errorRate
C50_accuracy
# [1] 0.7211084


# ****************

# 2 Naive Bayes Prediction Model


library('class')
#install.packages('e1071')
library('e1071')

nBayes_all <- naiveBayes(case_status~., data = training1)
category_all<- predict(nBayes_all,test1)

table(NBayes_all=category_all,Class=test1$case_status)
#                   Class
# NBayes_all          Certified Certified-Expired Denied Withdrawn
# Certified             14543              3071    533       609
# Certified-Expired      8617             15453    787      1013
# Denied                 1334               972    695       206
# Withdrawn               149               195     32        75

NB_wrong<-sum(category_all!=test1$case_status)
NB_errorRate<-NB_wrong/length(category_all)
NB_errorRate
# [1] 0.3628117
NB_accuracy <- 1-NB_errorRate

NB_accuracy
# [1] 0.6371883

# ****************

# 3. Random Forest

install.packages('randomForest')
library('randomForest')


RFfit1 <- randomForest( case_status~., data=training1, importance=TRUE, ntree=500,na.action = na.omit)
importance(RFfit1)
varImpPlot(RFfit1)
RFPrediction1 <- predict(RFfit1, test1)

table(actual=test1[,1],RFPrediction1)
# RFPrediction1
# actual              Certified Certified-Expired Denied Withdrawn
# Certified             17627              6735    109        65
# Certified-Expired      2833             16863    100        41
# Denied                  723               795    547         8
# Withdrawn               816               917     15        90

RFwrong1<- (test1[,1]!=RFPrediction1 )
RF_errorRate1<-sum(RFwrong1,na.rm = TRUE)/length(RFwrong1)
RF_errorRate1 
# 0.2724919
RF_accuracy <- 1-RF_errorRate1
RF_accuracy
# 0.7275081

