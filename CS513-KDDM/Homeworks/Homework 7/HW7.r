###### Knowledge Discovery and Data Mining (CS 513) ######
#         (Homework 7 - Artificial Neural Net )

# Course      : CS 513 - A
# First Name  : VIDYA SAGAR
# Last Name   : POLAKI
# Id          : 10430970
# Purpose     : Homework 7 - ANN  

###### ******************************************** ######

# clearing object environment
rm(list = ls())

# get working directory
getwd()

# set working directory
setwd('~/R')

# Load Breast cancer data file CSV
BCD<-read.csv('breastCancerWisconsinData.csv',na.strings = '?')

# View Breast cancer data file
View(BCD)

# internal structure of BCD
str(BCD)

summary(BCD)
mean(BCD$F2)
mean(BCD$F6)
apply(BCD[,c(-1,-11)],2,mean)


### remove all the records with missing value
### see mfv and median for other strategies
?na.omit()


benign<-ifelse(BCD$Class==2,1,0)
malignant<-ifelse(BCD$Class==4,1,0)

BCD2<- na.omit(data.frame(BCD,benign,malignant))

index <- seq (1,nrow(BCD2),by=5)
test<-BCD2[index,]
training<-BCD2[-index,]


library("neuralnet")
?neuralnet()

net_BCD2  <- neuralnet(benign+malignant~F1+F2+F3+F4+F5+F6+F7+F8+F9
                      ,training, hidden=10, threshold=0.01, stepmax = 1e6)




#Plot the neural network
plot(net_BCD2)

net_BCD2_results <-compute(net_BCD2, test[,c(-1,-11,-12,-13)]) 
class(net_BCD2_results$net.result)


str(net_BCD2_results)

resutls<-data.frame(Actual_Benign=test$benign,
                    Actual_Malignant=test$malignant,
                    ANN_Benign=round(net_BCD2_results$net.result[,1]),
                    ANN_Malignant=round(net_BCD2_results$net.result[,2]))


resutls2<-data.frame(Actual_Benign=test$benign,
                     Actual_Malignant=test$malignant,
                     ANN_Benign=round(net_BCD2_results$net.result[,1]),
                     ANN_Malignant=round(net_BCD2_results$net.result[,2])
                     ,Prediction=ifelse(round(net_BCD2_results$net.result[,1])==1,'B','M'))

table(Actual=resutls2$Actual_Malignant,Prediction=resutls2$Prediction)

wrong<- (round(net_BCD2_results$net.result[,1])!=test$benign )
error_rate<-sum(wrong)/length(wrong)
error_rate

accuracy <- 1- error_rate
accuracy
