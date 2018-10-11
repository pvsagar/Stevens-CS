###### Knowledge Discovery and Data Mining (CS 513) ######
#         (Homework 8 - Clustering )

# Course      : CS 513 - A
# First Name  : VIDYA SAGAR
# Last Name   : POLAKI
# Id          : 10430970
# Purpose     : Homework 8 - Clustering

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

# Delete rows with any missing value(s) first.
BCD2<-na.omit(BCD)
BCD3<-na.omit(BCD)
BCD4<-na.omit(BCD)

#Use the "Hierarchical" method to cluster the records in the "Breast Cancer" dataset into two clusters. 
bc2_dist<-dist( BCD2[,-c(1,11)])
hclust_resutls<-hclust(bc2_dist)
hclust_2<-cutree(hclust_resutls,2)
hclust_2

table(hclust_2,BCD2[,11])
# hclust_2    2   4
# 1         441  75
# 2           3 164


hcl <- hclust_2*2
wrong_1<- (hcl!=BCD2[,11] )
error_rate1<-sum(wrong_1)/length(wrong_1)
error_rate1
# 0.1142020498
accuracy1 <- 1 - error_rate1
accuracy1
# 0.8857979502

#K-means Clustering in R to cluster the records in 
#the "Breast Cancer" dataset into two clusters.

kmeans_2<- kmeans(BCD3[,-c(1,11)],2,nstart = 10)
kmeans_2$cluster
table(kmeans_2$cluster,BCD3[,11])
#     2   4
# 1 435  18
# 2   9 221

kmn <- kmeans_2$cluster*2

wrong2<- (kmn !=BCD3[,11] )
error_rate2<-sum(wrong2)/length(wrong2)
error_rate2
# 0.03953147877
accuracy2 <- 1- error_rate2
accuracy2
# 0.9604685212


#the "average" linkage method to cluster the records in the "Breast Cancer" dataset into two clusters. 
BCD4_dist_2<-dist( BCD4[,-c(1,11)])
hclust_resutls_3<-hclust(bc2_dist, method = 'average')
hclust_4<-cutree(hclust_resutls_3,2)
hclust_4

table(hclust_4,BCD4[,11])
# hclust_4    2   4
#       1   436  31
#       2     8 208

hcl_2 <- hclust_4*2
wrong3<- (hcl_2!=BCD4[,11] )
error_rate3<-sum(wrong3)/length(wrong3)
error_rate3
# 0.05710102489
accuracy3 <- 1 - error_rate3
accuracy3
# 0.9428989751
