

# Clear the environment
rm(list = ls())
# get working directory
getwd()
# set working directory
setwd("~/R")

# loading dataset into R
fullData <- read.csv("us_perm_visas_clean5.csv",na.string="")

#***********************************

# Install packages and load libraries
#install.packages('ggplot2')
#install.packages('stats')
library('stats')
library('ggplot2')

#***********************************

# 1. Plot for case status

caseStatus<- table(fullData$case_status)

# 1.1 convering to data frame
caseStatus<-data.frame(caseStatus)

caseStatus

# 1.2 Plot
colors <- c(rep("lightgreen",1), rep("gray",1), rep("firebrick1",1), rep("tan1",1))

caseStatusPlot<-ggplot(caseStatus, aes(x=Var1, y=Freq)) + 
  geom_bar(stat = "identity",color="blue", fill=colors) + 
  coord_flip() + 
  labs(title="Visa Application Status", y="Number of Applications",x="Status")+ 
  geom_text(aes( label = paste0(Freq, sep = "")),hjust = -0.1, vjust = 0.4, size = 4, fontface = 'bold')

caseStatusPlot

#***********************************

# 2. Plot for case recieved year
caseRecievedYearPlot<-hist(fullData$case_received_year,
                           main="Visa Applications recieved over years",
                           xlab="Application Recieved Year",
                           ylab="Number of Applicants", ylim=c(0,90000),
                           xlim=c(2006,2016),breaks=10,las=3, 
                           border="blue", col = 'deepskyblue2')

text(caseRecievedYearPlot$mids,caseRecievedYearPlot$counts,
     labels=caseRecievedYearPlot$counts, adj=c(0.5, -0.5))

#***********************************

# 3. Plot for top 20 employers
# 3.1 getting list of Top 20 employer names
top20employerNames<-head(names(rev(sort(table(fullData$employer_name)))), 20)

# 3.2 Top 20 employers names and number of visa applications filesd by them
top20employers<-head((rev(sort(table(fullData$employer_name)))), 20)

# 3.3 convering to data frame
top20employers<-data.frame(top20employers)

top20employers

# 3.4 plot
colors1 <- c(rep("deepskyblue",5), rep("aquamarine",5), rep("cyan",5), rep("tomato1",5))

employerPlot<-ggplot(top20employers, aes(x=Var1, y=Freq)) + 
  geom_bar(stat = "identity",color="darkblue", fill=colors1) + 
  coord_flip() + 
  labs(title="Top 20 employers Filing Visa Applications", y="Number of Applications",x="Employer")+ 
  geom_text(aes( label = paste0(Freq, sep = "")),hjust = -0.1, vjust = 0.4, size = 4, fontface = 'bold')
  
employerPlot

#***********************************

# 4 Top 10 visa types
# 4.1 getting list of Top 10 visa types
top10VisaTypeNames<-head(names(rev(sort(table(fullData$class_of_admission)))), 10)

# 4.2 Top 10 visa types and number of visa applications 
top10VisaTypes<-head((rev(sort(table(fullData$class_of_admission)))), 10)

# 4.3 convering to data frame
top10VisaTypes<-data.frame(top10VisaTypes)

top10VisaTypes

# 4.4 plot
colors2 <- c(rep("deepskyblue",3), rep("aquamarine",3), rep("cyan",2), rep("tomato1",2))

VisaTypePlot<-ggplot(top10VisaTypes, aes(x=Var1, y=Freq)) +
  geom_bar(stat = "identity",color="darkblue", fill=colors2) + 
  coord_flip() + 
  labs(title="Top 10 Visa Types ",y="Number of Applications",x="Type Of Visa")+ 
  geom_text(aes( label = paste0(Freq, sep = "")),hjust = -0.1, vjust = 0.4, size = 4, fontface = 'bold')

VisaTypePlot

#***********************************

# 5 Top 20 counties of applicats
# 5.1 getting list of 20 counties of applicats
top20CountriesNameList<-head(names(rev(sort(table(fullData$country_of_citizenship)))), 20)

# 5.2 Top 20 counties of applicats and number of visa applications per country
top20Countries<-head((rev(sort(table(fullData$country_of_citizenship)))), 20)

# 5.3 convering to data frame
top20Countries<-data.frame(top20Countries)

top20Countries

# 5.4 plot
colors1 <- c(rep("deepskyblue",5), rep("aquamarine",5), rep("cyan",5), rep("tomato1",5))

top20CountriesPlot<-ggplot(top20Countries, aes(x=Var1, y=Freq)) +
  geom_bar(stat = "identity",color="darkblue", fill=colors1) + 
  coord_flip() + 
  labs(title="Top 20 Countries whose citizens are Filing Applications", x="Name Of Country",y="Number of Applications")+
  scale_y_continuous(limits = c(0, 250000))+ 
  geom_text(aes( label = paste0(Freq, sep = "")),hjust = -0.1, vjust = 0.4, size = 4, fontface = 'bold')

top20CountriesPlot

#***********************************

# 6 Top 20 states with employees filing applications
# 6.1 getting list of 20 states with employees
top20StateNameList<-head(names(rev(sort(table(fullData$job_info_work_state)))), 20)

# 6.2 Top 20 states with employees and number of visa applications per state
top20States<-head((rev(sort(table(fullData$job_info_work_state)))), 20)

# 6.3 convering to data frame
top20States<-data.frame(top20States)

top20States

# 6.4 plot
colors1 <- c(rep("deepskyblue",5), rep("aquamarine",5), rep("cyan",5), rep("tomato1",5))

top20StatesPlot<-ggplot(top20States, aes(x=Var1, y=Freq)) +
  geom_bar(stat = "identity",color="darkblue", fill=colors1) + 
  coord_flip() + 
  labs(title="Top 20 states with employees Filing applications",x="Name Of State",y="Number of Applications")+
  scale_y_continuous(limits = c(0, 100000))+ 
  geom_text(aes( label = paste0(Freq, sep = "")),hjust = -0.1, vjust = 0.4, size = 4, fontface = 'bold')

top20StatesPlot

#***********************************

# 7 Top 20 Cities with employees filing applications
# 7.1 getting list of 20 states with employees
top20CitiesNameList<-head(names(rev(sort(table(fullData$job_info_work_city)))), 20)

# 7.2 Top 20 Cities with employees and number of visa applications per City
top20Cities<-head((rev(sort(table(fullData$job_info_work_city)))), 20)

# 7.3 convering to data frame
top20Cities<-data.frame(top20Cities)

top20Cities

# 7.4 plot
colors1 <- c(rep("deepskyblue",5), rep("aquamarine",5), rep("cyan",5), rep("tomato1",5))

top20CitiesPlot<-ggplot(top20Cities, aes(x=Var1, y=Freq)) +
  geom_bar(stat = "identity",color="darkblue", fill=colors1) + 
  coord_flip() + 
  labs(title="Top 20 cities with employees Filing applications", x="Name Of the City",y="Number of Applications")+
  scale_y_continuous(breaks = seq(0, 16000, by = 4000))+ 
  geom_text(aes( label = paste0(Freq, sep = "")),hjust = -0.1, vjust = 0.4, size = 4, fontface = 'bold')

top20CitiesPlot


#***********************************

# 8 Top 20 industries filing applications
# 8.1 getting list of 20 industries
top20IndustryList<-head(names(rev(sort(table(fullData$naics_us_title)))), 20)

# 8.2 Top 20 industries and number of visa applications per City
top20Industries<-head((rev(sort(table(fullData$naics_us_title)))), 20)

# 8.3convering to data frame
top20Industries<-data.frame(top20Industries)

top20Industries

# 8.4 plot
colors1 <- c(rep("deepskyblue",5), rep("aquamarine",5), rep("cyan",5), rep("tomato1",5))

top20IndustriesPlot<-ggplot(top20Industries, aes(x=Var1, y=Freq)) +
  geom_bar(stat = "identity",color="darkblue", fill=colors1) + 
  coord_flip() + 
  labs(title="Top 20 Industries Filing applications", x="Industry",y="Number of Applications")+
  scale_y_continuous(limits = c(0, 80000))+ 
  geom_text(aes( label = paste0(Freq, sep = "")),hjust = -0.1, vjust = 0.4, size = 4, fontface = 'bold')

top20IndustriesPlot

#***********************************

# 9 Top 20 employers in NYC filing applications
# 9.1 Subseting data set
EmployersInNYC<-fullData[fullData$employer_city =='NEW YORK',]

# 9.2 getting list of 20 employers
top20EmployersNYCList<-head(names(rev(sort(table(EmployersInNYC$employer_name)))), 20)

# 9.3 Top 20 employers in NYC and number of visa applications per employer
top20EmployersNYC<-head((rev(sort(table(EmployersInNYC$employer_name)))), 20)

# 9.4 convering to data frame
top20EmployersNYC<-data.frame(top20EmployersNYC)

top20EmployersNYC

# 9.5 plot
colors1 <- c(rep("deepskyblue",5), rep("aquamarine",5), rep("cyan",5), rep("tomato1",5))

top20EmployersNYCPlot<-ggplot(top20EmployersNYC, aes(x=Var1, y=Freq)) +
  geom_bar(stat = "identity",color="darkblue", fill=colors1) + 
  coord_flip() + 
  labs(title="Top 20 Employers in NYC Filing applications", x="Employer",y="Number of Applications")+
  scale_y_continuous(limits = c(0, 1000))+ 
  geom_text(aes( label = paste0(Freq, sep = "")),hjust = -0.1, vjust = 0.4, size = 4, fontface = 'bold')

top20EmployersNYCPlot

#***********************************



#***********************************

# 10 wage levels plot

WageLevelsCertified<-fullData[fullData$case_status =='Certified',]

# 10.1 wage levels
WageLevelsCert<-head((rev(sort(table(WageLevelsCertified$pw_level_9089)))), 4)

# 10.2 convering to data frame
WageLevelsCert<-data.frame(WageLevelsCert)

WageLevelsCert

# 10.3 plot
colors1 <- c(rep("deepskyblue",1), rep("aquamarine",1), rep("cyan",1), rep("tomato1",1))

WageLevelsCertPlot<-ggplot(WageLevelsCert, aes(x=Var1, y=Freq)) +
  geom_bar(stat = "identity",color="darkblue", fill=colors1) + 
  coord_flip() + 
  labs(title="Wage levels of applicants", x="level",y="Number of Applications")+
  scale_y_continuous(limits = c(0, 60000))+ 
  geom_text(aes( label = paste0(Freq, sep = "")),hjust = -0.1, vjust = 0.4, size = 4, fontface = 'bold')

WageLevelsCertPlot

#***********************************

# 11 wage levels plot certified


# 11.1 wage levels
WageLevels<-head((rev(sort(table(fullData$pw_level_9089)))), 4)

# 11.2 convering to data frame
WageLevels<-data.frame(WageLevels)

WageLevels

# 11.3 plot
colors1 <- c(rep("deepskyblue",1), rep("aquamarine",1), rep("cyan",1), rep("tomato1",1))

WageLevelsPlot<-ggplot(WageLevels, aes(x=Var1, y=Freq)) +
  geom_bar(stat = "identity",color="darkblue", fill=colors1) + 
  coord_flip() + 
  labs(title="Wage levels of applicants", x="level",y="Number of Applications")+
  scale_y_continuous(limits = c(0, 150000))+ 
  geom_text(aes( label = paste0(Freq, sep = "")),hjust = -0.1, vjust = 0.4, size = 4, fontface = 'bold')

WageLevelsPlot


